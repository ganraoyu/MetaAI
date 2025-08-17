import { buildHealShieldGradient, getHealShieldPercentages } from "./utils";

interface ChampionProps {
  champion: any;
}

export const ChampionHealShieldBar = ({ champion }: ChampionProps) => {
  const { totalChampionHealing, totalChampionShield } = champion;

  const total = totalChampionHealing || 0 + totalChampionShield || 0;
  const { healPercent, shieldPercent } = getHealShieldPercentages(
    totalChampionHealing,
    totalChampionShield,
    total
  );

  const gradient = buildHealShieldGradient(healPercent, shieldPercent);

  return (
    <div className="mb-2">
      <div className="ml-2">
        <p className="text-[0.8rem]">{total}</p>

        {/* Damage Bar Outer */}
        <div className="relative w-32 h-2 border border-[#41384b] bg-[#2a2431]">
          {/* Top-left highlight */}
          <div className="absolute top-0 left-0 w-full h-full border-t-[1px] border-l-[1px] border-white opacity-20 pointer-events-none"></div>
          {/* Inner Gradient Bar */}
          <div
            style={{
              width: `${total ? healPercent + shieldPercent : 0}%`,
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
