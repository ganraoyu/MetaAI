interface ChampionCardProps {
    champion: string;
    currentHp: number;
    maxHp: number;
}

export const ChampionCard = ({champion, currentHp, maxHp}: ChampionCardProps) => {
    const hpPercentage = (currentHp / maxHp) * 100;

  return (
    <div className="flex flex-col">
        <img src={`../assets/SET12/${champion}.png`} className='w-6 h-6'/>
        <div className="w-6 bg-gray-200 h-1 mt-[-2]">
          <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${hpPercentage}%` }}
          />
        </div>
    </div>
  )
}