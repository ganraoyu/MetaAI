import { useState } from "react";
import { MdClose, MdPlayArrow } from "react-icons/md";
import { useBattleContext } from "../../BattleContext";
import { useHexBoardContext } from "./HexBoard/HexBoardContext";
import { useRunBattle } from "../../hooks/useRunBattle";

export const BattleButtons = () => {
  const { setStartBattle, setBattleHistory } = useBattleContext();
  const { boardState, setBoardState, setBoardArray } = useHexBoardContext(); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { runBattle } = useRunBattle();

  const handleStartBattle = async () => {
    setLoading(true);
    setError(null);

    try {
      const championsOnBoard = Object.values(boardState).filter(cell => cell.champion).length;
      
      if (championsOnBoard === 0) {
        setError("No champions on board! Please place at least one champion before starting a battle.");
        return;
      }

      const battleResult = await runBattle();
      
      if (battleResult.battleHistory) {
        setBattleHistory(battleResult.battleHistory); 
        setStartBattle(true);
      }
      
      if (battleResult.battleResult?.winner) {
        setError(null); 
      }
    } catch (err) {
      setError("Battle simulation failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearBoard = () => {
    setBattleHistory(null);
    setStartBattle(false);
    setBoardState({});
    setBoardArray([]);
    setError(null);
  };

  const baseButtonClass = 'h-8 px-3 rounded-md bg-hexCellComponents text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all';
  const championsOnBoard = Object.values(boardState).filter(cell => cell.champion).length;

  return (
    <div>
      <div className='flex items-center gap-1 mb-[0.5rem]'>
        <button 
          className={`${baseButtonClass} text-green-400 border border-green-600/60`}
          onClick={handleStartBattle}
          disabled={loading || championsOnBoard === 0}
        >
          <MdPlayArrow className="h-4 w-4" /> 
          {loading ? 'Simulating...' : 'Start Battle'}
        </button>

        <button 
          className={`${baseButtonClass} text-red-400 border border-red-600/60`}
          onClick={handleClearBoard}
        >
          <MdClose className="h-4 w-4" /> Clear Board
        </button>
      </div>
      
      {error && (
        <div className="text-red-400 text-xs mt-2">
          {error}
        </div>
      )}
    </div>
  );
};