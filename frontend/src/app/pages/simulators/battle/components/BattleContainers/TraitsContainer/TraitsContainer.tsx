import { useHexBoardContext } from "../HexBoard/HexBoardContext";
import { TraitsCard } from "./TraitsCard";

export const TraitsContainer = () => {
  const { orderedPlayerTraits, opponentTraitsObj } = useHexBoardContext();

  return (
    <div>
      <div className='w-1/4 text-white'>
        <p className="font-semibold">
          Traits
        </p>

        <div className='bg-hexCellComponents rounded-2xl w-56 h-56 mb-6'>
          {Object.entries(opponentTraitsObj).map(([trait, count]) => (
            <TraitsCard 
              trait={trait}
              count={count}
            />
          ))}
        </div>

        <div className='bg-hexCellComponents rounded-2xl mb-2 w-56 h-56'>
          {orderedPlayerTraits.map(([trait, count]) => (
            <TraitsCard 
              trait={trait}
              count={count}
            />
          ))}
        </div>
        
      </div>

    </div>
  )
}


