import { buildDamageGradient, getDamagePercentages } from "./utils";
import { getDamageTotals, getTotalBarWidth  } from "./calculateChampionTotals";
import { ChampionProps } from "./types";

export const ChampionDamageBar = ({ champion }: ChampionProps) => {
  const {
    totalChampionDamage,
    totalChampionMagicDamage,
    totalChampionTrueDamage,
    totalChampionAbilityDamage,
  } = getDamageTotals(champion);

  const total =
    totalChampionDamage +
    totalChampionMagicDamage +
    totalChampionTrueDamage +
    totalChampionAbilityDamage;

  const physicalPercent = getDamagePercentages(totalChampionDamage, total);
  const magicPercent = getDamagePercentages(totalChampionMagicDamage, total);
  const abilityPercent = getDamagePercentages(
    totalChampionAbilityDamage,
    total
  );
  const truePercent = getDamagePercentages(totalChampionTrueDamage, total);

  const gradient = buildDamageGradient(
    truePercent,
    physicalPercent,
    magicPercent,
    abilityPercent,
  );

  return (
    <div className="mb-1">
      <div className="ml-2">
        <p className="text-[0.8rem] text-red-400">{total}</p>

        {/* Damage Bar Outer */}
        <div className="relative w-32 h-2 border border-[#41384b] bg-[#2a2431]">
          {/* Top-left highlight */}
          <div className="absolute top-0 left-0 w-full h-full border-t-[1px] border-l-[1px] border-white opacity-20 pointer-events-none"></div>
          {/* Inner Gradient Bar */}
          <div
            style={{
              width: `${
                total
                  ? ((totalChampionDamage +
                      totalChampionMagicDamage +
                      totalChampionTrueDamage +
                      totalChampionAbilityDamage) /
                      total) *
                    100
                  : 0
              }%`,
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
