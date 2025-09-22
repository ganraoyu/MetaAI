import { useTFTSetContext } from "../../../utilities/TFTSetContext";
import { getAveragePlaceColors } from "../utils/averagePlaceColors";
import { getTierBackgroundColors } from "../utils/tierColors";
import { getCostBorderColors } from "../utils/costBorderColors";
import { ChampionCardProps, ChampionCellProps } from "./types";

const ChampionCell = ({children, width, index}: ChampionCellProps) => (
  <div className={`h-[2.4rem] flex items-center ${width} ${index % 2 === 1 ? "bg-[#141212]" : "bg-[#1e1d1d]"}`}>
    {children}
  </div>
);

export const ChampionCard = ({
  champion,
  cost,
  tier,
  averagePlacement,
  winRate,
  frequency,
  popularItems,
  index,
}: ChampionCardProps) => {
  const { set } = useTFTSetContext();

  return (
    <div className={`flex flex-row items-center justify-center hover:bg-[#0a0a0a] hover:cursor-pointer group`}>
      
      {/* Rank */}
      <ChampionCell width="w-[5rem] justify-center border-l border-r border-[#363636] text-[0.9rem] text-[#bcbcbc] group-hover:bg-[#2a2a2a]" index={index}> 
        <p
          className={`font-medium ${
            index === 0
              ? "text-[#FFD700]"
              : index === 1
              ? "text-[#C0C0C0]"
              : index === 2
              ? "text-[#CD7F32]"
              : ""
          }`}
        >
          {index + 1}
        </p>
      </ChampionCell>
      
      {/* Champion Image */}
      <ChampionCell width={`w-[20rem] border-r border-[#363636] group-hover:bg-[#2a2a2a]`} index={index}>
        <img
          src={`../assets/${set}/champions/centered/${champion}.png`}
          alt={champion}
          className={`w-8 h-8 m-1 border border-${getCostBorderColors(cost)}`}
        />
        <p className="text-[#bcbcbc] text-[0.9rem]">{champion}</p>
      </ChampionCell>

      {/* Rest of your cells with group-hover:bg-[#2a2a2a] added to each */}
      <ChampionCell width="w-[5rem] justify-center border-r border-[#363636] group-hover:bg-[#2a2a2a]" index={index}>
        <div className={`w-[1.7rem] h-[1.7rem] text-black flex items-center justify-center text-[0.9rem] font-bold rounded-sm ${getTierBackgroundColors(tier)}`}>
          {tier}
        </div>
      </ChampionCell>

      <ChampionCell width={`w-[8rem] justify-center border-r border-[#363636] text-[0.9rem] ${getAveragePlaceColors(averagePlacement)} group-hover:bg-[#2a2a2a]`} index={index}>
        {averagePlacement}
      </ChampionCell>

      <ChampionCell width="w-[10rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]" index={index}>
        {winRate}%
      </ChampionCell>

      <ChampionCell width="w-[10rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]" index={index}>
        {frequency}
      </ChampionCell>

      <ChampionCell width="w-[17rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]" index={index}>
        {popularItems.map((item, index) => (
          <img
            key={index}
            src={`../assets/items/combined/${item}.png`}
            alt={item}
            className="w-6 h-6 m-1"
          />
        ))}
      </ChampionCell>
    </div>
  );
};
  