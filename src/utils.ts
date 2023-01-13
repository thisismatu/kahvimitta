import { Unit } from './types';

export const round = (num: number) => Math.round(num * 100) / 100;

export const convert = (amount: number, from: Unit, to: Unit) => {
  switch (from) {
    case 'g':
    case 'ml':
      if (to === 'cm') return amount / 7.5;
      if (to === 'c') return amount / 125;
      return amount;
    case 'cm':
      if (to === 'g') return amount * 7.5;
      if (to === 'c') return (amount * 7.5) / 125;
      return amount;
    case 'c':
      if (to === 'g') return amount * 125;
      if (to === 'cm') return (amount * 125) / 7.5;
      return amount;
  }
};
