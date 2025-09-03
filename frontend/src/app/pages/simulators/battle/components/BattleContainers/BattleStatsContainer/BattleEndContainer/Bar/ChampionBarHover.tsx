import { ChampionProps } from "./types";

/**
 * ChampionBarHover
 *
 * Displays a detailed breakdown of a champion's damage in TFT including
 * - Physical
 * - Magic
 * - True
 *
 * Each damage type is colored according to its type
 * - Physical: red
 * - Magic: purple/blue
 * - True: white
 *
 * @param {number} champion.allChampionDamage - Total damage done by the champion
 * @param {number} champion.totalChampionDamage - Physical damage done
 * @param {number} champion.totalChampionAbilityDamage - Ability/magic damage done
 * @param {number} champion.totalChampionMagicDamage - Magic damage done
 * @param {number} champion.totalChampionTrueDamage - True damage done
 * @returns {JSX.Element} A React component showing a damage breakdown for a champion
 */

const getDamageTextColor = (damageType: string): string => {
  if (damageType === "allChampionDamage") return "text-gray-400";
  if (damageType === "totalChampionTrueDamage") return "text-white";
  if (damageType === "totalChampionMagicDamage") return "text-blue-400";
  if (damageType === "totalChampionAbilityDamage") return "text-purple-500";
  return "text-red-400";
};

export const ChampionBarHover = ({ champion }: ChampionProps): JSX.Element => {
  return (
    <div
      className="absolute bg-[#161616] w-40 h-[9.75rem] z-50 pointer-events-none px-3 
                border border-[#464646] shadow-md shadow-gray-700/50 rounded-md"
    >
      {/* Champion name */}
      <div className="font-semibold mt-3 mb-1 text-left text-[#ffffff]">{champion.name}</div>

      {/* Top horizontal line */}
      <div className="flex flex-col items-center mb-2">
        <div className="w-[9.25rem] border-t border-gray-600" />
      </div>

      {/* Damage breakdown */}
      <div className="text-[0.75rem] text-white flex flex-col gap-1">
        {[
          {
            label: "Physical",
            value: champion.totalChampionDamage ?? 0,
            type: "totalChampionDamage",
          },
          {
            label: "Magic",
            value:
              (champion.totalChampionAbilityDamage ?? 0) + (champion.totalChampionMagicDamage ?? 0),
            type: "totalChampionAbilityDamage",
          },
          {
            label: "True",
            value: champion.totalChampionTrueDamage ?? 0,
            type: "totalChampionTrueDamage",
          },
        ].map(({ label, value, type }) => (
          <div key={label} className="flex justify-between">
            <div>{label}:</div>
            <div className={getDamageTextColor(type)}>{value}</div>
          </div>
        ))}
      </div>

      {/* Bottom horizontal line */}
      <div className="flex flex-col items-center mt-2 mb-2">
        <div className="w-[9.25rem] border-t border-gray-600" />
      </div>

      {/* Total damage */}
      <div className="text-[0.75rem] text-white flex justify-between mb-2">
        <div>Total:</div>
        <div className={getDamageTextColor("allChampionDamage")}>{champion.allChampionDamage}</div>
      </div>
    </div>
  );
};
