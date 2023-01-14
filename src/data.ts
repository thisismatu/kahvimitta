import { ReactComponent as CoffeeIcon } from 'assets/coffee.svg';
import { ReactComponent as CheckIcon } from 'assets/check.svg';
import { WeightUnit, BrewMethod } from './types';

export const units: WeightUnit[] = [
  { name: 'Gram', unit: 'g' },
  { name: 'Coffee scoop', unit: 'cs', extra: '7.5 g' },
  { name: 'Cup', unit: 'c', extra: '125 ml' },
  { name: 'Millilitre', unit: 'ml' },
];

export const methods: BrewMethod[] = [
  {
    name: 'Drip coffee',
    icon: CheckIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 16.67 },
      { name: 'Strong', ratio: 15 },
    ],
  },
  {
    name: 'Pour over',
    icon: CoffeeIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 16.67 },
      { name: 'Strong', ratio: 15 },
    ],
  },
  {
    name: 'Aero\u200bpress',
    icon: CoffeeIcon,
    strengths: [
      { name: 'Mild', ratio: 17 },
      { name: 'Normal', ratio: 15 },
      { name: 'Strong', ratio: 13 },
    ],
  },
  {
    name: 'French press',
    icon: CoffeeIcon,
    strengths: [
      { name: 'Mild', ratio: 17 },
      { name: 'Normal', ratio: 15 },
      { name: 'Strong', ratio: 13 },
    ],
  },
];
