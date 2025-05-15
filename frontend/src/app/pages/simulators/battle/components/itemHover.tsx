import { combinedItems } from "../data/item-data"
import { useState } from "react"

interface ItemData {
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

export const ChampionCardItemHover = ({
  name,
  description,
  image,
  components,
  componentsImages,
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
    <div className="bg-hexCellBackground absolute z-4 border border-gray-800 rounded-md shadow-2xl shadow-gray-900 w-56">
      {/* Stats */}
      <div className="text-xs p-2 flex flex-row items-center justify-between">
        <div className="flex flex-col"> 
          <p className="text-m mb-1 text-base font-medium">{name}</p>
          <div className="flex flex-wrap gap-2">
        {/* Stats */}
        {(additionalAbilityPower || 0) > 0 && (
        <div className="flex items-center gap-1">
          <img src="../assets/icons/abilitypower.png" className="h-4 w-4" alt="ability power"/>
          <p>+{additionalAbilityPower}</p>
          </div>
        )}
        {(additionalAttackDamage || 0) > 0 && (
        <div className="flex items-center gap-1">
          <img src='../assets/icons/addattackdamage.png' className="h-4 w-4" alt="attack damage" />
          <p>+{additionalAttackDamage}</p>
        </div>
        )}
        {(additionalAttackSpeed || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/attackspeed.png' className="h-4 w-4" alt="attack speed" />
            <p>+{additionalAttackSpeed}</p>
          </div>
        )}
        {(additionalArmor || 0) > 0 && (
        <div className="flex items-center gap-1">
          <img src='../assets/icons/armor.png' className="h-4 w-4" alt="armor" />
          <p>+{additionalArmor}</p>
        </div>
        )}
        {(additionalMagicResist || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/magicresist.png' className="h-4 w-4" alt="magic resist" />
            <p>+{additionalMagicResist}</p>
          </div>
        )}
        {(additionalHealth || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/health.png' className="h-4 w-4" alt="health" />
            <p>+{additionalHealth}</p>
          </div>  
        )}
        {(additionalStartingMana || 0 ) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/addmana.png' className="h-4 w-4" alt="starting mana" />
            <p>+{additionalStartingMana}</p>
          </div>
        )}
        {(additionalManaPerAttack || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/addmana.png' className="h-4 w-4" alt="mana per attack" />
            <p>+{additionalManaPerAttack}</p>
          </div>
        )}
        {(additionalCritChance || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/criticalstrikechance.png' className="h-4 w-4" alt="crit chance" />
            <p>+{additionalCritChance}</p>
          </div>
        )}
        {(additionalDamageAmp || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/damageamp.png' className="h-4 w-4" alt="damage amp" />
            <p>+{additionalDamageAmp}</p>
          </div>
        )}
        {(additionalPercentageHealth || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/percentagehealth.png' className="h-4 w-4" alt="percentage health" />
            <p>+{additionalPercentageHealth}</p>
          </div>
        )}
        {(omnivamp || 0) > 0 && (
          <div className="flex items-center gap-1">
            <img src='../assets/icons/omnivamp.png' className="h-4 w-4" alt="omnivamp" />
            <p>+{omnivamp}</p>
          </div>
        )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          {componentsImages && componentsImages.length > 0 && (
            <div className="flex items-center gap-1">
              <img src={componentsImages[0]} alt={componentsImages[0]} className="h-6 w-6 border-2 border-black" />
              <p className="text-xl">+</p>
              <img src={componentsImages[1]} alt={componentsImages[1]} className="h-6 w-6 border-2 border-black" />
            </div>
            )}
        </div>
      </div>
      {/* Description */}
      <div className="p-2">
        <p className="text-[0.65rem] text-gray-200">{description}</p>
      </div>
    </div>
  )
} 


