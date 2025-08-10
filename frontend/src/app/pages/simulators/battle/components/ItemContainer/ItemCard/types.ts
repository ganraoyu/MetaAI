export type ItemCardHoverProps = {
  itemName: string;
  className?: string;
};

export type ItemStats = {
  name: string;
  description: string;
  additionalAbilityPower?: number;
  additionalAttackDamage?: number;
  additionalAttackSpeed?: number;
  additionalArmor?: number;
  additionalMagicResist?: number;
  additionalHealth?: number;
  additionalStartingMana?: number;
  additionalManaPerAttack?: number;
  additionalCritChance?: number;
  additionalDamageAmp?: number;
  additionalPercentageHealth?: number;
  componentsImages?: string[];
};