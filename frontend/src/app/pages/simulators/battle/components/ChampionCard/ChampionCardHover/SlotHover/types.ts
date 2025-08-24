export interface AbilitySlotHoverProps {
  ability: string;
  description: string;
}

export interface ItemSlotHoverProps {
  name: string;
  description: string;
  components: string[];
  componentsImages: string[];
  image: string;
  additionalAttackSpeed?: number;
  additionalAbilityPower?: number;
  additionalAttackDamage?: number;
  additionalHealth?: number;
  additionalPercentageHealth?: number;
  additionalArmor?: number;
  additionalMagicResist?: number;
  additionalStartingMana?: number;
  additionalManaPerAttack?: number;
  additionalCritChance?: number;
  additionalDamageAmp?: number;
  attackSpeedStacking?: boolean;
  additionalAttackSpeedPerStack?: number;
  abilityPowerStacking?: boolean;
  abilityPowerStackInterval?: number;
  additionalAbilityPowerPerStack?: number;
  abilityCritStrike?: boolean;
  shield?: boolean;
  shieldAmount?: number;
  shieldDuration?: number;
  omnivamp?: number;
  heal?: boolean;
  healAmount?: number;
  reduction?: boolean;
  reductionAmount?: number;
  externalMagicDamage?: number;
  sunder?: boolean;
  sunderRadius?: number;
  shred?: boolean;
  burn?: boolean;
  wound?: boolean;
}