import { ChampionCard } from "./ChampionCard";

export const ChampionList = () => {
  return (
    <div className="flex justify-center w-full">
      <ChampionCard
        champion="Darius"
        tier="S"
        averagePlacement={1.5}
        winRate={55}
        frequency={20}
        popularItems={["item1", "item2", "item3"]}
      />
    </div>
  );
};