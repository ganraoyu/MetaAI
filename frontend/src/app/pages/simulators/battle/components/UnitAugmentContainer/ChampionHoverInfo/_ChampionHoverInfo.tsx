import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { AbilityInfo } from "./AbilityInfo";
import { ChampionImage } from "./ChampionImage";
import { ChampionStatsGrid } from "./ChampionStatsGrid";
import {
  ChampionHoverInfoProvider,
  useChampionHoverInfoContext,
} from "./ChampoinHoverInfoContext";
import { ToggleAbilityStatsSwitch } from "./ToggleAbilityStatsSwitch";
import { ChampionHoverInfoProps } from "../../types";

export const ChampionHoverInfo = (props: ChampionHoverInfoProps) => {
  return (
    <ChampionHoverInfoProvider>
      <ChampionHoverInfoContent {...props} />
    </ChampionHoverInfoProvider>
  );
};

const ChampionHoverInfoContent = ({
  champion,
  type,
  cost,
  traits,
  stats,
  starLevelStats,
  starLevel,
  showBelow = false,
  overExtend = false,
}: ChampionHoverInfoProps) => {
  const { set } = useTFTSetContext();
  const { toggleAbilityStatsSwitch, setToggleAbilityStatsSwitch } =
    useChampionHoverInfoContext();

  const imageAbilityName = stats?.abilityName?.replace(/\s/g, "") || "";

  const borderColor =
    cost === 1
      ? "border-gray-400"
      : cost === 2
      ? "border-green-500"
      : cost === 3
      ? "border-blue-500"
      : cost === 4
      ? "border-purple-700"
      : cost === 5
      ? "border-yellow-500"
      : cost === 6
      ? "border-orange-500"
      : "border-red-500";

  return (
    <div
      className={`absolute z-50 bg-[#161616] border border-[#464646] shadow-md shadow-gray-700/50 text-white rounded-md w-[30rem] animate-grow-in
    
      ${showBelow ? "top-full origin-top" : "bottom-full mb-2 origin-bottom"} 
      ${overExtend ? "mt-5" : "mb-2"}`}
    >
      <ChampionHoverInfoProvider>
        <div className="flex">
          {/* Left Side: Image + Stats */}
          <div className="flex flex-col w-1/2">
            <ChampionImage
              set={set}
              champion={champion || ""}
              type={type || ""}
              traits={traits ? traits : ["", "", ""]}
              cost={cost || 1}
              borderColor={borderColor || "border-gray-400"}
            />

            <ChampionStatsGrid
              stats={stats}
              starLevelStats={starLevelStats}
              starLevel={starLevel}
              cost={cost}
              type={type}
              traits={traits}
            />
          </div>

          {/* Right Side: Ability Info */}
          <div className="w-1/2 p-2 flex flex-col justify-between">
            <AbilityInfo
              set={set}
              imageAbilityName={imageAbilityName}
              abilityName={stats?.abilityName || "Unknown Ability"}
              abilityDescription={
                stats?.abilityDescription || "No description available"
              }
              mana={stats?.mana || 0}
              maxMana={stats?.abilityManaCost || 0}
            />
          </div>
        </div>

        <style>{`
      .text-outline {
        text-shadow:
          -1px -1px 0 #000,
          1px -1px 0 #000,
          -1px 1px 0 #000,
          1px 1px 0 #000;
      }
    `}</style>
      </ChampionHoverInfoProvider>
    </div>
  );
};
