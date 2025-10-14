import { useItemDataContext } from "../ItemDataContext";
import { HeaderCellProps } from "../types";
import { ItemListSkeleton } from "./ItemSkeleton";
import { ChampionList } from "./ItemList";

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
  const { totalGames, itemStats, championStats, searchValue, rank } = useItemDataContext();

  const normalizedItems = (itemStats || []).map((item: any) => item.itemStats ?? item);
  const filteredItems = normalizedItems.filter((item: any) =>
    String(item?.itemId ?? "")
      .toLowerCase()
      .includes((searchValue || "").toLowerCase())
  );

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
        {filteredItems.length > 0 ? (
          <ChampionList
            itemsStats={itemStats}
            championStats={championStats}
            totalGames={totalGames}
          />
        ) : ( 
          <ItemListSkeleton />
        )}
      </div>
    </div>
  );
};
