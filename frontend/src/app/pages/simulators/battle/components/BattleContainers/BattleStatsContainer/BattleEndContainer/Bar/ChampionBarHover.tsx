import { ChampionProps } from "./types";

/**
 * ChampionBarHover
 *
 * @returns {JSX.Element} A React component showing a detailed break down of damage, healing, and shielding
 */
export const ChampionBarHover = ({ champion }: ChampionProps): JSX.Element => {
  const getDamageTextColor = (damageType: string) => {
    if (damageType === "allChampionDamage") return "text-gray-400"
    if (damageType === "totalChampionTrueDamage") return "text-white";
    if (damageType === "totalChampionMagicDamage") return "text-blue-500";
    if (damageType === "totalChampionAbilityDamage") return "text-purple-500";
    return "text-red-500";
  };

  return (
    <div
      className="absolute bg-[#1e1e1e] w-44 h-[9.75rem] z-50 pointer-events-none px-3 
                    border border-[#464646] shadow-md shadow-gray-700/50 rounded-md"
    >
      {/* Champion name on the left */}
      <div className="font-semibold mt-3 mb-1">{champion.name}</div>

      <div className="flex flex-col items-center gap-2 mb-2">
        {/* Horizontal line filling the rest of the space */}
        <div className="w-[9.25rem] border-t border-gray-600" />
      </div>

      <div className="text-[0.75rem] text-[#bebcbc] flex flex-col gap-1">
        {[
          { label: "Physical", value: champion.totalChampionDamage ?? 0, type: "totalChampionDamage" },
          { label: "Magic", value: (champion.totalChampionAbilityDamage ?? 0) + (champion.totalChampionMagicDamage ?? 0), type: "totalChampionAbilityDamage" },
          { label: "True", value: champion.totalChampionTrueDamage ?? 0, type: "totalChampionTrueDamage" },
        ].map(({ label, value, type }) => (
          <div key={label} className="flex justify-between">
            <div>{label}:</div>
            <div className={getDamageTextColor(type)}>{value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 mt-2 mb-2">
        {/* Horizontal line filling the rest of the space */}
        <div className="w-[9.25rem] border-t border-gray-600" />
      </div>
      
      <div className="text-[0.75rem] text-[#bebcbc] flex justify-between mb-2">
        <p>Total: </p>
        <p className={getDamageTextColor('allChampionDamage')}>{champion.allChampionDamage}</p>
      </div>

      {/* Other content can go below */}
    </div>
  );
};
