import { BackButton } from "./components/BackButton";
import { ItemInfo } from "./components/ItemInfo";
import { BestItemHolders } from "./components/BestItemHolders";
import { BestItemPairing } from "./components/BestItemPairing";

export const ItemStats = () => {
  return (
    <div className="w-[75rem] h-[70rem] text-[#cfcfcf]">
      <BackButton />

      <div className="flex flex-col rounded-md bg-[#171717] w-[75rem] px-3 py-2">
        <p className="text-[1.25rem] font-semibold mb-2 text-[#e6e6e6]">ItemName</p>

        <div className="grid grid-cols-[0.7fr_2fr] gap-3 py-1 -mt-2 max-h-[17rem] overflow-hidden">
          <ItemInfo />
          <div className="flex flex-row gap-2">
            <BestItemHolders />
            <BestItemPairing />
          </div>
        </div>
      </div>
    </div>
  );
};
