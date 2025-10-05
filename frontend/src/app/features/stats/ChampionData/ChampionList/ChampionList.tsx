// ChampionList.tsx
import { ChampionCard } from "./ChampionCard";
import { getTier } from "../../utilities/tierLetter";

interface ChampionListProps {
  champions: any[];
  championItemStats: any[];
  totalGames: number;
  normalizedRankBIS: string;
}

export const ChampionList = ({
  champions,
  championItemStats,
  totalGames,
  normalizedRankBIS,
}: ChampionListProps) => {
  return (
    <div className="w-full">
      {(champions ?? []).map((champion, index) => (
        <ChampionCard
          key={champion.championId}
          champion={champion.championId}
          winRate={champion.winrate}
          index={index}
          cost={champion.cost || 1}
          tier={getTier(champion.averagePlacement)}
          averagePlacement={champion.averagePlacement}
          totalGames={champion.totalGames}
          frequency={champion.totalGames / totalGames}
          popularItems={
            championItemStats.find((item) => item.championId === champion.championId)?.[
              normalizedRankBIS
            ] || []
          }
        />
      ))}
    </div>
  );
};
