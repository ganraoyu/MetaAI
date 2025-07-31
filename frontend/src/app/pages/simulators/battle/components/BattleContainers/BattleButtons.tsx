import { useState } from "react";
import { MdClose, MdPlayArrow, MdAnalytics, MdSave, MdFolderOpen, MdSettings } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useBattleContext } from "../../BattleContext";
import { useHexBoardContext } from "./HexBoard/HexBoardContext";

export const BattleButtons = () => {
  const { setStartBattle, setBattleHistory } = useBattleContext();
  const { boardState, setBoardState, setBoardArray } = useHexBoardContext(); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendBattleToBackend = async () => {
    try {
      
      const requestBody = { boardState: boardState };

      const response = await fetch("http://localhost:3000/battle-simulator/start-battle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error sending battle to backend:", error);
      throw error;
    }
  };

  const handleStartBattle = async () => {
    setLoading(true);
    setError(null);

    try {
      const championsOnBoard = Object.values(boardState).filter(cell => cell.champion).length;
      if (championsOnBoard === 0) {
        setError("Please place at least one champion on the board.");
        return;
      }

      const battleResult = await sendBattleToBackend();
      setBattleHistory(battleResult.battleHistory); 
      setStartBattle(true);
      
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
  const iconButtonClass = 'h-8 w-8 rounded-md bg-hexCellComponents text-gray-300 border border-gray-600/60 text-xs font-medium flex items-center justify-center hover:bg-hexCellComponents/90 transition-all';

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

        {error && <p className="text-red-600 ml-2">{error}</p>}
        {championsOnBoard > 0 && <p className="text-green-400 ml-2">Champions: {championsOnBoard}</p>}

        {/* Rest of your buttons unchanged */}
        <button className={`${baseButtonClass} text-blue-400 border border-blue-500/60`}>
          <MdAnalytics className="h-4 w-4" /> View Details
        </button>

        <button className={`${baseButtonClass} text-blue-400 border border-blue-500/60`}>
          <MdSave className="h-4 w-4" /> Save Board
        </button>

        <button className={`${baseButtonClass} text-blue-400 border border-blue-500/60`}>
          <MdFolderOpen className="h-4 w-4" /> Load Board
        </button>

        <button className={`${baseButtonClass} text-yellow-400 border border-yellow-500/60`}>
          <MdSettings className="h-4 w-4" /> Options
        </button>

        <button className={iconButtonClass}>
          <FaArrowLeft className="h-3 w-3" />
        </button>

        <button className={iconButtonClass}>
          <FaArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};