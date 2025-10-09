// ChampionList.tsx
import { ItemCard } from "./ItemCard";
import { getTier } from "../../utilities/tierLetter";

interface ChampionListProps {
  items: any[];
  championStats: any[];
  totalGames: number;
  normalizedRankBIS: string;
}

export const ChampionList = ({
  items,
  championStats,
  totalGames,
  normalizedRankBIS,
}: ChampionListProps) => {
  return (
    <div className="w-full">
      {(items ?? []).map((item, index) => (
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
