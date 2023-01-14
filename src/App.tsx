import React, { useState } from 'react';
import { BrewMethod, Strength, Unit } from 'types';
import { convert, round } from 'utils';
import { methods, units } from 'data';
import { AmountInput } from 'components/AmountInput';
import { Button } from 'components/Button';
import { MethodButton } from 'components/MethodButton';
import styles from './App.module.css';

function App() {
  const [method, setMethod] = useState<BrewMethod>(methods[0]);
  const [strength, setStrength] = useState<Strength>(methods[0].strengths[1]);
  const [coffeeAmount, setCoffeeAmount] = useState<number>(0);
  const [coffeeUnit, setCoffeeUnit] = useState<Unit>('g');
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [waterUnit, setWaterUnit] = useState<Unit>('g');
  const [lastInput, setLastInput] = useState<'coffee' | 'water'>();

  const coffeeToWater = (c: number, r?: number) => {
    const cg = convert(c, coffeeUnit, 'g');
    const wg = cg * (r || strength.ratio);
    const w = convert(wg, 'g', waterUnit);
    setWaterAmount(round(w));
  };

  const waterToCoffee = (w: number, r?: number) => {
    const wg = convert(w, waterUnit, 'g');
    const cg = wg / (r || strength.ratio);
    const c = convert(cg, 'g', coffeeUnit);
    setCoffeeAmount(round(c));
  };

  const handleCoffeeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const c = parseFloat(e.target.value);
    if (isNaN(c) || c < 0) return setCoffeeAmount(0);
    setCoffeeAmount(c);
    coffeeToWater(c);
    setLastInput('coffee');
  };

  const handleWaterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseFloat(e.target.value);
    if (isNaN(w) || w < 0) return setWaterAmount(0);
    setWaterAmount(w);
    waterToCoffee(w);
    setLastInput('water');
  };

  const handleCoffeeUnit = (from: Unit, to: Unit) => {
    if (!coffeeAmount) return setCoffeeUnit(to);
    const c = convert(coffeeAmount, from, to);
    setCoffeeAmount(round(c));
    setCoffeeUnit(to);
  };

  const handleWaterUnit = (from: Unit, to: Unit) => {
    if (!waterAmount) return setWaterUnit(to);
    const w = convert(waterAmount, from, to);
    setWaterAmount(round(w));
    setWaterUnit(to);
  };

  const handleStrength = (s: Strength) => {
    setStrength(s);
    if (lastInput === 'coffee') coffeeToWater(coffeeAmount, s.ratio);
    if (lastInput === 'water') waterToCoffee(waterAmount, s.ratio);
  };

  const handleMethod = (m: BrewMethod) => {
    setMethod(m);
    const ns = m.strengths.find((s) => s.name === strength.name);
    if (ns) handleStrength(ns);
  };

  const coffeeUnits = units.filter((u) => u.unit !== 'c' && u.unit !== 'ml');
  const waterUnits = units.filter((u) => u.unit !== 'cs');

  return (
    <div className={styles.container}>
      <div className={styles.header}>Coffee Ratio Calculator</div>
      <div className={styles.form}>
        <div className={styles.methods}>
          {methods.map((m) => (
            <MethodButton key={m.name} onClick={() => handleMethod(m)} disabled={m.name === method.name}>
              <m.icon />
              {m.name}
            </MethodButton>
          ))}
        </div>
        <div className={styles.amounts}>
          <AmountInput
            label="Coffee"
            amount={coffeeAmount}
            units={coffeeUnits}
            currentUnit={coffeeUnit}
            onAmountChange={handleCoffeeInput}
            onUnitChange={handleCoffeeUnit}
          />
          <AmountInput
            label="Water"
            amount={waterAmount}
            units={waterUnits}
            currentUnit={waterUnit}
            onAmountChange={handleWaterInput}
            onUnitChange={handleWaterUnit}
          />
        </div>
        <div className={styles.strength}>
          {method.strengths.map((s) => (
            <Button key={s.name} onClick={() => handleStrength(s)} disabled={s.name === strength.name}>
              {s.name} <small>1:{s.ratio}</small>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
