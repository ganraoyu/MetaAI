import { getTotalBarWidth } from "./calculateChampionTotals";
import { ChampionProps } from "./types";
import { buildHealShieldGradient, getHealShieldPercentages } from "./utils";

export const ChampionHealShieldBar = ({ champion }: ChampionProps) => {
  const healing = champion.totalChampionHealing || 0;
  const shield = champion.totalChampionShield || 0;
  const total = healing + shield;

  const { healPercent, shieldPercent } = getHealShieldPercentages(healing, shield, total);

  const gradient = buildHealShieldGradient(healPercent, shieldPercent);

  const barWidth = getTotalBarWidth(champion)
  const widthPercentage = barWidth ? ((healing + shield) / barWidth) * 100 : 0;
  return (
    <div className="mb-2">
      <div className="ml-2">
        <div className="relative w-32 h-2 border border-[#41384b] bg-[#2a2431]">
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
