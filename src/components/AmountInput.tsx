import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@ariakit/react';
import { Select, SelectItem, SelectPopover, SelectProvider } from '@ariakit/react';
import { Unit, WeightUnit } from 'types';
import { CheckIcon, ChevronUpIcon, ChevronDownIcon, PlusIcon, MinusIcon } from 'lucide-react';
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
  onSpinnerClick
}) => {
  const [value, setValue] = useState(currentUnit);
  const renderName = units.find((i) => i.unit === value)?.label;
  const widthRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState(32);

  useEffect(() => {
    if (widthRef.current && inputRef.current) {
      const tw = widthRef.current.clientWidth;
      const iw = inputRef.current.clientWidth;
      if (tw >= iw) {
        setFontSize((current) => current - current / 6);
      } else if (tw < iw - iw / 3) {
        setFontSize(32);
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
        <Button
          className={styles.stepper}
          data-direction="down"
          onClick={onSpinnerClick}
          tabIndex={-1}
        >
          <MinusIcon />
          <ChevronDownIcon />
        </Button>
        <input
          data-testid={`${label}Input`}
          ref={inputRef}
          className={styles.input}
          type="number"
          value={amount || ''}
          onChange={onAmountChange}
          min={0}
          placeholder="0"
          style={{ fontSize }}
          tabIndex={1}
        />
        <Button
          className={styles.stepper}
          data-direction="up"
          onClick={onSpinnerClick}
          tabIndex={-1}
        >
          <PlusIcon />
          <ChevronUpIcon />
        </Button>
      </div>
      <SelectProvider defaultValue={currentUnit} sameWidth>
        <Select className={styles.select} tabIndex={2}>
          {renderName || value}
          <ChevronDownIcon width={16} height={16} />
        </Select>
        <SelectPopover className={styles.popover}>
          {units.map((i) => (
            <SelectItem
              key={i.unit}
              className={styles.item}
              value={i.unit}
              onClick={() => {
                setValue(i.unit);
                onUnitChange(currentUnit, i.unit);
              }}
            >
              {i.label}
              {i.extra && <small>{i.extra}</small>}
              <span className={styles.itemIcon}>
                {i.unit === value && <CheckIcon width={16} height={16} />}
              </span>
            </SelectItem>
          ))}
        </SelectPopover>
      </SelectProvider>
    </div>
  );
};
