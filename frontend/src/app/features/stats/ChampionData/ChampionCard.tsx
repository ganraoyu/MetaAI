import { useTFTSetContext } from "../../../utilities/TFTSetContext";
import { getAveragePlaceColors } from "../utilities/averagePlaceColors";
import { getTierBackgroundColors } from "../utilities/tierColors";
import { getCostBorderColors } from "../utilities/costBorderColors";
import { ChampionCardProps, ChampionCellProps } from "./types";
import { getRankColor } from "../utilities/rankFontColors";

const ChampionCell = ({ children, width, index }: ChampionCellProps) => (
  <div
    className={`h-[2.4rem] flex items-center ${width} ${
      index % 2 === 1 ? "bg-[#141212]" : "bg-[#1e1d1d]"
    }`}
  >
    {children}
  </div>
);

export const ChampionCard = ({
  champion,
  cost,
  tier,
  averagePlacement,
  winRate,
  totalGames,
  frequency,
  popularItems,
  index,
}: ChampionCardProps): JSX.Element => {
  const { set } = useTFTSetContext();

  // Unreadable LOLLL
  const splitChampionName = (champion: string) => {
    return (
      champion.replace("TFT15_", "").replace(/_/g, "").toLowerCase().charAt(0).toUpperCase() +
      champion.replace("TFT15_", "").replace(/_/g, "").toLowerCase().slice(1)
    );
  };

  return (
    <div className="flex flex-row items-center justify-center hover:bg-[#0a0a0a] hover:cursor-pointer group">
      {/* Rank */}
      <ChampionCell
        width="w-[5rem] justify-center border-l border-r border-[#363636] text-[0.9rem] text-[#bcbcbc] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        <p className={`font-medium ${getRankColor(index)}`}>{index + 1}</p>
      </ChampionCell>

      {/* Champion Image */}
      <ChampionCell
        width={`w-[20rem] border-r border-[#363636] group-hover:bg-[#2a2a2a]`}
        index={index}
      >
        <img
          src={`../assets/${set}/champions/centered/${champion}.png`}
          alt={champion}
          className={`w-8 h-8 m-1 border border-${getCostBorderColors(cost)}`}
        />
        <p className="text-[#bcbcbc] text-[0.9rem]">{splitChampionName(champion)}</p>
      </ChampionCell>

      {/* Tier Column */}
      <ChampionCell
        width="w-[5rem] justify-center border-r border-[#363636] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        <div
          className={`w-[1.7rem] h-[1.7rem] text-black flex items-center justify-center text-[0.9rem] font-bold rounded-sm ${getTierBackgroundColors(
            tier
          )}`}
        >
          {tier}
        </div>
      </ChampionCell>

      {/* Average Placement Column */}
      <ChampionCell
        width={`w-[8rem] justify-center border-r border-[#363636] text-[0.9rem] ${getAveragePlaceColors(
          averagePlacement
        )} group-hover:bg-[#2a2a2a]`}
        index={index}
      >
        {averagePlacement}
      </ChampionCell>

      {/* Win Rate Column */}
      <ChampionCell
        width="w-[10rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {winRate}%
      </ChampionCell>

      {/* Frequency Column */}
      <ChampionCell
        width="w-[10rem] justify-end border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        <div className="flex items-baseline gap-1 mr-2">
          <p>{totalGames}</p>
          <p className="text-[0.6rem] text-[#bcbcbc]">{frequency.toFixed(2)}%</p>
        </div>
      </ChampionCell>

      {/* Popular Items Column */}
      <ChampionCell
        width="w-[17rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
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
