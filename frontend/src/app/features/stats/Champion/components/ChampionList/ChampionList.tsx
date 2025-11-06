// ChampionList.tsx
import { ChampionCard } from "./ChampionCard";
import { getTier } from "../../../utilities/tierLetter";
import { useChampionContext } from "../../../contexts/ChampionContext";

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
  const { searchValue } = useChampionContext();
  const filteredChampions =
    champions?.filter((champion) => {
      const id = champion.championId.toLowerCase();
      const search = searchValue.toLowerCase();

      return id.includes(search) && !id.startsWith("7");
    }) || [];
    
  return (
    <div className="w-full">
      {(filteredChampions ?? []).map((champion, index) => (
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
