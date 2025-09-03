import React from "react";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";

type HealSource = { type: "ability"; abilityName?: string } | "omnivamp" | "item";

interface HealBreakDownProps {
  healAmount: number;
  source: HealSource;
}

export const HealHover: React.FC<HealBreakDownProps> = ({ healAmount, source }) => {
  const { set } = useTFTSetContext();

  const abilityName = () => {
    if (typeof source === "object" && source.type === "ability" && source.abilityName) {
      const name = source.abilityName.trim(); // remove any leading/trailing spaces
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().replace(/\s/g, "");
    }
  };

  return (
    <div className="absolute bg-gray-800 text-white rounded-md p-2 shadow-lg border border-gray-700 w-52 z-50 text-sm">
      {/* Header with heal icon and heal amount */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-1 mb-2">
        <div className="flex items-center gap-1.5">
          <img src="../assets/icons/health.png" alt="heal icon" className="h-6 w-6" />
          <span className="font-medium">Heal</span>
        </div>
        <span className="font-bold text-green-400">+{healAmount}</span>
      </div>

      {/* Heal source info */}
      <div className="text-xs text-gray-300">
        <div className="flex justify-between">
          <span>Source:</span>
          {source === "omnivamp" && (
            <img src={`../assets/icons/${source}.png`} className="w-4 h-4" />
          )}
          {typeof source === "object" && source.type === "ability" && (
            <img src={`../assets/${set}/abilities/${abilityName()}.png`} className="w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
};
