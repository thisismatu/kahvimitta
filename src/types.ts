export type Unit = 'g' | 'cs' | 'c' | 'ml';

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
