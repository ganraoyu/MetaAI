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