import React from 'react';

export type Unit = 'g' | 'cs' | 'c' | 'ml';

export interface WeightUnit {
  name: string;
  unit: Unit;
  extra?: string;
}

export interface Instruction {
  grind: string;
  temp: string;
  time: string;
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
  details: Instruction;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
