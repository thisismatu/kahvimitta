import React from 'react';
import { Select, SelectArrow, SelectItem, SelectPopover, useSelectState, SelectItemCheck } from 'ariakit/select';
import { Unit, WeightUnit } from 'types';
import styles from './UnitSelect.module.css';

interface Props {
  items: WeightUnit[];
  currentUnit: Unit;
  onSelect: (from: Unit, to: Unit) => void;
}

export const UnitSelect: React.FC<Props> = ({ items, currentUnit, onSelect }) => {
  const state = useSelectState({ gutter: 4, animated: true });
  const renderName = items.find((i) => i.unit === state.value)?.name;

  return (
    <div className={styles.container}>
      <Select state={state} className={styles.select}>
        {renderName || state.value}
        <SelectArrow />
      </Select>
      <SelectPopover state={state} className={styles.popover}>
        {items.map((i) => (
          <SelectItem key={i.unit} className={styles.item} value={i.unit} onClick={() => onSelect(currentUnit, i.unit)}>
            {i.name}
            <SelectItemCheck />
          </SelectItem>
        ))}
      </SelectPopover>
    </div>
  );
};
