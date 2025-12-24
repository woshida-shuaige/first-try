
export type PetMood = 'IDLE' | 'HAPPY' | 'THINKING' | 'SLEEPY' | 'SURPRISED';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

// Fix: Added PetConfig interface required by Settings component
export interface PetConfig {
  name: string;
  friendName: string;
  color: string;
}
