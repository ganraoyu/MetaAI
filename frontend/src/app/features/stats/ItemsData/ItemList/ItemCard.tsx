import { getAveragePlaceColors } from "../../utilities/averagePlaceColors";
import { getTierBackgroundColors } from "../../utilities/tierColors";
import { ItemCardProps, ItemCellProps } from "../types";
import { getRankColor } from "../../utilities/rankFontColors";
import { itemMap } from "../../../simulators/battle/utilities/ItemMapping";
import { useItemDataContext } from "../ItemDataContext";
import { LoadingBar } from "./LoadingBar";
import "./_ItemList.css";

const ItemCell = ({ children, width, index }: ItemCellProps) => (
  <div
    className={`h-[2.4rem] flex items-center ${width} ${
      index % 2 === 1 ? "bg-[#141212]" : "bg-[#1e1d1d]"
    }`}
  >
    {children}
  </div>
);

export const ItemCard = ({
  item,
  tier,
  averagePlacement,
  winRate,
  totalGames,
  frequency,
  popularItems = [],
  index,
}: ItemCardProps): JSX.Element => {
  const { itemLoading } = useItemDataContext();
  const isLoading = !!itemLoading;

  const itemKey = String(item ?? "").toUpperCase();
  const itemImage = itemMap[itemKey]?.image;

  return (
    <div className="flex flex-row items-center justify-center hover:bg-[#0a0a0a] hover:cursor-pointer group">
      {/* Rank */}
      <ItemCell
        width="w-[5rem] justify-center border-l border-r border-[#363636] text-[0.9rem] text-[#bcbcbc] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        <p className={`font-medium ${getRankColor(index)}`}>{index + 1}</p>
      </ItemCell>

      {/* Item Image & Name */}
      <ItemCell
        width="w-[20rem] border-r border-[#363636] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="flex gap-2 items-center m-1">
            <LoadingBar width="w-32" height="h-[1.5rem]" className="rounded" />
          </div>
        ) : (
          <>
            {itemImage && (
              <img src={itemImage} alt={itemKey} className="w-8 h-8 m-1" />
            )}
            <p className="text-[#bcbcbc] text-[0.9rem]">{itemKey}</p>
          </>
        )}
      </ItemCell>

      {/* Tier */}
      <ItemCell
        width="w-[5rem] justify-center border-r border-[#363636] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-[1.7rem]" height="h-[1.5rem]" className="rounded-sm" />
          </div>
        ) : (
          <div
            className={`w-[1.7rem] h-[1.7rem] text-black flex items-center justify-center text-[0.9rem] font-bold rounded-sm ${getTierBackgroundColors(
              tier
            )}`}
          >
            {tier}
          </div>
        )}
      </ItemCell>

      {/* Average Placement */}
      <ItemCell
        width={`w-[8rem] justify-center border-r border-[#363636] text-[0.9rem] ${getAveragePlaceColors(
          averagePlacement
        )} group-hover:bg-[#2a2a2a]`}
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-16" height="h-[1.5rem]" className="rounded" />
          </div>
        ) : (
          averagePlacement
        )}
      </ItemCell>

      {/* Win Rate */}
      <ItemCell
        width="w-[10rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-[6rem]" height="h-[1.7rem]" className="rounded" />
          </div>
        ) : (
          `${winRate}%`
        )}
      </ItemCell>

      {/* Frequency */}
      <ItemCell
        width="w-[10rem] justify-end border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1 ml-auto">
            <LoadingBar width="w-[6rem]" height="h-[1.7rem]" className="rounded" />
          </div>
        ) : (
          <div className="flex items-baseline gap-1 mr-2">
            <p>{totalGames}</p>
            <p className="text-[0.6rem] text-[#bcbcbc]">{frequency?.toFixed(2)}%</p>
          </div>
        )}
      </ItemCell>

      {/* Popular With */}
      <ItemCell
        width="w-[17rem] justify-center border-r border-[#363636] text-[0.9rem] group-hover:bg-[#2a2a2a]"
        index={index}
      >
        {isLoading ? (
          <div className="p-1">
            <LoadingBar width="w-[10rem]" height="h-[1.7rem]" />
          </div>
        ) : (
          (popularItems || []).map((p: any, i: number) => (
            <img
              key={i}
              src={itemMap[String(p.itemId ?? "").toUpperCase()]?.image}
              className="w-6 h-6 m-1"
              alt={p.itemId}
            />
          ))
        )}
      </ItemCell>
    </div>
  );
};
// ...existing code...