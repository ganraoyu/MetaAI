// ChampionList.tsx
import { ChampionCard } from "./ChampionCard";
import { getTier } from "../../utilities/tierLetter";
import { useChampionDataContext } from "../ChampionDataContext";

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
  const { searchValue } = useChampionDataContext();

  const filteredChampions =
    champions?.filter((champion) =>
      champion.championId.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];

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
