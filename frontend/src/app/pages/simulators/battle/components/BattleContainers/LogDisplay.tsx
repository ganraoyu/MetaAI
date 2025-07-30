import { useRef } from "react";
import { AutoAttack } from "../BattleLogCards/AutoAttack";
import { useBattleContext } from "../../BattleContext";
import { Ability } from "../BattleLogCards/Ability";
import { Heal } from "../BattleLogCards/Heal";
import { Burn } from "../BattleLogCards/Burn";

export interface LogsDisplayProps {
  toggleAttack: boolean;
  toggleAbility: boolean;
  toggleHeal: boolean;
  toggleItem: boolean;
  setToggleAttack: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleAbility: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleHeal: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleitem: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogsDisplay = ({
  toggleAttack,
  toggleAbility,
  toggleHeal,
  toggleItem,
}: LogsDisplayProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { battleHistory, loading, error, fetchBattleHistory } =
    useBattleContext();

  return (
    <div
      className="mt- w-[18rem] h-[30rem] max-h-[calc(100%-3rem)] overflow-y-auto scrollbar-hide text-white bg-hexCellComponents rounded-2xl py-2 px-6"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <LogStyles />

      {/* Battle Logs */}
      <div>
        {loading ? (
          <p>Loading battle data...</p>
        ) : error ? (
          <div>
            <p>{error}</p>
            <button onClick={fetchBattleHistory}>Try Again</button>
          </div>
        ) : (
          <div className="select-none">
            {battleHistory &&
            battleHistory.battleLogs &&
            battleHistory.battleLogs.length > 0 ? (
              <div>
                <ul className="battle-log text-[0.8rem]">
                  {battleHistory.battleLogs.map((log: any, index: number) => (
                    <li key={index} className="mb-3 animate-fadeIn">
                      {/* Render log items based on type */}
                      {log.type === "attack" && toggleAttack && (
                        <div className="mb-2">
                          <AutoAttack
                            log={log}
                            index={index}
                            parentRef={parentRef}
                          />
                        </div>
                      )}
                      {log.type === "ability" && toggleAbility && (
                        <div className="mb-2">
                          <Ability log={log} index={index} />
                        </div>
                      )}
                      {log.type === "heal" && toggleHeal && (
                        <div className="mb-2">
                          <Heal log={log} index={index} />
                        </div>
                      )}
                      {log.type === "burn" && toggleItem && (
                        <div className="mb-2">
                          <Burn log={log} index={index} />
                        </div>
                      )}
                      {/* Add other log types here */}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full mt-[10rem]">
                <p className="text-hexCellComponentsFont text-center text-[0.9rem]">
                  No battle logs available. Start a battle to see logs here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const LogStyles = () => (
  <style>{`
    div::-webkit-scrollbar {
      display: none;
    }

    @keyframes growIn {
      from {
        transform: scale(0.6);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .animate-grow-in {
      animation: growIn 0.2s ease-out forwards;
    }
  `}</style>
);
