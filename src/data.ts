import { ReactComponent as AutodripIcon } from 'assets/autodrip.svg';
import { ReactComponent as AeropressIcon } from 'assets/aeropress.svg';
import { ReactComponent as FrenchPressIcon } from 'assets/french-press.svg';
import { ReactComponent as PourOverIcon } from 'assets/pour-over.svg';
import { ReactComponent as MokaPotIcon } from 'assets/moka-pot.svg';
import { WeightUnit, BrewMethod } from './types';

export const units: WeightUnit[] = [
  { name: 'Gram', unit: 'g' },
  { name: 'Millilitre', unit: 'ml' },
  { name: 'Coffee scoop', unit: 'cs', extra: '7.5\u2009g' },
  { name: 'Cup', unit: 'c', extra: '125\u2009ml' },
];

export const methods: BrewMethod[] = [
  {
    name: 'Drip coffee',
    icon: AutodripIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 16.67 },
      { name: 'Strong', ratio: 15 },
    ],
  },
  {
    name: 'Pour over',
    icon: PourOverIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 16.67 },
      { name: 'Strong', ratio: 15 },
    ],
  },
  {
    name: 'Aero\u200bpress',
    icon: AeropressIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 15 },
      { name: 'Strong', ratio: 10 },
    ],
  },
  {
    name: 'French press',
    icon: FrenchPressIcon,
    strengths: [
      { name: 'Mild', ratio: 18 },
      { name: 'Normal', ratio: 15 },
      { name: 'Strong', ratio: 12 },
    ],
  },
  {
    name: 'Moka pot',
    icon: MokaPotIcon,
    strengths: [
      { name: 'Mild', ratio: 17.25 },
      { name: 'Normal', ratio: 15 },
      { name: 'Strong', ratio: 12 },
    ],
  },
];
