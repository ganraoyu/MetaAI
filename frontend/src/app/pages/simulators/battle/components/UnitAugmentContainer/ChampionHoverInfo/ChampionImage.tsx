interface ChampionImageProps {
  set: string;
  champion: string;
  type: string;
  traits: [string, string, string];
  cost: number;
  borderColor: string;
}

function getTypeTextColor(type: string): string {
  switch (type.toLowerCase()) {
    case "attack tank":
      return "text-red-700";
    case "attack fighter":
      return "text-orange-700";
    case "attack caster":
      return "text-amber-700";
    case "attack carry":
      return "text-yellow-600";
    case "attack reaper":
      return "text-rose-700";

    case "magic tank":
      return "text-blue-700";
    case "magic reaper":
      return "text-purple-700";
    case "magic carry":
      return "text-pink-700";
    case "magic caster":
      return "text-indigo-700";

    default:
      return "text-gray-300";
  }
}

function getCostGradientBg(cost: number): string {
  switch (cost) {
    case 1:
      return "from-gray-600 to-gray-400";
    case 2:
      return "from-green-700 to-green-500";
    case 3:
      return "from-blue-700 to-blue-500";
    case 4:
      return "from-purple-900 to-purple-400";
    case 5:
      return "from-yellow-600 to-yellow-400";
    default:
      return "from-red-700 to-red-500";
  }
}

export const ChampionImage = ({
  set,
  champion,
  type,
  traits,
  cost,
  borderColor,
}: ChampionImageProps) => {
  return (
    <div>

      {/* Image with gradient overlay and traits */}
      <div
        className={`relative border-2 rounded-t-md overflow-hidden ${borderColor}`}
      >
        <img
          src={`../assets/${set}/champions/splash/${champion}.png`}
          alt={champion}
          className="w-full h-[9rem] object-cover rounded-t-md"
        />
        {/* Left-to-right gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 to-transparent rounded-t-md pointer-events-none" />

        {/* Name and Class*/}
        <div className="absolute top-[0.25rem] left-[0.25rem] gap-[0.125rem] p-[0.5rem]">
          <p className="text-base font-bold">{champion}</p>
          <p className={`text-xs font-medium ${getTypeTextColor(type)}`}>
            {type}
          </p>
        </div>

        {/* Traits */}
        <div className="absolute bottom-[0.25rem] left-[0.25rem] flex flex-col gap-[0.125rem] p-[0.2rem]">
          {traits.map(
            (trait, i) =>
              trait && (
                <div key={i} className="flex items-center gap-[0.25rem]">
                  <img
                    src={`../assets/${set}/traits/${trait}.png`}
                    className="h-[1rem] w-[1rem]"
                    alt={trait}
                  />
                  <p className="text-white text-[0.8rem] text-outline">
                    {trait}
                  </p>
                </div>
              )
          )}
        </div>
      </div>

      {/* Cost Badge */}
      <div
        className={`absolute top-[8.2rem] right-[0.125rem] rounded-tl-md px-[0.375rem] font-bold flex items-center gap-[0.25rem] text-white text-xs bg-gradient-to-r ${getCostGradientBg(
          cost
        )}`}
      >
        <img src="../assets/icons/coin.png" className="h-[0.5rem] w-[0.5rem]" />
        <p className="text-outline">{cost || 1}</p>
      </div>

    </div>
  );
};
