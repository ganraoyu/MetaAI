import { getItemByName } from "../../../../../../data/dataUtils";
import { ItemCardHoverProps } from "./types";

export const ItemCardHover = ({ itemName, className = "" }: ItemCardHoverProps) => {
  const stats: any = getItemByName(itemName);

  if (!stats) return null;

  return (
    <div
      className={`absolute bottom-full left-[-7.5rem] -translate-x-1/2 mb-1 z-50
              w-[17rem] bg-[#161616] border border-[#464646] shadow-md shadow-gray-700/50 rounded-md
              origin-bottom animate-grow-in
              ${className}`}
    >
      {/* Stats */}
      <div className="text-xs p-2 flex flex-row items-center justify-between">
        <div className="flex flex-col ">
          <p className="text-[0.8rem] font-medium">{stats.name}</p>
          <div className="flex flex-wrap gap-2">
            {(stats?.additionalAbilityPower || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img
                  src="../assets/icons/abilitypower.png"
                  className="h-4 w-4"
                  alt="ability power"
                />
                <p>+{stats.additionalAbilityPower}</p>
              </div>
            )}
            {(stats?.additionalAttackDamage || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img
                  src="../assets/icons/addattackdamage.png"
                  className="h-4 w-4"
                  alt="attack damage"
                />
                <p>+{stats.additionalAttackDamage}</p>
              </div>
            )}
            {(stats?.additionalAttackSpeed || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/attackspeed.png" className="h-4 w-4" alt="attack speed" />
                <p>+{stats.additionalAttackSpeed}</p>
              </div>
            )}
            {(stats?.additionalArmor || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/armor.png" className="h-4 w-4" alt="armor" />
                <p>+{stats.additionalArmor}</p>
              </div>
            )}
            {(stats?.additionalMagicResist || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/magicresist.png" className="h-5 w-5" alt="magic resist" />
                <p>+{stats.additionalMagicResist}</p>
              </div>
            )}
            {(stats?.additionalHealth || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/health.png" className="h-4 w-4" alt="health" />
                <p>+{stats.additionalHealth}</p>
              </div>
            )}
            {(stats?.additionalStartingMana || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/addmana.png" className="h-4 w-4" alt="starting mana" />
                <p>+{stats.additionalStartingMana}</p>
              </div>
            )}
            {(stats?.additionalManaPerAttack || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/addmana.png" className="h-4 w-4" alt="mana per attack" />
                <p>+{stats.additionalManaPerAttack}</p>
              </div>
            )}
            {(stats?.additionalCritChance || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img
                  src="../assets/icons/criticalstrikechance.png"
                  className="h-4 w-4"
                  alt="crit chance"
                />
                <p>+{stats.additionalCritChance}</p>
              </div>
            )}
            {(stats?.additionalDamageAmp || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/damageamp.png" className="h-4 w-4" alt="damage amp" />
                <p>+{stats.additionalDamageAmp}</p>
              </div>
            )}
            {(stats?.additionalPercentageHealth || 0) > 0 && (
              <div className="flex items-center gap-1">
                <img src="../assets/icons/health.png" className="h-4 w-4" alt="percentage health" />
                <p>+{stats.additionalPercentageHealth}%</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end border-b border-gray-600 pb-2">
          {stats.componentsImages && stats.componentsImages.length > 0 && (
            <div className="flex items-center gap-1">
              <img
                src={stats.componentsImages[0]}
                alt="component 1"
                className="h-6 w-6 border border-black"
              />
              <p className="text-xl">+</p>
              <img
                src={stats.componentsImages[1]}
                alt="component 2"
                className="h-6 w-6 border border-black"
              />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-2">
        <p className="text-[0.65rem] text-gray-200">{stats.description}</p>
      </div>

      <style>{`
          @keyframes growIn {
            from {
              transform: scale(0.6);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes growOut {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0.6);
              opacity: 0;
            }
          }
          .animate-grow-in {
            animation: growIn 0.2s ease-out forwards;
          }
          
          .animate-grow-out {
            animation: growOut 0.2s ease-out forwards;
          }
        `}</style>
    </div>
  );
};
