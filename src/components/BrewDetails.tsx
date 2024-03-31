import React from 'react';
import { Disclosure, DisclosureContent, useDisclosureState } from 'ariakit/disclosure';
import { Instruction } from 'types';
import clsx from 'clsx';
import { ChevronDownIcon, SlidersIcon, ThermometerIcon, ClockIcon } from 'assets/icons';
import styles from './BrewDetails.module.css';

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
        />
      </Disclosure>
      <DisclosureContent state={disclosure} className={styles.content}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>
                <SlidersIcon />
              </td>
              <td>Grind coarseness:</td>
              <td>{details.grind}</td>
            </tr>
            <tr>
              <td>
                <ThermometerIcon />
              </td>
              <td>Water temperature:</td>
              <td>{details.temp}</td>
            </tr>
            <tr>
              <td>
                <ClockIcon />
              </td>
              <td>Brew time:</td>
              <td>{details.time}</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.note}>
          Note: Coffee scoops, tablespoons and cups are based on european sizes. They are useful
          tools when you don't have access to a scale.
        </p>
      </DisclosureContent>
    </div>
  );
};
