import { ChampionCard } from "./ChampionCard";
import { champions } from "./testData";

export const ChampionList = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div className="w-full">
        {champions.map((champion, index) => (
          <div key={index}>
            <ChampionCard {...champion} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
