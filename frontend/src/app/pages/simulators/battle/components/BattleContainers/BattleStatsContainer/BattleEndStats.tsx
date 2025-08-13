import { useEffect } from "react";
import { useBattleContext } from "../../../BattleContext";

export const BattleEndStats = () => {
  const {
    fetchBattleStats,
    battleEndStats,
    fetchBattleHistory,
    battleHistory,
  } = useBattleContext();

  useEffect(() => {
    if (battleHistory) {
      fetchBattleStats();
    }
  }, [battleHistory]);

  return (
    <div>
      <div className="w-1/4 text-white">
        <div className="bg-hexCellComponents rounded-2xl w-56 h-[16.7rem] mb-5"></div>

        <div className="bg-hexCellComponents rounded-2xl w-56 h-[16.7rem] mb-5">
          {battleEndStats
            ? battleEndStats.playerChampionStatistics.map((block, i) => (
                <div key={i}>
                  {block.playerStatistics.map((champion, j) => (
                    <p key={j}>
                      {champion.name}: {champion.hp} HP
                    </p>
                  ))}
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
