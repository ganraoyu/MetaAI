export interface TraitTier {
  count: number;
  effect: string;
  tierLabel: 'Bronze' | 'Silver' | 'Gold' | 'Prismatic';
  stats: {
    [key: string]: number;
  };
}

export interface Trait {
  name: string;
  image: string;
  description: string;
  tiers: TraitTier[];
}
