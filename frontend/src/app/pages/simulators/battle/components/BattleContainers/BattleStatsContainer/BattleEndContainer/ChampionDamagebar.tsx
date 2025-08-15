import { buildDamageGradient, getDamagePercentages } from "./utils";

interface ChampionProps {
  champion: any; 
  set: string;
}

export const ChampionDamageBar = ({ champion, set }: ChampionProps) => {
  const {
    totalChampionDamage,
    totalChampionMagicDamage,
    totalChampionTrueDamage,
    totalChampionAbilityDamage,
  } = champion;

  const total =
    totalChampionDamage +
    totalChampionMagicDamage +
    totalChampionTrueDamage +
    totalChampionAbilityDamage;

  const physicalPercent = getDamagePercentages(totalChampionDamage, total);
  const magicPercent = getDamagePercentages(totalChampionMagicDamage, total);
  const abilityPercent = getDamagePercentages(totalChampionAbilityDamage, total);
  const truePercent = getDamagePercentages(totalChampionTrueDamage, total);

  const gradient = buildDamageGradient(truePercent, magicPercent, abilityPercent, physicalPercent);

  return (
    <div className="mb-2">
  <div className="flex flex-row items-center">
    <img
      src={`../assets/${set}/champions/centered/${champion.name}.png`}
      className="w-9 h-9"
    />
    <div className="ml-2">
      <p className="text-[0.8rem]">{total}</p>

      {/* Damage Bar Outer */}
      <div className="relative w-20 h-2 border border-[#41384b] bg-[#2a2431]">
        {/* Top-left highlight */}
        <div className="absolute top-0 left-0 w-full h-full border-t-[1px] border-l-[1px] border-white opacity-20 pointer-events-none"></div>
        {/* Inner Gradient Bar */}
        <div
          style={{
            width: `${total ? (totalChampionDamage + totalChampionMagicDamage + totalChampionTrueDamage + totalChampionAbilityDamage) / total * 100 : 0}%`,
            height: "100%",
            background: gradient,
            borderRadius: "1px",
          }}
        ></div>
      </div>
    </div>
  </div>
</div>

  );
};
