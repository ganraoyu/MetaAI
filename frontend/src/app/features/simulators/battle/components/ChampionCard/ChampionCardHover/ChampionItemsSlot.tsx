import { combinedItems } from "../../../data/items/item-data";
import { useChampionCardHoverContext } from "./ChampionCardHoverContext";
import { ItemHover } from "./SlotHover/ItemSlotHover";
import { ChampionItemSlotProps } from "./types";

type ItemSlotProps = {
  item: string | null;
  isHover: boolean;
  setHover: (value: boolean) => void;
};

const ItemSlot = ({ item, isHover, setHover }: ItemSlotProps) => {
  const itemData = combinedItems.find((i) => i.name === item);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {item ? (
        <img src={itemData?.image} alt={item} className="h-8 w-8 border-2 border-gray-700" />
      ) : (
        <div className="border-2 h-8 w-8 border-gray-700" />
      )}

      {isHover && item && itemData && (
        <div className="absolute left-10 top-0 z-50">
          <ItemHover {...itemData} />
        </div>
      )}
    </div>
  );
};

export const ChampionItemsSlot = ({ item1, item2, item3 }: ChampionItemSlotProps) => {
  const { item1Hover, item2Hover, item3Hover, setItem1Hover, setItem2Hover, setItem3Hover } =
    useChampionCardHoverContext();

  return (
    <div className="flex flex-row gap-2">
      <ItemSlot item={item1 || ""} isHover={item1Hover} setHover={setItem1Hover} />
      <ItemSlot item={item2 || ""} isHover={item2Hover} setHover={setItem2Hover} />
      <ItemSlot item={item3 || ""} isHover={item3Hover} setHover={setItem3Hover} />
    </div>
  );
};
