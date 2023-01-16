import { Unit } from '../types';

export const round = (num: number) => Math.round(num * 100) / 100;

export const convert = (amount: number, from: Unit, to: Unit) => {
  switch (from) {
    case 'g':
    case 'ml':
      if (to === 'l') return amount / 1000;
      if (to === 'cs') return amount / 7.5;
      if (to === 'c') return amount / 125;
      return amount;
    case 'l':
      if (to === 'g') return amount * 1000;
      if (to === 'ml') return amount * 1000;
      if (to === 'cs') return (amount * 1000) / 7.5;
      if (to === 'c') return (amount * 1000) / 125;
      return amount;
    case 'cs':
      if (to === 'g') return amount * 7.5;
      if (to === 'ml') return amount * 7.5;
      if (to === 'l') return (amount * 7.5) / 1000;
      if (to === 'c') return (amount * 7.5) / 125;
      return amount;
    case 'c':
      if (to === 'g') return amount * 125;
      if (to === 'ml') return amount * 125;
      if (to === 'l') return (amount * 125) / 1000;
      if (to === 'cs') return (amount * 125) / 7.5;
      return amount;
  }
};
