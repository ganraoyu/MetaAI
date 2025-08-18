import { getDamageTotals, getHealTotals } from "./calculateChampionTotals";
import { ChampionProps } from "./types";

/**
 * ChampionStatsNumbers
 * 
 * Displays a champion's total damage and total healing as numbers.
 * Damage is shown in red, healing is shown in green, separated by a slash.
 * 
 * @param {ChampionProps} champion - The champion object containing stats.
 * @param {number} champion.totalChampionShield - (Optional) Total shield value, if used elsewhere.
 * @returns {JSX.Element} A React component displaying Champion's damage, healing, and shield numbers.
*/

export const ChampionStatsNumbers = ({ champion }: ChampionProps) => {
  const { allChampionDamage = 0 } = getDamageTotals(champion);
  const totalChampionHealing = getHealTotals(champion) ?? 0;    

  return (
    <div className="ml-2">
      <div className="flex flex-row gap-1 text-[0.8rem]">
        <p className="text-red-400">{allChampionDamage}</p>
        <span className="text-[0.8rem] text-gray-400">/</span>
        <p className="text-green-400">{totalChampionHealing}</p>
      </div>
    </div>
  );
};
