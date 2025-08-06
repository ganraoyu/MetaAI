import { useHexBoardContext } from "../HexBoard/HexBoardContext";
import { TraitsCard } from "./TraitsCard";

export const TraitsContainer = () => {
  const { orderedPlayerTraits, orderedOpponentTraits } = useHexBoardContext();

  return (
    <div>
      <div className="w-1/4 text-white">
        <div className="bg-hexCellComponents rounded-2xl w-56 h-[16.7rem] mb-5">
          {orderedOpponentTraits.length <= 0 ? (
            <div className="flex justify-center items-center h-full w-full">
              <p className="text-hexCellComponentsFont text-center text-[0.8rem] px-2">
                Drag to top board to place opponent
              </p>
            </div>
          ) : (
            orderedOpponentTraits.map(([trait, count]) => (
              <TraitsCard key={trait} trait={trait} count={count} />
            ))
          )}
        </div>

        <div className="bg-hexCellComponents rounded-2xl w-56 h-[16.7rem] mb-5">
          {orderedPlayerTraits.length <= 0 ? (
             <div className="flex justify-center items-center h-full w-full">
              <p className="text-hexCellComponentsFont text-center text-[0.8rem] px-2">
                Drag to bottom board to place player
              </p>
            </div>
          ) : (
            orderedPlayerTraits.map(([trait, count]) => (
              <TraitsCard key={trait} trait={trait} count={count} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
