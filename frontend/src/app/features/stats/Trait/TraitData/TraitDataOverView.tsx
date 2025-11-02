import { useTraitContext } from "../../contexts/TraitContext";

export const TraitDataOverView = () => {
  const { totalGames } = useTraitContext();

  return (
    <div className="flex flex-row items-center justify-between w-full pt-6 pb-4">

      {/* Title and Description */}
      <div>
        {/* Title */}
        <div className="text-2xl font-bold mb-2">
          <p>TFT Trait Tier List</p>
        </div>

        {/* Description */}
        <div className="text-[0.8rem] max-w-full">
          <p>Stats on the best tft traits to play in set 15. Click on a champion for more details.</p>
        </div>
      </div>

      {/* Total matches aggregated tracker */}
      <div className="flex flex-col items-center justify-center bg-[#1f1e1e] w-[15rem] h-[4rem] text-[0.7rem] rounded-lg">
        <div className="flex flex-row justify-between w-full px-4">
          <p>Matches Analyzed:</p>
          <p>{Math.floor(totalGames)} </p>
        </div>
        <div className="flex flex-row justify-between w-full px-4 pt-2">
          <p>Last updated:</p>
          <p>16 minutes ago</p>
        </div>
      </div>
        
    </div>
  )
}

