import { useEffect } from "react";
import { useBattleContext } from "../../../../BattleContext";
import { buildDamageGradient, getDamagePercentages } from "./utils";

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

        <div className="bg-hexCellComponents rounded-2xl w-56 h-[16.7rem] mb-5 p-4">
          {battleEndStats ? (
            battleEndStats.playerChampionStatistics.map((block, i) => (
              <div key={i}>
                {block.playerStatistics.map((champion, j) => {
                  const {
                    totalChampionDamage,
                    totalChampionMagicDamage,
                    totalChampionTrueDamage,
                    totalChampionAbilityDamage,
                  } = champion;

                  const total =
                    totalChampionDamage +
                    totalChampionMagicDamage +
                    totalChampionTrueDamage +
                    totalChampionAbilityDamage;

                  const physicalPercent = getDamagePercentages(
                    totalChampionDamage,
                    total
                  );
                  const magicPercent = getDamagePercentages(
                    totalChampionMagicDamage,
                    total
                  );
                  const abilityPercent = getDamagePercentages(
                    totalChampionAbilityDamage,
                    total
                  );
                  const truePercent = getDamagePercentages(
                    totalChampionTrueDamage,
                    total
                  );

                  const gradient = buildDamageGradient(
                    truePercent,
                    magicPercent,
                    abilityPercent,
                    physicalPercent
                  );

                  return (
                    <div key={j} className="mb-2">
                      <p className="mb-1">{champion.name}</p>
                      <div
                        style={{
                          height: "10px",
                          width: "100%",
                          background: gradient,
                          borderRadius: "4px",
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};
