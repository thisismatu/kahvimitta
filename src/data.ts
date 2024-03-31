import AutodripIcon from 'assets/autodrip.svg?react';
import AeropressIcon from 'assets/aeropress.svg?react';
import FrenchPressIcon from 'assets/french-press.svg?react';
import PourOverIcon from 'assets/pour-over.svg?react';
import MokaPotIcon from 'assets/moka-pot.svg?react';
import EspressoIcon from 'assets/espresso.svg?react';
import { WeightUnit, BrewMethod } from './types';

// Note: remember to use thin space " " and that duration is milliseconds

export const coffeeUnits: WeightUnit[] = [
  { label: 'Gram', unit: 'g' },
  { label: 'Coffee scoop', unit: 'cs', extra: '7.5 g' },
  { label: 'Table\u200bspoon', unit: 'tbsp', extra: '15 g' },
];

export const waterUnits: WeightUnit[] = [
  { label: 'Gram', unit: 'g' },
  { label: 'Milliliter', unit: 'ml' },
  { label: 'Liter', unit: 'l' },
  { label: 'Cup', unit: 'c', extra: '125 ml' },
];

export const brewMethods: BrewMethod[] = [
  {
    label: 'Drip coffee',
    icon: AutodripIcon,
    strengths: [
      { type: 'mild', label: 'Mild', ratio: 18 },
      { type: 'normal', label: 'Normal', ratio: 16.67 },
      { type: 'strong', label: 'Strong', ratio: 15 },
    ],
    details: {
      grind: 'Medium',
      time: '4 – 5 min',
      temp: '96°C',
      duration: 240000,
    },
  },
  {
    label: 'Pour over',
    icon: PourOverIcon,
    strengths: [
      { type: 'mild', label: 'Mild', ratio: 18 },
      { type: 'normal', label: 'Normal', ratio: 16.67 },
      { type: 'strong', label: 'Strong', ratio: 15 },
    ],
    details: {
      grind: 'Medium',
      time: '3 – 4 min',
      temp: '90 – 96°C',
      duration: 180000,
    },
  },
  {
    label: 'Aero\u200bpress',
    icon: AeropressIcon,
    strengths: [
      { type: 'mild', label: 'Mild', ratio: 17 },
      { type: 'normal', label: 'Normal', ratio: 15 },
      { type: 'strong', label: 'Strong', ratio: 10 },
    ],
    details: {
      grind: 'Medium fine',
      time: '1 min 30 sec',
      temp: '90 – 96°C',
      duration: 90000,
    },
  },
  {
    label: 'French press',
    icon: FrenchPressIcon,
    strengths: [
      { type: 'mild', label: 'Mild', ratio: 17 },
      { type: 'normal', label: 'Normal', ratio: 15 },
      { type: 'strong', label: 'Strong', ratio: 12 },
    ],
    details: {
      grind: 'Medium coarse',
      time: '4 min',
      temp: '96°C',
      duration: 240000,
    },
  },
  {
    label: 'Moka pot',
    icon: MokaPotIcon,
    strengths: [
      { type: 'mild', label: 'Mild', ratio: 15 },
      { type: 'normal', label: 'Normal', ratio: 10 },
      { type: 'strong', label: 'Strong', ratio: 7 },
    ],
    details: {
      grind: 'Fine',
      time: '1 min',
      temp: '96°C',
      duration: 60000,
    },
  },
  {
    label: 'Espresso',
    icon: EspressoIcon,
    strengths: [
      { type: 'mild', label: 'Lungo', ratio: 3 },
      { type: 'normal', label: 'Espresso', ratio: 2 },
      { type: 'strong', label: 'Ristretto', ratio: 1 },
    ],
    details: {
      grind: 'Extra fine',
      time: '25 – 30 sec',
      temp: '92 – 96°C',
      duration: 25000,
    },
  },
];
