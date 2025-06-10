import { useTFTSetContext } from "../../../../../utilities/TFTSetContext"

interface ChampionHoverInfoProps {
  champion: string;
}

export const ChampionHoverInfo = ({
  champion,

}: ChampionHoverInfoProps) => {
  const { set } = useTFTSetContext();

  return (
    <div className='absolute z-100 bg-gray-800 text-white rounded-md w-44 h-78 z-50 origin-top animate-grow-in shadow-2xl shadow-gray-900'>
      <img 
        src={`../assets/${set}/champions/splash/${champion}.png`} 
        alt={champion}
        className="rounded-t-md w-full h-24 object-cover"
      />
    </div>
  )
}
