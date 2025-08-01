import { useHexBoardContext } from "./HexBoard/HexBoardContext"

export const TraitsContainer = () => {
  const { playerTraitsArray, opponentTraitsArray } = useHexBoardContext();

  return (
    <div>
      <div className='w-1/4 text-white'>
        <p className="font-semibold">
          Traits
        </p>

        <div className='bg-hexCellComponents rounded-2xl w-56 h-56 mb-6'>
          {playerTraitsArray.map((trait, index) => (
            <div key={index} className='text-sm'>
              {trait}
            </div>
          ))}
        </div>

        <div className='bg-hexCellComponents rounded-2xl mb-2 w-56 h-56'>
          {opponentTraitsArray.map((trait, index) => (
            <div key={index} className='text-sm'>
              {trait}
            </div>
          ))}
        </div>
        
      </div>

    </div>
  )
}


