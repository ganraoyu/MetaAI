import { combinedItems } from "../../data/item-data"
import { useState } from "react"
import { ItemSlotHoverProps } from "./types";

export const ItemHover = ({
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
}: ItemSlotHoverProps) => {
  return (
    <div className="bg-[#161616] z-4 border border-gray-700 rounded-md shadow-sm shadow-gray-700 w-60">
      {/* Stats */}
      <div className="text-xs p-2 flex flex-row items-center justify-between">
        <div className="flex flex-col "> 
          <p className="text-base font-medium">{name}</p>
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
              <div className="flex items-center ">
                <img src='../assets/icons/magicresist.png' className="h-5 w-5" alt="magic resist" />
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
                <img src='../assets/icons/health.png' className="h-4 w-4" alt="percentage health" />
                <p>+{additionalPercentageHealth}%</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end border-b border-gray-600 pb-2">
          {componentsImages && componentsImages.length > 0 && (
            <div className="flex items-center gap-1">
              <img src={componentsImages[0]} alt={componentsImages[0]} className="h-6 w-6 border border-black" />
              <p className="text-xl">+</p>
              <img src={componentsImages[1]} alt={componentsImages[1]} className="h-6 w-6 border border-black" />
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
};

