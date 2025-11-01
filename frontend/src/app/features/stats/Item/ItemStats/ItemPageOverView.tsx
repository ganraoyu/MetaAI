import { useItemDataContext } from "../ItemContext";

export const ItemPageOverView = () => {
  const { totalGames } = useItemDataContext();

  return (
    <div className="flex flex-row items-center justify-between w-full pt-6 pb-4">

      {/* Title and Description */}
      <div>
        {/* Title */}
        <div className="text-[1.5rem] font-bold mb-2">
          <p>{"Mittens"} TFT Item Stats</p>
        </div>

        {/* Description */}
        <div className="text-[0.8rem] max-w-full">
          <p>Stats on the how {"Mittens"} performs in the current TFT Meta. Find performance by stage and the best units to put {"name"} on.</p>
        </div>
      </div>

      {/* Total matches aggregated tracker */}
      <div className="flex flex-col items-center justify-center bg-[#171717] w-[15rem] h-[4rem] text-[0.7rem] rounded-lg">
        <div className="flex flex-row justify-between w-full px-4">
          <p>Matches Analyzed:</p>
          <p>{Math.floor(totalGames * 13.5)} </p>
        </div>
        <div className="flex flex-row justify-between w-full px-4 pt-2">
          <p>Last updated:</p>
          <p>16 minutes ago</p>
        </div>
      </div>
    </div>
  )
}

