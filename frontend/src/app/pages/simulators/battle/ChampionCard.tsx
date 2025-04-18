interface ChampionCardProps {
  champion: string;
  currentHp: number;
  maxHp: number;
}

export const ChampionCard = ({champion, currentHp, maxHp}: ChampionCardProps) => {
  const hpPercentage = (currentHp / maxHp) * 100;
  const hpColor = hpPercentage > 60 ? 'bg-green-500' : 
          hpPercentage > 30 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="flex flex-col items-center rounded-md">
      <div className="relative">
        <img 
          src={`../assets/SET14/champions/${champion}.png`} 
          alt={champion}
          className="w-10 h-10 rounded-full border-2 border-gray-600"
        />
        <div className="absolute bottom-0 w-full px-1">
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${hpColor} transition-all duration-300`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="text-[0.7rem] text-white mt-1 font-semibold">
        {currentHp}/{maxHp}
      </div>
    </div>
  );
};