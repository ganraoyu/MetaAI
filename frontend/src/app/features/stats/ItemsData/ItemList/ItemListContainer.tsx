import { getTier } from "../../utilities/tierLetter";
import { ItemCard } from "./ItemCard";
import { useItemDataContext } from "../ItemDataContext";
import { HeaderCellProps } from "../types";
import { ItemListSkeleton } from "./ItemSkeleton";

const HeaderCell = ({ children, width, isFirst = false }: HeaderCellProps) => (
  <div
    className={`h-[2rem] ${width} border-t border-b border-r border-[#363636] font-medium ${
      isFirst ? "border-l pl-1 justify-start" : ""
    }`}
  >
    {children}
  </div>
);

export const ItemListContainer = () => {
  const { totalGames, itemStats, searchValue, rank} =
    useItemDataContext();

  const normalizedRankBIS =
    rank.length === 1
      ? String(rank[0]) !== "all"
        ? `${String(rank[0]).toLowerCase()}BIS`
        : "BIS"
      : "rankBISTotal";

  const normalizedItems = (itemStats || []).map((item: any) => item.itemStats ?? item);
  const filteredItems = normalizedItems.filter((item: any) =>
    String(item?.itemId ?? "").toLowerCase().includes((searchValue || "").toLowerCase())
  );

  console.log(filteredItems[0])

  return (
    <div className="flex flex-col justify-center items-center w-full mt-[-0.4rem]">
      {/* Header */}
      <div className="flex flex-row items-center justify-center text-[0.9rem]">
        <HeaderCell width="flex items-center justify-center w-[5rem]" isFirst>
          Rank
        </HeaderCell>
        <HeaderCell width="flex items-center justify-start w-[20rem] pl-2">Item</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[5rem]">Tier</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[8rem]">Avg. Place</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[10rem]">Win Rate</HeaderCell>
        <HeaderCell width="flex items-center justify-end w-[10rem] pr-2">Frequency</HeaderCell>
        <HeaderCell width="flex items-center justify-center w-[17rem]">Popular With</HeaderCell>
      </div>

      {/* Item Rows */}
      <div className="w-full">
        {itemStats && itemStats.length > 0 ? (
          filteredItems.map((item: any, index: number) => {
            const itemId = item.itemId ?? "";
            const winRate = item.winrate ?? 0;
            const tier = item.tier ?? getTier(item.averagePlacement ?? 0);
            const averagePlacement = item.averagePlacement ?? 0;
            const total = item.totalGames ?? 0;
            const ranks = item.ranks ?? {};

            return (
              <ItemCard
                key={itemId || index}
                item={itemId}
                winRate={winRate}
                tier={tier}
                index={index}
                averagePlacement={averagePlacement}
                totalGames={total}
                frequency={totalGames ? (total / totalGames) * 100 : 0}
                popularItems={ranks?.[normalizedRankBIS] || []}
              />
            );
          })
        ) : (
          <ItemListSkeleton />
        )}
      </div>
    </div>
  );
};