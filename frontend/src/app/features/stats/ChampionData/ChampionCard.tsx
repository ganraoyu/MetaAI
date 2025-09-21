import { useTFTSetContext } from "../../../utilities/TFTSetContext";
import { averagePlaceColors } from "../utils/averagePlaceColors";
import { tierBackgroundColors } from "../utils/tierColors";
import { ChampionCardProps, ChampionCellProps } from "./types";

const ChampionCell = ({children, width, index}: ChampionCellProps) => (
  <div className={`h-[2.4rem] flex items-center ${width} ${index % 2 === 1 ? "bg-[#141212]" : "bg-[#1e1d1d]"}`}>
    {children}
  </div>
);

export const ChampionCard = ({
  champion,
  tier,
  averagePlacement,
  winRate,
  frequency,
  popularItems,
  index,
}: ChampionCardProps) => {
  const { set } = useTFTSetContext();

  return (
    <div className={`flex flex-row items-center justify-center`}>

      {/* Champion Image */}
      <ChampionCell width="w-[20rem] border-l border-r border-[#5e5e5e]"index={index}>
        <img
          src={`../assets/${set}/champions/centered/${champion}.png`}
          alt={champion}
          className="w-8 h-8 m-1"
        />
        <p className="text-[#bcbcbc]">{champion}</p>
      </ChampionCell>

      {/* Tier */}
      <ChampionCell width="w-[5rem] justify-center border-r border-[#5e5e5e]" index={index}>
        <div className={`w-[2rem] h-[2rem] text-black flex items-center justify-center text-[1rem] font-bold rounded-sm ${tierBackgroundColors(tier)}`}>
          {tier}
        </div>
      </ChampionCell>

      {/* Average Placement */}
      <ChampionCell width={`w-[8rem] justify-center border-r border-[#5e5e5e] text-[0.9rem] ${averagePlaceColors(averagePlacement)}`} index={index}>
        {averagePlacement}
      </ChampionCell>

      {/* Win Rate */}
      <ChampionCell width="w-[10rem] justify-center border-r border-[#5e5e5e] text-[0.9rem]" index={index}>
        {winRate}%
      </ChampionCell>

      {/* Frequency */}
      <ChampionCell width="w-[10rem] justify-center border-r border-[#5e5e5e] text-[0.9rem]" index={index}>
        {frequency}
      </ChampionCell>

      {/* Popular Items */}
      <ChampionCell width="w-[17rem] justify-center border-r border-[#5e5e5e] text-[0.9rem]" index={index}>
        {popularItems.map((item, index) => (
          <img
            key={index}
            src={`./assets/${set}/items/${item}.png`}
            alt={item}
            className="w-6 h-6 m-1"
          />
        ))}
      </ChampionCell>
    </div>
  );
};
