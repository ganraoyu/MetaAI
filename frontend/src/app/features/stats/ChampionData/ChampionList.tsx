import { getTier } from "../utilities/tierLetter";
import { ChampionCard } from "./ChampionCard";
import { useChampionDataContext } from "./ChampionDataContext";
import { HeaderCellProps } from "./types";

const HeaderCell = ({
  children,
  width,
  isFirst = false,
}: HeaderCellProps) => (
  <div
    className={`h-[2rem] ${width} border-t border-b border-r border-[#363636] font-medium ${
      isFirst ? "border-l pl-1 justify-start" : ""
    }`}
  >
    {children}
  </div>
);


export const ChampionList = () => {
  const { totalGames, championData } = useChampionDataContext(); 
  console.log("Total games in ChampionList:", totalGames);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-[-0.4rem]">

      {/* Header */}
      <div className="flex flex-row items-center justify-center text-[0.9rem]">
        <HeaderCell width="flex items-center justify-center w-[5rem]" isFirst>Rank</HeaderCell>
        <HeaderCell width="flex items-center justify-start w-[20rem] pl-2">Unit</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[5rem]">Tier</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[8rem]">Avg. Place</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[10rem]">Win Rate</HeaderCell>
        <HeaderCell width="flex items-center justify-end w-[10rem] pr-2">Frequency</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[17rem]">Popular Items</HeaderCell>
      </div>

      {/* Champion Rows */}
      <div className="w-full">  
        {championData.map((champion, index) => (
          <ChampionCard 
            key={index} 
            champion={champion.championId} 
            winRate={champion.winrate} 
            index={index}
            cost={champion.cost || 1}
            tier={getTier(champion.averagePlacement)}
            averagePlacement={champion.averagePlacement}
            totalGames={champion.totalGames}
            frequency={champion.totalGames / totalGames }
            popularItems={champion.popularItems || []} 
          />
        ))}
      </div>
    </div>
  );
};
