import React, { useEffect, useRef, useState } from 'react';
import { Amount, BrewMethod, Strength, Unit } from 'types';
import { convert, round } from 'utils/math';
import { useLocalStorage } from 'utils/useLocalStorage';
import { trackEvent } from 'utils/misc';
import { brewMethods, coffeeUnits, waterUnits } from 'data';
import { AmountInput } from 'components/AmountInput';
import { BrewDetails } from 'components/BrewDetails';
import { Button } from 'components/Button';
import { MethodButton } from 'components/MethodButton';
import { Timer } from 'components/Timer';
import styles from './Calculator.module.css';

function Calculator() {
  const [localBrewMethod, setLocalBrewMethod] = useLocalStorage<number>('brewMethod', 0);
  const [localCoffeeUnit, setLocalCoffeeUnit] = useLocalStorage<Unit>('coffeeUnit', 'g');
  const [localWaterUnit, setLocalWaterUnit] = useLocalStorage<Unit>('waterUnit', 'ml');
  const [method, setMethod] = useState<BrewMethod>(brewMethods[localBrewMethod]);
  const [strength, setStrength] = useState<Strength>(brewMethods[localBrewMethod].strengths[1]);
  const [coffee, setCoffee] = useState<Amount>({ round: 0, exact: 0 });
  const [water, setWater] = useState<Amount>({ round: 0, exact: 0 });
  const [coffeeUnit, setCoffeeUnit] = useState<Unit>(localCoffeeUnit);
  const [waterUnit, setWaterUnit] = useState<Unit>(localWaterUnit);
  const [lastInput, setLastInput] = useState<'coffee' | 'water'>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'BrewCalc';
    const updateFavicon = (dark: boolean) => {
      const link = document.getElementById('favicon') as HTMLLinkElement;
      if (link) link.href = dark ? 'favicon-dark.ico' : 'favicon.ico';
    };
    const usesDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || false;
    updateFavicon(usesDarkMode);
  }, []);

  useEffect(() => {
    const child = scrollRef.current?.children[localBrewMethod];
    if (child) child.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [localBrewMethod]);

  const coffeeToWater = (c: number, r?: number) => {
    const cg = convert(c, coffeeUnit, 'g');
    const wg = cg * (r || strength.ratio);
    const w = convert(wg, 'g', waterUnit);
    setWater({ round: round(w), exact: w });
  };

  const waterToCoffee = (w: number, r?: number) => {
    const wg = convert(w, waterUnit, 'g');
    const cg = wg / (r || strength.ratio);
    const c = convert(cg, 'g', coffeeUnit);
    setCoffee({ round: round(c), exact: c });
  };

  const adjustByOne = (currentValue: number, direction: string): Amount => {
    const value = direction === 'up' ? Math.floor(currentValue + 1) : Math.ceil(currentValue - 1);
    const posValue = value < 0 ? 0 : value;
    return { round: round(posValue), exact: posValue };
  };

  const handleCoffeeStepper = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement) || !e.target.dataset.direction) return;
    const c = adjustByOne(coffee.exact, e.target.dataset.direction);
    setCoffee(c);
    coffeeToWater(c.exact);
    setLastInput('coffee');
  };

  const handleWaterStepper = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement) || !e.target.dataset.direction) return;
    const w = adjustByOne(water.exact, e.target.dataset.direction);
    setWater(w);
    waterToCoffee(w.exact);
    setLastInput('water');
  };

  const handleCoffeeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const c = parseFloat(e.target.value.replace(/,/, '.'));
    if (isNaN(c) || c < 0) {
      setCoffee({ round: 0, exact: 0 });
      setWater({ round: 0, exact: 0 });
      return;
    }
    setCoffee({ round: round(c), exact: c });
    coffeeToWater(c);
    setLastInput('coffee');
  };

  const handleWaterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseFloat(e.target.value.replace(/,/, '.'));
    if (isNaN(w) || w < 0) {
      setWater({ round: 0, exact: 0 });
      setCoffee({ round: 0, exact: 0 });
      return;
    }
    setWater({ round: round(w), exact: w });
    waterToCoffee(w);
    setLastInput('water');
  };

  const handleCoffeeUnit = (from: Unit, to: Unit) => {
    setCoffeeUnit(to);
    setLocalCoffeeUnit(to);
    if (!coffee.exact) return;
    const c = convert(coffee.exact, from, to);
    setCoffee({ round: round(c), exact: c });
  };

  const handleWaterUnit = (from: Unit, to: Unit) => {
    setWaterUnit(to);
    setLocalWaterUnit(to);
    if (!water.exact) return;
    const w = convert(water.exact, from, to);
    setWater({ round: round(w), exact: w });
  };

  const handleStrength = (s: Strength) => {
    setStrength(s);
    if (lastInput === 'coffee') coffeeToWater(coffee.exact, s.ratio);
    if (lastInput === 'water') waterToCoffee(water.exact, s.ratio);
  };

  const handleMethod = (m: BrewMethod, i: number) => {
    setMethod(m);
    setLocalBrewMethod(i);
    trackEvent('brew-method', m.label);
    const ns = m.strengths.find((s) => s.type === strength.type);
    if (ns) handleStrength(ns);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.methods} ref={scrollRef} tabIndex={-1}>
        {brewMethods.map((m, i) => (
          <MethodButton
            key={m.label}
            onClick={() => handleMethod(m, i)}
            disabled={m.label === method.label}
            tabIndex={-1}
          >
            <m.icon />
            <span>{m.label}</span>
          </MethodButton>
        ))}
      </div>
      <div className={styles.amounts}>
        <AmountInput
          label="Coffee"
          amount={coffee.round}
          units={coffeeUnits}
          currentUnit={coffeeUnit}
          onSpinnerClick={handleCoffeeStepper}
          onAmountChange={handleCoffeeInput}
          onUnitChange={handleCoffeeUnit}
        />
        <AmountInput
          label="Water"
          amount={water.round}
          units={waterUnits}
          currentUnit={waterUnit}
          onSpinnerClick={handleWaterStepper}
          onAmountChange={handleWaterInput}
          onUnitChange={handleWaterUnit}
        />
      </div>
      <div className={styles.strength}>
        {method.strengths.map((s) => (
          <Button
            key={s.type}
            onClick={() => handleStrength(s)}
            disabled={s.type === strength.type}
            tabIndex={3}
          >
            {s.label} <small>1:{round(s.ratio)}</small>
          </Button>
        ))}
      </div>
      <Timer
        durationMs={method.details.durationMs}
        durationIncrement={method.details.durationIncrement}
      />
      <BrewDetails details={method.details} />
    </div>
  );
}

export default Calculator;
