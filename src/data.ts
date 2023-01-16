import { ReactComponent as AutodripIcon } from 'assets/autodrip.svg';
import { ReactComponent as AeropressIcon } from 'assets/aeropress.svg';
import { ReactComponent as FrenchPressIcon } from 'assets/french-press.svg';
import { ReactComponent as PourOverIcon } from 'assets/pour-over.svg';
import { ReactComponent as MokaPotIcon } from 'assets/moka-pot.svg';
import { WeightUnit, BrewMethod } from './types';

// Note: remember to use thin space " "

export const coffeeUnits: WeightUnit[] = [
  { name: 'Gram', unit: 'g' },
  { name: 'Coffee scoop', unit: 'cs', extra: '7.5 ml' },
];

export const waterUnits: WeightUnit[] = [
  { name: 'Gram', unit: 'g' },
  { name: 'Milliliter', unit: 'ml' },
  { name: 'Liter', unit: 'l' },
  { name: 'Cup', unit: 'c', extra: '125 ml' },
];

export const brewMethods: BrewMethod[] = [
  {
    name: 'Drip coffee',
    icon: AutodripIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 16.67 },
      { name: 'Strong', ratio: 15 },
    ],
    details: {
      grind: 'Medium',
      time: '4 – 5 min',
      temp: '95°C',
    },
  },
  {
    name: 'Pour over',
    icon: PourOverIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 16.67 },
      { name: 'Strong', ratio: 15 },
    ],
    details: {
      grind: 'Medium',
      time: '3 – 4 min',
      temp: '96°C',
    },
  },
  {
    name: 'Aero\u200bpress',
    icon: AeropressIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 15 },
      { name: 'Strong', ratio: 10 },
    ],
    details: {
      grind: 'Medium fine',
      time: '1:30 min',
      temp: '90°C',
    },
  },
  {
    name: 'French press',
    icon: FrenchPressIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 15 },
      { name: 'Strong', ratio: 12 },
    ],
    details: {
      grind: 'Medium coarse',
      time: '4 min',
      temp: '95°C',
    },
  },
  {
    name: 'Moka pot',
    icon: MokaPotIcon,
    strengths: [
      { name: 'Mild', ratio: 17.25 },
      { name: 'Normal', ratio: 10 },
      { name: 'Strong', ratio: 7 },
    ],
    details: {
      grind: 'Fine',
      time: '1 min',
      temp: '99°C',
    },
  },
];
