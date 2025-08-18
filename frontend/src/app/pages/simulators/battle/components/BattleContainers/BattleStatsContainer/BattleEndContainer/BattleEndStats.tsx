import React, { useEffect } from "react";
import { useBattleContext } from "../../../../BattleContext";
import { useTFTSetContext } from "../../../../../../../utilities/TFTSetContext";
import { ChampionDamageBar } from "./ChampionBar/ChampionDamagebar";
import { ChampionHealShieldBar } from "./ChampionBar/ChampionHealShieldBar";
import { ChampionStatsNumbers } from "./ChampionBar/ChampionStatsNumbers";

export const BattleEndStats = () => {
  const { set } = useTFTSetContext();
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
        <div className="bg-hexCellComponents rounded-2xl w-56 h-[16.7rem] mb-5 p-4">
          {battleEndStats
            ? battleEndStats.opponentChampionStatistics.map((block, i) => (
                <div key={i}>
                  {block.opponentStatistics.map((champion, j) => (
                    <div>
                      <ChampionStatsNumbers champion={champion}/>
                      <ChampionDamageBar
                        key={j}
                        champion={champion}
                      />
                      <ChampionHealShieldBar 
                        key={j}
                        champion={champion}
                      />
                    </div>
                  ))}
                </div>
              ))
            : "Loading..."}
        </div>
        <div className="bg-hexCellComponents rounded-2xl w-56 h-[16.7rem] mb-5 p-4">
          {battleEndStats
            ? battleEndStats.playerChampionStatistics.map((block, i) => (
                <div key={i}>
                  {block.playerStatistics.map((champion, j) => (
                    <div>
                      <ChampionStatsNumbers champion={champion}/>
                      <ChampionDamageBar
                        key={j}
                        champion={champion}
                      />
                      <ChampionHealShieldBar 
                        key={j}
                        champion={champion}
                      />
                    </div>
                  ))}
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
