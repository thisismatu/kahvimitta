import React from 'react';

export type Unit = 'g' | 'cs' | 'tbsp' | 'c' | 'ml' | 'l';

export interface WeightUnit {
  label: string;
  unit: Unit;
  extra?: string;
}

export interface Amount {
  round: number;
  exact: number;
}

export interface Strength {
  type: 'mild' | 'normal' | 'strong';
  label: string;
  ratio: number;
}

export interface Instruction {
  grind: string;
  temp: string;
  time: string;
  durationMs: number;
  durationIncrement: number;
}

export interface BrewMethod {
  label: string;
  strengths: Strength[];
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  details: Instruction;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
