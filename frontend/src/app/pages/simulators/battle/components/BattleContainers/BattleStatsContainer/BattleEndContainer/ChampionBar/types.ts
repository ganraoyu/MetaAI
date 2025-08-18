export interface Champion {
  totalChampionDamage: number;
  totalChampionTrueDamage: number;
  totalChampionMagicDamage: number;
  totalChampionAbilityDamage: number;
  allChampionDamage: number;
  totalChampionHealing: number;
  totalChampionShield: number;
}

export interface ChampionProps {
  champion: Champion;
}
