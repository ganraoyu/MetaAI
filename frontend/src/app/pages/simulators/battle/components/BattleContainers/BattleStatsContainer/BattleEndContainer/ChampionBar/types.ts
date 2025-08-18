export interface Champion {
  name: string;
  totalChampionDamage: number;
  totalChampionTrueDamage: number;
  totalChampionMagicDamage: number;
  totalChampionAbilityDamage: number;
  allChampionDamage: number;
  totalChampionHealing: number;
  totalChampionShield?: number;
}

export interface ChampionProps {
  champion: Champion;
}
