export interface ChampionImageProps {
  champion: string;
  cost: number;
  starLevel: number;
  trait1?: string;
  trait2?: string;
  trait3?: string;
}

export interface ChampionStatBarsProps {
  currentHp: number;
  maxHp: number;
  shield: number;
  mana: number;
  maxMana: number;
}

export interface ChampionAbilityProps {
  champion: string;
}

export interface ChampionItemSlotProps {
  item1?: string;
  item2?: string;
  item3?: string;
}

export interface ChampionItemHoverProps {
  champion: string;
}

export interface ChampionStatsGridProps {
  armor: number;
  magicResist: number;
  attackDamage: number;
  attackSpeed: number;
  critChance: number;
  critDamage: number;
  abilityPower: number;
  damageAmp: number;
  omnivamp: number;
  reduction: number;
  range: number;
}
