import { useItemDataContext } from "../ItemDataContext";
import { HeaderCellProps } from "../types";
import { ItemListSkeleton } from "./ItemSkeleton";
import { ItemList } from "./ItemList";
import { basicItems } from "../../../../data/SET15/itemData/basicItems";
import { combinedItems } from "../../../../data/SET15/itemData/combinedItems";
import { radiantItems } from "../../../../data/SET15/itemData/radiantItems";
import { artifactItems } from "../../../../data/SET15/itemData/artifactItems";
import { emblemItems } from "../../../../data/SET15/itemData/emblemItems";

const HeaderCell = ({ children, width, isFirst = false }: HeaderCellProps) => (
  <div
    className={`h-[2rem] ${width} border-t border-b border-r border-[#363636] font-medium ${
      isFirst ? "border-l pl-1 justify-start" : ""
    }`}
  >
    {children}
  </div>
);

const itemTypeMapping: any = {
  Basic: basicItems, 
  Combined: combinedItems,
  Radiant: radiantItems,
  Artifact: artifactItems,
  Emblem: emblemItems,
};

export const ItemListContainer = () => {
  const { totalGames, itemStats, searchValue, itemType } = useItemDataContext();

  const normalizedItems = (itemStats || []).map((item: any) => item.itemStats ?? item);
  const searchFilteredItems = normalizedItems.filter((item: any) =>
    String(item?.itemId ?? "")
      .toLowerCase()
      .includes((searchValue || "").toLowerCase())
  );

  const itemTypeFilteredItems = itemType.flatMap((type) => {
    return searchFilteredItems.filter((item) => {
      return itemTypeMapping[type][item.itemId];
    });
  });

  const rankedItems = itemTypeFilteredItems.sort((a, b) => a.averagePlacement - b.averagePlacement);

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
        {rankedItems.length > 0 ? (
          <ItemList itemsStats={rankedItems} totalGames={totalGames} />
        ) : (
          <ItemListSkeleton />
        )}
      </div>
    </div>
  );
};
