import { Star } from "../../../utils/Star";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { ChampionImageProps } from "./types";
import { getBorderColor, getCostGradient } from "./utils";

/**
 * ChampionImage component renders a champion card with its splash image, star level, traits, and cost.
 *
 * @param {string} champion - The name of the champion.
 * @param {number} cost - The cost of the champion (1-6). Used for border and gradient styling.
 * @param {number} starLevel - The star level of the champion (1-3).
 * @param {string} trait1 - The first trait of the champion.
 * @param {string} trait2 - The second trait of the champion.
 * @param {string} trait3 - The third trait of the champion.
 *
 * @returns {JSX.Element} The rendered champion card.
*/
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
      <div className={`relative border rounded-t-md ${getBorderColor(cost)}`}>
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
                  <p className="text-white text-[0.7rem] text-outline">
                    {trait}
                  </p>
                </div>
              )
          )}
        </div>
      </div>

      {/* Cost */}
      <div
        className={`absolute top-[5.2rem] right-0 rounded-tl-md px-1.5 text-white font-bold flex items-center gap-1 bg-gradient-to-r ${getCostGradient(
          cost
        )} border-b border-r`}
      >
        <img src="../assets/icons/coin.png" className="h-2 w-2" />
        <p className="text-xs text-outline">{cost || 1}</p>
      </div>
    </div>
  );
};
