import { buildDamageGradient, getDamagePercentages } from "./utils";
import { getDamageTotals, getTotalBarWidth } from "./calculateChampionTotals";
import { ChampionProps } from "./types";

/**
 * ChampionDamageBar
 * 
 * Displays a champion's total damage and a proportional damage bar
 * showing the breakdown of physical, magic, ability, and true damage.
 *
 * @param {ChampionProps} props - The component props
 * @param {ChampionProps.champion} props.champion - The champion object containing all relevant stats
 * 
 * @returns {JSX.Element} A React component showing the damage bar.
*/

export const ChampionDamageBar = ({ champion }: ChampionProps): JSX.Element => {
  const {
    totalChampionDamage,
    totalChampionMagicDamage,
    totalChampionTrueDamage,
    totalChampionAbilityDamage,
    allChampionDamage,
  } = getDamageTotals(champion);

  // Calculate percentages for gradient (relative to total damage)
  const physicalPercent = getDamagePercentages(totalChampionDamage, allChampionDamage);
  const magicPercent = getDamagePercentages(totalChampionMagicDamage, allChampionDamage);
  const abilityPercent = getDamagePercentages(totalChampionAbilityDamage, allChampionDamage);
  const truePercent = getDamagePercentages(totalChampionTrueDamage, allChampionDamage);


  // Build gradient string
  const gradient = buildDamageGradient(truePercent, physicalPercent, magicPercent, abilityPercent);

  // Get the maximum bar width (for proportional sizing)
  const barWidth = getTotalBarWidth(champion);

  // Calculate the CSS width as a percentage of the maximum bar width
  const widthPercentage = barWidth
    ? ((totalChampionDamage +
        totalChampionMagicDamage +
        totalChampionTrueDamage +
        totalChampionAbilityDamage) /
        barWidth) *
      100
    : 0;

  return (
    <div className="mb-1 ml-2">

      {/* Damage Bar Outer */}
      <div className="relative w-[9rem] h-2 border border-[#41384b] bg-[#2a2431]">
        {/* Top-left highlight */}
        <div className="absolute top-0 left-0 w-full h-full border-t-[1px] border-l-[1px] border-white opacity-20 pointer-events-none"></div>
        {/* Inner Gradient Bar */}
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
  );
};
