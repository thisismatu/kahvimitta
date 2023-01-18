import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'ariakit/button';
import { Select, SelectItem, SelectPopover, useSelectState } from 'ariakit/select';
import { Unit, WeightUnit } from 'types';
import { ReactComponent as CheckIcon } from 'assets/check.svg';
import { ReactComponent as ChevronUpIcon } from 'assets/chevron-up.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/chevron-down.svg';
import { ReactComponent as PlusIcon } from 'assets/plus.svg';
import { ReactComponent as MinusIcon } from 'assets/minus.svg';
import styles from './AmountInput.module.css';

interface Props {
  label: string;
  amount: number;
  units: WeightUnit[];
  currentUnit: Unit;
  onSpinnerClick: React.MouseEventHandler<HTMLButtonElement>;
  onAmountChange: React.ChangeEventHandler<HTMLInputElement>;
  onUnitChange: (from: Unit, to: Unit) => void;
}

export const AmountInput: React.FC<Props> = ({
  label,
  amount,
  units,
  currentUnit,
  onUnitChange,
  onAmountChange,
  onSpinnerClick,
}) => {
  const state = useSelectState({ defaultValue: currentUnit, sameWidth: true, gutter: 4, animated: true });
  const renderName = units.find((i) => i.unit === state.value)?.name;
  const widthRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState(36);

  useEffect(() => {
    if (widthRef.current && inputRef.current) {
      const tw = widthRef.current.clientWidth;
      const iw = inputRef.current.clientWidth;
      if (tw >= iw) {
        setFontSize((current) => current - current / 6);
      } else if (tw < iw - iw / 3) {
        setFontSize(36);
      }
    }
  }, [amount]);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div ref={widthRef} className={styles.txtWidth} style={{ fontSize }}>
        {amount}
      </div>
      <div className={styles.inputContainer}>
        <Button className={styles.stepper} data-direction="down" as="button" onClick={onSpinnerClick}>
          <MinusIcon />
          <ChevronDownIcon />
        </Button>
        <input
          ref={inputRef}
          className={styles.input}
          type="number"
          value={amount || ''}
          onChange={onAmountChange}
          min={0}
          placeholder="0"
          style={{ fontSize }}
        />
        <Button className={styles.stepper} data-direction="up" as="button" onClick={onSpinnerClick}>
          <PlusIcon />
          <ChevronUpIcon />
        </Button>
      </div>
      <Select state={state} className={styles.select}>
        {renderName || state.value}
        <ChevronDownIcon width={16} height={16} strokeWidth={3} />
      </Select>
      <SelectPopover state={state} className={styles.popover}>
        {units.map((i) => (
          <SelectItem
            as="a"
            key={i.unit}
            className={styles.item}
            value={i.unit}
            onClick={() => onUnitChange(currentUnit, i.unit)}
          >
            {i.name}
            {i.extra && <small>{i.extra}</small>}
            {i.unit === state.value && <CheckIcon width={16} height={16} strokeWidth={3} />}
          </SelectItem>
        ))}
      </SelectPopover>
    </div>
  );
};
