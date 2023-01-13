import { WeightUnit, BrewMethod } from './types';

export const units: WeightUnit[] = [
  { name: 'grams', unit: 'g' },
  { name: 'coffee measure', unit: 'cm' },
  { name: 'coffee cup', unit: 'cup' },
];

export const methods: BrewMethod[] = [
  {
    name: 'Autodrip',
    strengths: [
      { name: 'strong', ratio: 15 },
      { name: 'normal', ratio: 16.67 },
      { name: 'mild', ratio: 18 },
    ],
  },
  {
    name: 'Aeropress',
    strengths: [
      { name: 'strong', ratio: 13 },
      { name: 'normal', ratio: 15 },
      { name: 'mild', ratio: 17 },
    ],
  },
];
