import { useHexBoardContext } from "../HexBoard/HexBoardContext";
import { TraitsCard } from "./TraitsCard";

export const TraitsContainer = () => {
  const { orderedPlayerTraits, orderedOpponentTraits } = useHexBoardContext();

  return (
    <div>
      <div className='w-1/4 text-white'>

        <div className='bg-hexCellComponents rounded-2xl w-56 h-60 mb-5'>
          {orderedOpponentTraits.map(([trait, count]) => (
            <TraitsCard 
              trait={trait}
              count={count}
            />
          ))}
        </div>

        <div className='bg-hexCellComponents rounded-2xl mb-3 w-56 h-60'>
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


