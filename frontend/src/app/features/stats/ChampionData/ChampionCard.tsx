import { useTFTSetContext } from "../../../utilities/TFTSetContext";
import { ChampionCardProps } from "./types";

export const ChampionCard = ({
  champion,
  tier,
  averagePlacement,
  winRate,
  frequency,
  popularItems,
}: ChampionCardProps) => {
  const { set } = useTFTSetContext();

  return (
    <div className="flex flex-row items-center">
      {/* Champion Image */}
      <div className="flex flex-row items-center w-[20rem] border border-[#5e5e5e] h-[2.8rem]">
        <img
          src={`../assets/${set}/champions/centered/${champion}.png`}
          alt={champion}
          className="w-6 h-6 m-1"
        />
        <p>{champion}</p>
      </div>

      {/* Tier */}
      <div className="w-[5rem] border border-[#5e5e5e] h-[2.8rem] flex items-center justify-center">
        {tier}
      </div>

      {/* Average Placement */}
      <div className="w-[5rem] border border-[#5e5e5e] h-[2.8rem] flex items-center justify-center">
        {averagePlacement}
      </div>

      {/* Win rate */}
      <div className="w-[10rem] border border-[#5e5e5e] h-[2.8rem] flex items-center justify-center">
        {winRate}
      </div>

      {/* Frequency */}
      <div className="w-[10rem] border border-[#5e5e5e] h-[2.8rem] flex items-center justify-center">
        {frequency}
      </div>

      {/* Popular Items */}
      <div className="flex flex-row items-center w-[17rem] border border-[#5e5e5e] h-[2.8rem]">
        {popularItems.map((item, index) => (
          <img
            key={index}
            src={`./assets/${set}/items/${item}.png`}
            alt={item}
            className="w-6 h-6 m-1"
          />
        ))}
      </div>
    </div>
  );
};
