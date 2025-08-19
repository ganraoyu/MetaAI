import { getHealTotals, getTotalBarWidth } from "./calculateChampionTotals";
import { ChampionProps } from "./types";
import { buildHealShieldGradient, getHealShieldPercentages } from "./utils";

/**
 * ChampionHealShieldBar
 * 
 * Displays a champion's total healing and shield as a proportional bar.
 * The bar visually represents the breakdown between healing and shield values.
 *
 * @param {ChampionProps} champion - The champion object containing stats.
 * @param {number} champion.totalChampionShield - (Optional) The total shield amount the champion has.
 * @param {...any} champion.* - Other properties used by getHealTotals or getTotalBarWidth.
 * 
 * @returns {JSX.Element} A React component showing the healing and shield bar.
*/

export const ChampionHealShieldBar = ({ champion }: ChampionProps) => {
  const totalChampionHealing = getHealTotals(champion);
  const shield = champion.totalChampionShield || 0;
  const total = totalChampionHealing + shield;

  const { healPercent, shieldPercent } = getHealShieldPercentages(totalChampionHealing, shield, total);

  const gradient = buildHealShieldGradient(healPercent, shieldPercent);

  // Get the maximum bar width (for proportional sizing)
  const barWidth = getTotalBarWidth(champion)

  // Calculate the CSS width as a percentage of the maximum bar width
  const widthPercentage = barWidth ? ((totalChampionHealing + shield) / barWidth) * 100 : 0;
  return (
    <div className="mb-2">
      <div className="ml-2">
        <div className="relative w-[9rem] h-2 border border-[#41384b] bg-[#2a2431]">
          <div className="absolute top-0 left-0 w-full h-full border-t-[1px] border-l-[1px] border-white opacity-20 pointer-events-none"></div>
          <div
            style={{
              width: `${widthPercentage}%`,
              height: "100%",
              background: gradient,
              borderRadius: "1px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
