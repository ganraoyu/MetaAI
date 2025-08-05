import { HexCell } from "./HexCell";

const NUM_ROWS = 8;
const NUM_COLS = 7;

export const HexBoard = () => {
  return (
    <div className="flex-1 flex items-center justify-center mt-[1.5rem]">
      <div className="grid grid-cols-1 justify-items-center">
        {[...Array(NUM_ROWS)].map((_, row) => {
          const isEvenRow = row % 2 === 0;
          const team = row < 4 ? "opponent" : "player";

          return (
            <div
              key={row}
              className={`flex justify-center items-center gap-0 mb-[-1.1rem] ${
                isEvenRow ? "mr-8" : "ml-10"
              } ${row === 4 ? "mt-[0.5rem]" : ""}`}
            >
              {[...Array(NUM_COLS)].map((_, col) => {
                const cellId = `r${row}c${col}`;

                return (
                  <HexCell cellId={cellId} team={team} />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
