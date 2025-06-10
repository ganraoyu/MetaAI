interface ChampionHoverInfoProps {
  champion: string;
}

export const ChampionHoverInfo = ({
  champion,

}: ChampionHoverInfoProps) => {
  return (
    <div className='absolute z-100'>
        {champion}    
    </div>
  )
}
