import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { AbilityInfo } from "./AbilityInfo";
import { ChampionImage } from "./ChampionImage";
import { ChampionHoverInfoProvider, useChampionHoverInfoContext } from "./ChampoinHoverInfoContext";
import { ToggleAbilityStatsSwitch } from "./ToggleAbilityStatsSwitch";
import { ChampionHoverInfoProps } from "./types";

export const ChampionHoverInfo = (props: ChampionHoverInfoProps) => {
  return (
    <ChampionHoverInfoProvider>
      <ChampionHoverInfoContent {...props} />
    </ChampionHoverInfoProvider>
  );
}

const ChampionHoverInfoContent = ({
  champion,
  cost,
  traits,
  items,
  stats,
  starLevelStats,
  starLevel,
}: ChampionHoverInfoProps) => {
  const { set } = useTFTSetContext();
  const {
    toggleAbilityStatsSwitch,
    setToggleAbilityStatsSwitch,
  } = useChampionHoverInfoContext();

  const imageAbilityName = stats.abilityName.replace(/\s/g, "");

  const borderColor =
    cost === 1 ? "border-gray-400" :
    cost === 2 ? "border-green-500" :
    cost === 3 ? "border-blue-500" :
    cost === 4 ? "border-purple-700" :
    cost === 5 ? "border-yellow-500" :
    cost === 6 ? "border-orange-500" :
    "border-red-500";

  return (
    <div className="absolute z-50 bg-hexCell text-white rounded-md w-[16rem] origin-bottom animate-grow-in shadow-2xl shadow-gray-900 -top-[17rem]">
      <ChampionHoverInfoProvider>
        <ChampionImage
          set={set}
          champion={champion}
          traits={traits}
          cost={cost}
          borderColor={borderColor}
        />

        <ToggleAbilityStatsSwitch 
          toggleAbilityStatsSwitch={toggleAbilityStatsSwitch}
          setToggleAbilityStatsSwitch={setToggleAbilityStatsSwitch}
        />

        {!toggleAbilityStatsSwitch ? (
          <AbilityInfo
            set={set}
            imageAbilityName={imageAbilityName}
            abilityName={stats.abilityName}
            abilityDescription={stats.abilityDescription}
            mana={stats.mana}
            maxMana={stats.abilityManaCost}
          />
        ) : (
          <div>Hi</div> // You can replace this with your Stats component later
        )}

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

