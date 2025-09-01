import { traitsSET13 } from '../SET13/trait-data';

export const getTraitBySet = (set: string) => {
  switch (set) {
    case 'SET13':
      return traitsSET13;
    case 'SET14':
      return [];
  }
};
