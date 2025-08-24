import { Star } from "../../../utils/Star";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { ChampionImageProps } from "./types";

export const ChampionImage = ({
  champion,
  cost,
  starLevel,
  trait1,
  trait2,
  trait3,
}: ChampionImageProps) => {
  const { set } = useTFTSetContext();
  return (
    <div className="relative w-44">
      {/* Champion Image */}
      <div
        className={`relative border rounded-t-md ${
          cost === 1
            ? "border-gray-400"
            : cost === 2
            ? "border-green-500"
            : cost === 3
            ? "border-blue-500"
            : cost === 4
            ? "border-purple-700"
            : cost === 5
            ? "border-yellow-500"
            : cost === 6
            ? "border-orange-500"
            : "border-red-500"
        }`}
      >
        <img
          src={`../assets/${set}/champions/splash/${champion}.png`}
          alt={champion}
          className="rounded-t-md w-full h-24 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-24 rounded-t-md bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

        {/* Star Level */}
        <div className="absolute top-2 left-2 flex space-x-1">
          {Array.from({ length: starLevel || 0 }).map((_, index) => (
            <Star
              key={index}
              textColor={starLevel && starLevel >= 3 ? "#FFFF00" : "#B0B0B0"}
              fillColor={starLevel && starLevel >= 3 ? "#FFFF00" : "#B0B0B0"}
              className="w-3.5 h-3.5 drop-shadow-[0_0_2px_gray]"
            />
          ))}
        </div>

        {/* Traits */}
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
          {[trait1, trait2, trait3].map(
            (trait) =>
              trait && (
                <div key={trait} className="flex items-center gap-1 mb-1">
                  <img
                    src={`../assets/${set}/traits/${trait}.png`}
                    className="h-4 w-4"
                    alt={trait}
                  />
                  <p className="text-white text-[0.7rem] text-outline">{trait}</p>
                </div>
              )
          )}
        </div>
      </div>

      {/* Cost */}
      <div
        className={`absolute top-[5.2rem] right-0 rounded-tl-md px-1.5 text-white font-bold flex items-center gap-1 bg-gradient-to-r ${
          cost === 1
            ? "from-gray-600 to-gray-400"
            : cost === 2
            ? "from-green-700 to-green-500"
            : cost === 3
            ? "from-blue-700 to-blue-500"
            : cost === 4
            ? "from-purple-900 to-purple-400"
            : cost === 5
            ? "from-yellow-600 to-yellow-400"
            : "from-red-700 to-red-500"
        }`}
      >
        <img src="../assets/icons/coin.png" className="h-2 w-2" />
        <p className="text-xs text-outline">{cost || 1}</p>
      </div>
    </div>
  );
};
