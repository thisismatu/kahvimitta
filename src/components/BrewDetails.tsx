import React from 'react';
import { Disclosure, DisclosureContent, useDisclosureState } from 'ariakit/disclosure';
import { Instruction } from 'types';
import { ReactComponent as ChevronDownIcon } from 'assets/chevron-down.svg';
import styles from './BrewDetails.module.css';
import clsx from 'clsx';

interface Props {
  details: Instruction;
}

export const BrewDetails: React.FC<Props> = ({ details }) => {
  const disclosure = useDisclosureState();
  return (
    <div className={styles.container}>
      <Disclosure state={disclosure} className={styles.title}>
        <span>Brewing details</span>
        <ChevronDownIcon
          className={clsx(styles.icon, disclosure.open && styles['icon--rotate'])}
          width={16}
          height={16}
          strokeWidth={3}
        />
      </Disclosure>
      <DisclosureContent state={disclosure} className={styles.content}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Grind coarseness:</td>
              <td>{details.grind}</td>
            </tr>
            <tr>
              <td>Water temperature:</td>
              <td>{details.temp}</td>
            </tr>
            <tr>
              <td>Brew time:</td>
              <td>{details.time}</td>
            </tr>
          </tbody>
        </table>
        <span className={styles.note}>
          Note: Coffee scoops and cups are estimations based on common european sizes. They are useful tools when you
          don't have access to a scale, but still need to measure out coffee.
        </span>
      </DisclosureContent>
    </div>
  );
};
