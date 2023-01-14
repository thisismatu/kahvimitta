import React from 'react';

export type Unit = 'g' | 'cs' | 'c' | 'ml';

export interface WeightUnit {
  name: string;
  unit: Unit;
  extra?: string;
}

export interface Strength {
  name: 'Strong' | 'Normal' | 'Mild';
  ratio: number;
}

export interface BrewMethod {
  name: string;
  strengths: Strength[];
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}
