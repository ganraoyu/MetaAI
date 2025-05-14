import { combinedItems } from "../data/item-data"
import { useState } from "react"

interface ItemData {
  name: string;
  description: string;
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

export const ChampionCardItemHover = ({
  name,
  description,
  image,
  additionalAttackSpeed,
  additionalAbilityPower,
  additionalAttackDamage,
  additionalHealth,
  additionalPercentageHealth,
  additionalArmor,
  additionalMagicResist,
  additionalStartingMana,
  additionalManaPerAttack,
  additionalCritChance,
  additionalDamageAmp,
  attackSpeedStacking,
  additionalAttackSpeedPerStack,
  abilityPowerStacking,
  abilityPowerStackInterval,
  additionalAbilityPowerPerStack,
  abilityCritStrike,
  shield,
  shieldAmount,
  shieldDuration,
  omnivamp,
  heal,
  healAmount,
  reduction,
  reductionAmount,
  externalMagicDamage,
  sunder,
  sunderRadius,
  shred,
  burn,
  wound
}: ItemData) => {
  return (
    <div className="bg-orange-950 absolute z-4 border-2 border-orange-500 rounded-md box-shadow-lg ">
      <div>
        <p className="text-m">{name}</p>
        <div>
          <p>+{additionalAbilityPower}</p>
          </div>
      </div>
    </div>
  )
}
