import { BattleEndStats } from "../BattleStatsContainer/BattleEndStats";
import { HexCell } from "./HexCell";

const NUM_ROWS = 8;
const NUM_COLS = 7;

export const HexBoard = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      
      {/* Opponent Board */}
      <div className="flex flex-col items-center">
        {[...Array(4)].map((_, row) => {
          const isEvenRow = row % 2 === 0;
          const team = "opponent";

          return (
            <div
              key={row}
              className={`flex justify-center items-center gap-0 mb-[-1.1rem] ${
                isEvenRow ? "mr-8" : "ml-10"
              }`}
            >
              {[...Array(NUM_COLS)].map((_, col) => {
                const cellId = `r${row}c${col}`;
                return <HexCell key={cellId} cellId={cellId} team={team} />;
              })}
            </div>
          );
        })}
      </div>

      {/* Player Board */}
      <div className="flex flex-col items-center">
        {[...Array(4)].map((_, i) => {
          const row = i + 4;
          const isEvenRow = row % 2 === 0;
          const team = "player";

          return (
            <div
              key={row}
              className={`flex justify-center items-center gap-0 mb-[-1.1rem] ${
                isEvenRow ? "mr-8" : "ml-10"
              } ${row === 4 ? "mt-[0.5rem]" : ""}`}
            >
              {[...Array(NUM_COLS)].map((_, col) => {
                const cellId = `r${row}c${col}`;
                return <HexCell key={cellId} cellId={cellId} team={team} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
