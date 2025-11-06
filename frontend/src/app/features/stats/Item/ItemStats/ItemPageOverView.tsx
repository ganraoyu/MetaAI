import { useParams } from "react-router-dom";
import { useItemContext } from "../../contexts/ItemContext";
import { itemMap } from "../../../../data/SET15/itemData/_ItemMapping";

export const ItemPageOverView = () => {
  const { itemName } = useParams();
  const { totalGames } = useItemContext();

  const displayName = itemMap[itemName || ""].name

  return (
    <div className="flex flex-row items-center justify-between w-full pt-6 pb-4">

      {/* Title and Description */}
      <div>
        {/* Title */}
        <div className="text-[1.5rem] font-bold mb-2">
          <p>{displayName} TFT Item Stats</p>
        </div>

        {/* Description */}
        <div className="text-[0.8rem] max-w-[60rem]">
          <p>Stats on the how {displayName} performs in the current TFT Meta.</p>
          <p>Find performance by stage and the best units to put {displayName} on.</p>
        </div>
      </div>

      {/* Total matches aggregated tracker */}
      <div className="flex flex-col items-center justify-center bg-[#171717] w-[15rem] h-[4rem] text-[0.7rem] rounded-lg">
        <div className="flex flex-row justify-between w-full px-4">
          <p>Matches Analyzed:</p>
          <p>{totalGames * 13.5} </p>
        </div>
        <div className="flex flex-row justify-between w-full px-4 pt-2">
          <p>Last updated:</p>
          <p>16 minutes ago</p>
        </div>
      </div>
    </div>
  )
}

