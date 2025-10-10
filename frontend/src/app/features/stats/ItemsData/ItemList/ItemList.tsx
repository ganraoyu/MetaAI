import { ItemCard } from "./ItemCard";
import { getTier } from "../../utilities/tierLetter";

interface ChampionListProps {
  itemsStats: any[];
  championStats: any[];
  totalGames: number;
  normalizedRankBIS: string;
}

export const ChampionList = ({
  itemsStats,
  championStats,
  totalGames,
  normalizedRankBIS,
}: ChampionListProps) => {
  return (
    <div className="w-full">
      {(itemsStats ?? []).map((item, index) => (
        <ItemCard
          key={item.championId}
          item={item.championId}
          winRate={item.winrate}
          index={index}
          tier={getTier(item.averagePlacement)}
          averagePlacement={item.averagePlacement}
          totalGames={item.totalGames}
          frequency={item.totalGames / totalGames}
          popularItems={
            championStats.find((item) => item.championId === item.championId)?.[
              normalizedRankBIS
            ] || []
          }
        />
      ))}
    </div>
  );
};
