import { useChampionDataContext } from "../ChampionDataContext";
import { HeaderCellProps } from "../types";
import { ChampionListSkeleton } from "./ChampionListSkeleton";
import { ChampionList } from "./ChampionList";

const HeaderCell = ({ children, width, isFirst = false }: HeaderCellProps) => (
  <div
    className={`h-[2rem] ${width} border-t border-b border-r border-[#363636] font-medium ${
      isFirst ? "border-l pl-1 justify-start" : ""
    }`}
  >
    {children}
  </div>
);

export const ChampionListContainer = () => {
  const { totalGames, championStats, championItemStats, rank } =
    useChampionDataContext();

  const normalizedRankBIS =
    rank.length === 1
      ? String(rank[0]) !== "all"
        ? `${rank[0].toLowerCase()}BIS`
        : "BIS"
      : "rankBISTotal";
  console.log(normalizedRankBIS);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-[-0.4rem]">
      {/* Header */}
      <div className="flex flex-row items-center justify-center text-[0.9rem]">
        <HeaderCell width="flex items-center justify-center w-[5rem]" isFirst>
          Rank
        </HeaderCell>
        <HeaderCell width="flex items-center justify-start w-[20rem] pl-2">Unit</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[5rem]">Tier</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[8rem]">Avg. Place</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[10rem]">Win Rate</HeaderCell>
        <HeaderCell width="flex items-center justify-end w-[10rem] pr-2">Frequency</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[17rem]">Popular Items</HeaderCell>
      </div>

      {/* Champion Rows */}
      <div className="w-full">
        {championStats && championStats.length > 0 ? (
          <ChampionList
            champions={championStats}
            championItemStats={championItemStats}
            totalGames={totalGames}
            normalizedRankBIS={normalizedRankBIS}
          />
        ) : (
          // Render skeleton
          <ChampionListSkeleton />
        )}
      </div>
    </div>
  );
};
