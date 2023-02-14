import React from 'react';
import { Disclosure, DisclosureContent, useDisclosureState } from 'ariakit/disclosure';
import { Instruction } from 'types';
import { ReactComponent as ChevronDownIcon } from 'assets/chevron-down.svg';
import { ReactComponent as CoarsenessIcon } from 'assets/sliders.svg';
import { ReactComponent as TemperatureIcon } from 'assets/thermometer.svg';
import { ReactComponent as TimeIcon } from 'assets/clock.svg';
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
              <td>
                <CoarsenessIcon />
              </td>
              <td>Grind coarseness:</td>
              <td>{details.grind}</td>
            </tr>
            <tr>
              <td>
                <TemperatureIcon />
              </td>
              <td>Water temperature:</td>
              <td>{details.temp}</td>
            </tr>
            <tr>
              <td>
                <TimeIcon />
              </td>
              <td>Brew time:</td>
              <td>{details.time}</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.note}>
          Note: Coffee scoops, tablespoons and cups are based on common european sizes. They are useful tools when you
          don't have a scale.
        </p>
      </DisclosureContent>
    </div>
  );
};
