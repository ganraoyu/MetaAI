interface ChampionImageProps {
  set: string;
  champion: string;
  traits: [string, string, string];
  cost: number;
  borderColor: string;
}

export const ChampionImage = ({set, champion, traits, cost, borderColor}: ChampionImageProps) => {
  return (
    <div>
    {/* Image with gradient overlay and traits */}
      <div className={`relative border-2 rounded-t-md overflow-hidden ${borderColor}`}>
        <img
          src={`../assets/${set}/champions/splash/${champion}.png`}
          alt={champion}
          className="w-full h-[9rem] object-cover rounded-t-md"
        />
        {/* Left-to-right gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-[9rem] bg-gradient-to-r from-black/60 to-transparent rounded-t-md pointer-events-none" />

        {/* Traits */}
        <div className="absolute bottom-[0.25rem] left-[0.25rem] flex flex-col gap-[0.125rem] p-[0.5rem]">
          {traits.map(
            (trait, i) =>
              trait && (
                <div key={i} className="flex items-center gap-[0.25rem]">
                  <img src={`../assets/${set}/traits/${trait}.png`} className="h-[1rem] w-[1rem]" alt={trait} />
                  <p className="text-white text-[0.8rem] text-outline">{trait}</p>
                </div>
              )
          )}
        </div>
      </div>

      {/* Cost Badge */}
      <div className={`absolute top-[8.1rem] right-[0.125rem] rounded-tl-md px-[0.375rem] font-bold flex items-center gap-[0.25rem] text-white text-xs bg-gradient-to-r ${
        cost === 1 ? "from-gray-600 to-gray-400" :
        cost === 2 ? "from-green-700 to-green-500" :
        cost === 3 ? "from-blue-700 to-blue-500" :
        cost === 4 ? "from-purple-900 to-purple-400" :
        cost === 5 ? "from-yellow-600 to-yellow-400" :
        "from-red-700 to-red-500"
      }`}>
        <img src="../assets/icons/coin.png" className="h-[0.5rem] w-[0.5rem]" />
        <p className="text-outline">{cost || 1}</p>
      </div>
    </div>
  )
}

