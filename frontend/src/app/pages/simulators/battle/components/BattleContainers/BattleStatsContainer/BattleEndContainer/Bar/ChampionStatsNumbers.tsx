import { getDamageTotals, getHealTotals } from "./calculateChampionTotals";
import { ChampionProps } from "./types";

/**
 * ChampionStatsNumbers
 * 
 * Displays a champion's total damage and total healing as numbers
 * Damage is color-coded by type, healing is green, separated by a slash
 *
 * @param {ChampionProps} champion - The champion object containing stats
 * @returns {JSX.Element} A React component displaying Champion's damage and healing
*/

export const ChampionStatsNumbers = ({ champion }: ChampionProps): JSX.Element => {
  const {
    totalChampionDamage,
    totalChampionMagicDamage,
    totalChampionTrueDamage,
    totalChampionAbilityDamage,
    allChampionDamage
  } = getDamageTotals(champion);

  const totalChampionHealing = getHealTotals(champion) ?? 0;

  // Determine which damage type is the largest
  const maxDamageValue = Math.max(
    totalChampionDamage,
    totalChampionMagicDamage,
    totalChampionAbilityDamage,
    totalChampionTrueDamage
  );

  const getDamageTextColor = (): string => {
    if (maxDamageValue === totalChampionTrueDamage) return "text-white";
    if (maxDamageValue === totalChampionMagicDamage) return "text-blue-400";
    if (maxDamageValue === totalChampionAbilityDamage) return "text-purple-500";
    return "text-red-400"; // Default to physical damage color
  };

  return (
    <div className="pl-2">
      <div className="flex flex-row gap-1 text-[0.8rem]">
        <p className={getDamageTextColor()}>{allChampionDamage}</p>
        <span className="text-gray-400">/</span>
        <p className="text-green-400">{totalChampionHealing}</p>
      </div>
    </div>
  );
};
