export type Unit = 'g' | 'cm' | 'c' | 'ml';

export interface WeightUnit {
  name: string;
  unit: Unit;
}

export interface Strength {
  name: 'strong' | 'normal' | 'mild';
  ratio: number;
}

export interface BrewMethod {
  name: string;
  strengths: Strength[];
}
