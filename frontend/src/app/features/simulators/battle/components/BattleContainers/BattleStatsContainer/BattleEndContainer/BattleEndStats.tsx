import { useEffect } from "react";
import { useBattleContext } from "../../../../BattleContext";
import { ChampionStatsCard } from "./Bar/_ChampionStatsCard";

export const BattleEndStats = () => {
  const { fetchBattleStats, battleEndStats, battleHistory } = useBattleContext();

  useEffect(() => {
    if (battleHistory) {
      fetchBattleStats();
    }
  }, [battleHistory]);

  // Sort opponent champion blocks and their champions by damage descending
  const filteredOpponentStatistics = battleEndStats
    ? battleEndStats.opponentChampionStatistics.map((block) => ({
        ...block,
        opponentStatistics: block.opponentStatistics
          .slice()
          .sort((a, b) => b.allChampionDamage - a.allChampionDamage),
      }))
    : [];

  // Sort player champion blocks and their champions by damage descending
  const filteredPlayerStatistics = battleEndStats
    ? battleEndStats.playerChampionStatistics.map((block) => ({
        ...block,
        playerStatistics: block.playerStatistics
          .slice()
          .sort((a, b) => b.allChampionDamage - a.allChampionDamage),
      }))
    : [];

  return (
    <div className="text-white">
      {/* Opponent champions */}
      <div className="bg-hexCellComponents rounded-2xl w-full h-[16.7rem] mb-5 p-4 overflow-auto">
        {filteredOpponentStatistics.length > 0
          ? filteredOpponentStatistics.map((block, i) => (
              <div key={i}>
                {block.opponentStatistics.map((champion, j) => (
                  <ChampionStatsCard key={j} champion={champion} />
                ))}
              </div>
            ))
          : "Loading..."}
      </div>

      {/* Player champions */}
      <div className="bg-hexCellComponents rounded-2xl w-full h-[16.7rem] mb-5 p-4 overflow-auto">
        {filteredPlayerStatistics.length > 0
          ? filteredPlayerStatistics.map((block, i) => (
              <div key={i}>
                {block.playerStatistics.map((champion, j) => (
                  <ChampionStatsCard key={j} champion={champion} />
                ))}
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};
