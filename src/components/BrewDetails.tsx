import React, { useState } from 'react';
import { Disclosure, DisclosureContent, DisclosureProvider } from '@ariakit/react';
import { Instruction } from 'types';
import clsx from 'clsx';
import { ChevronDownIcon, SlidersIcon, ThermometerIcon, ClockIcon } from 'lucide-react';
import styles from './BrewDetails.module.css';

interface Props {
  details: Instruction;
}

export const BrewDetails: React.FC<Props> = ({ details }) => {
  return (
    <div className={styles.container}>
      <DisclosureProvider>
        <Disclosure className={styles.title}>
          <span>Brewing details</span>
          <ChevronDownIcon className={styles.icon} width={16} height={16} />
        </Disclosure>
        <DisclosureContent className={styles.content}>
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
      </DisclosureProvider>
    </div>
  );
};
