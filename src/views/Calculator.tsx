import React, { useEffect, useRef, useState } from 'react';
import { Amount, BrewMethod, Strength, Unit, CustomRatio } from 'types';
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
  const [customRatios, setCustomRatios] = useLocalStorage<Record<number, CustomRatio[]>>('customRatios', {});
  const [method, setMethod] = useState<BrewMethod>(brewMethods[localBrewMethod]);
  const [strength, setStrength] = useState<Strength>(brewMethods[localBrewMethod].strengths[1]);
  const [selectedCustomRatio, setSelectedCustomRatio] = useState<CustomRatio | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingRatio, setEditingRatio] = useState<CustomRatio | null>(null);
  const [coffee, setCoffee] = useState<Amount>({ round: 0, exact: 0 });
  const [water, setWater] = useState<Amount>({ round: 0, exact: 0 });
  const [coffeeUnit, setCoffeeUnit] = useState<Unit>(localCoffeeUnit);
  const [waterUnit, setWaterUnit] = useState<Unit>(localWaterUnit);
  const [lastInput, setLastInput] = useState<'coffee' | 'water'>();
  const [newLabel, setNewLabel] = useState('');
  const [newRatio, setNewRatio] = useState('');
  const [showActions, setShowActions] = useState<CustomRatio | null>(null);
  const deleteTimerRef = useRef<NodeJS.Timeout | null>(null);
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

  const getActiveRatio = () => {
    if (selectedCustomRatio) return selectedCustomRatio.ratio;
    return strength.ratio;
  };

  const coffeeToWater = (c: number, r?: number) => {
    const cg = convert(c, coffeeUnit, 'g');
    const wg = cg * (r || getActiveRatio());
    const w = convert(wg, 'g', waterUnit);
    setWater({ round: round(w, waterUnit), exact: w });
  };

  const waterToCoffee = (w: number, r?: number) => {
    const wg = convert(w, waterUnit, 'g');
    const cg = wg / (r || getActiveRatio());
    const c = convert(cg, 'g', coffeeUnit);
    setCoffee({ round: round(c, coffeeUnit), exact: c });
  };

  const adjustByOne = (currentValue: number, direction: string, unit: Unit): Amount => {
    const value = direction === 'up' ? Math.floor(currentValue + 1) : Math.ceil(currentValue - 1);
    const posValue = value < 0 ? 0 : value;
    return { round: round(posValue, unit), exact: posValue };
  };

  const handleCoffeeStepper = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement) || !e.target.dataset.direction) return;
    const c = adjustByOne(coffee.exact, e.target.dataset.direction, coffeeUnit);
    setCoffee(c);
    coffeeToWater(c.exact);
    setLastInput('coffee');
  };

  const handleWaterStepper = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement) || !e.target.dataset.direction) return;
    const w = adjustByOne(water.exact, e.target.dataset.direction, waterUnit);
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
    setCoffee({ round: round(c, to), exact: c });
  };

  const handleWaterUnit = (from: Unit, to: Unit) => {
    setWaterUnit(to);
    setLocalWaterUnit(to);
    if (!water.exact) return;
    const w = convert(water.exact, from, to);
    setWater({ round: round(w, to), exact: w });
  };

  const getCurrentMethodRatios = () => {
    return customRatios[localBrewMethod] || [];
  };

  const handleStrength = (s: Strength) => {
    setSelectedCustomRatio(null);
    setStrength(s);
    if (lastInput === 'coffee') coffeeToWater(coffee.exact, s.ratio);
    if (lastInput === 'water') waterToCoffee(water.exact, s.ratio);
  };

  const handleCustomRatioSelect = (ratio: CustomRatio) => {
    setSelectedCustomRatio(ratio);
    if (lastInput === 'coffee') coffeeToWater(coffee.exact, ratio.ratio);
    if (lastInput === 'water') waterToCoffee(water.exact, ratio.ratio);
  };

  const handleAddCustomRatio = () => {
    const ratioValue = parseFloat(newRatio);
    if (newLabel.trim() && !isNaN(ratioValue) && ratioValue > 0) {
      const newRatioObj: CustomRatio = {
        id: editingRatio?.id || Date.now().toString(),
        label: newLabel.trim(),
        ratio: ratioValue
      };
      const methodRatios = getCurrentMethodRatios();
      const updatedRatios = editingRatio
        ? methodRatios.map((r) => (r.id === editingRatio.id ? newRatioObj : r))
        : [...methodRatios, newRatioObj];
      setCustomRatios({
        ...customRatios,
        [localBrewMethod]: updatedRatios
      });
      setSelectedCustomRatio(newRatioObj);
      setEditingRatio(null);
      setShowAddDialog(false);
      setNewLabel('');
      setNewRatio('');
      if (lastInput === 'coffee') coffeeToWater(coffee.exact, ratioValue);
      if (lastInput === 'water') waterToCoffee(water.exact, ratioValue);
    }
  };

  const handleDeleteCustomRatio = (id: string) => {
    const methodRatios = getCurrentMethodRatios();
    const newRatios = methodRatios.filter((r) => r.id !== id);
    setCustomRatios({
      ...customRatios,
      [localBrewMethod]: newRatios
    });
    if (selectedCustomRatio?.id === id) {
      setSelectedCustomRatio(null);
      if (lastInput === 'coffee') coffeeToWater(coffee.exact);
      if (lastInput === 'water') waterToCoffee(water.exact);
    }
  };

  const handleMethod = (m: BrewMethod, i: number) => {
    setMethod(m);
    setLocalBrewMethod(i);
    setSelectedCustomRatio(null);
    trackEvent('brew-method', m.label);
    const ns = m.strengths.find((s) => s.type === strength.type);
    if (ns) handleStrength(ns);
  };

  const handleOpenAddDialog = () => {
    setShowAddDialog(true);
    setNewLabel('');
    setNewRatio('');
  };

  const handleCloseAddDialog = () => {
    setShowAddDialog(false);
    setEditingRatio(null);
    setNewLabel('');
    setNewRatio('');
    setShowActions(null);
  };

  const handleLongPressStart = (ratio: CustomRatio) => {
    deleteTimerRef.current = setTimeout(() => {
      setShowActions(ratio);
    }, 1000);
  };

  const handleLongPressEnd = () => {
    if (deleteTimerRef.current) {
      clearTimeout(deleteTimerRef.current);
      deleteTimerRef.current = null;
    }
  };

  const handleEdit = (ratio: CustomRatio) => {
    setEditingRatio(ratio);
    setNewLabel(ratio.label);
    setNewRatio(ratio.ratio.toString());
    setShowAddDialog(true);
    setShowActions(null);
  };

  const handleDeleteFromActions = (ratio: CustomRatio) => {
    handleDeleteCustomRatio(ratio.id);
    setShowActions(null);
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
            disabled={s.type === strength.type && !selectedCustomRatio}
            tabIndex={3}
          >
            {s.label} <small>1:{round(s.ratio)}</small>
          </Button>
        ))}
        {getCurrentMethodRatios().map((ratio) => (
          <Button
            key={ratio.id}
            onClick={() => handleCustomRatioSelect(ratio)}
            disabled={selectedCustomRatio?.id === ratio.id}
            tabIndex={3}
            onTouchStart={() => handleLongPressStart(ratio)}
            onTouchEnd={handleLongPressEnd}
            onTouchCancel={handleLongPressEnd}
            onMouseDown={() => handleLongPressStart(ratio)}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
          >
            {ratio.label} <small>1:{round(ratio.ratio)}</small>
          </Button>
        ))}
        <Button onClick={handleOpenAddDialog} className={styles.addButton} tabIndex={3}>
          + Add
        </Button>
      </div>
      <Timer
        durationMs={method.details.durationMs}
        durationIncrement={method.details.durationIncrement}
      />
      <BrewDetails details={method.details} />
      {showAddDialog && (
        <div className={styles.dialogOverlay} onClick={handleCloseAddDialog}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h3>{editingRatio ? 'Edit Custom Ratio' : 'Add Custom Ratio'}</h3>
            <div className={styles.dialogInputs}>
              <input
                type="text"
                placeholder="Label"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className={styles.dialogInput}
                autoFocus
              />
              <input
                type="number"
                placeholder="Ratio"
                value={newRatio}
                onChange={(e) => setNewRatio(e.target.value)}
                className={styles.dialogInput}
                step="0.01"
                min="0.01"
              />
            </div>
            <div className={styles.dialogActions}>
              <Button onClick={handleCloseAddDialog} className={styles.cancelButton} tabIndex={3}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomRatio} className={styles.submitButton} tabIndex={3}>
                {editingRatio ? 'Save' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      )}
      {showActions && (
        <div className={styles.actionBar}>
          <Button onClick={() => handleEdit(showActions)} className={styles.actionButton} tabIndex={3}>
            Edit
          </Button>
          <Button onClick={() => handleDeleteFromActions(showActions)} className={styles.actionButton} tabIndex={3}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default Calculator;
