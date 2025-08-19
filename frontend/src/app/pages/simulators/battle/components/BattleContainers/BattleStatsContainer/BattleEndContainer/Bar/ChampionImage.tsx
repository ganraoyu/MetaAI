import { useTFTSetContext } from "../../../../../../../../utilities/TFTSetContext";
import { ChampionProps } from "./types";
import { Star } from "../../../../../utils/Star";

export const ChampionImage = ({ champion }: ChampionProps): JSX.Element => {
  const { set } = useTFTSetContext();

  return (
    <div className="relative inline-block">
      {/* Champion image */}
        <img
          src={`../assets/${set}/champions/centered/${champion.name}.png`}
          className="w-10 h-10"
          alt={champion.name}
        />

      {/* Stars positioned above the image */}
      <div className="absolute top-[1.7rem] left-1/2 -translate-x-1/2 flex flex-row">
        {Array.from({ length: champion.starLevel }).map((_, index) => (
          <Star
            key={index}
            textColor={champion.starLevel >= 3 ? "#FFFF00" : "#B0B0B0"}
            fillColor={champion.starLevel >= 3 ? "#FFFF00" : "#B0B0B0"}
            className="w-[0.8rem] h-[0.8rem] drop-shadow-[0_0_2px_gray]"
          />
        ))}
      </div>
    </div>
  );
};
