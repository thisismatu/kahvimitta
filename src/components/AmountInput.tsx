import React from 'react';
import { Select, SelectItem, SelectPopover, useSelectState } from 'ariakit/select';
import { Unit, WeightUnit } from 'types';
import { ReactComponent as CheckIcon } from 'assets/check.svg';
import { ReactComponent as ChevronDown } from 'assets/chevron-down.svg';
import styles from './AmountInput.module.css';

interface Props {
  label: string;
  amount: number;
  units: WeightUnit[];
  currentUnit: Unit;
  onAmountChange: React.ChangeEventHandler<HTMLInputElement>;
  onUnitChange: (from: Unit, to: Unit) => void;
}

export const AmountInput: React.FC<Props> = ({ label, amount, units, currentUnit, onUnitChange, onAmountChange }) => {
  const state = useSelectState({ sameWidth: true, gutter: 4, animated: true });
  const renderName = units.find((i) => i.unit === state.value)?.name;

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="number"
        value={amount || ''}
        onChange={onAmountChange}
        min={0}
        placeholder="0"
      />
      <Select state={state} className={styles.select}>
        {renderName || state.value}
        <ChevronDown width={16} height={16} strokeWidth={3} />
      </Select>
      <SelectPopover state={state} className={styles.popover}>
        {units.map((i) => (
          <SelectItem
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
