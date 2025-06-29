import { MdClose, MdPlayArrow, MdAnalytics, MdSave, MdFolderOpen, MdSettings } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useBattleContext } from "../../BattleContext";

export const BattleButtons = () => {
  // Get context values and functions
  const { 
    setStartBattle, 
    fetchBattleHistory, 
    setBattleHistory,
    loading
  } = useBattleContext();

  // Start battle and fetch history
  const handleStartBattle = () => {
    setStartBattle(true);
    fetchBattleHistory();
  };

  // Common button styles
  const baseButtonClass = 'h-8 px-3 rounded-md bg-hexCellComponents text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all';
  const iconButtonClass = 'h-8 w-8 rounded-md bg-hexCellComponents text-gray-300 border border-gray-600/60 text-xs font-medium flex items-center justify-center hover:bg-hexCellComponents/90 transition-all';

  return (
    <div>
      <div className='flex items-center gap-1 mb-[0.5rem]'>
        {/* Battle control buttons */}
        <button 
          className={`${baseButtonClass} text-green-400 border border-green-600/60`}
          onClick={handleStartBattle}
          disabled={loading}
        >
          <MdPlayArrow className="h-4 w-4" /> 
          {loading ? 'Simulating...' : 'Start Battle'}
        </button>
        
        <button 
          className={`${baseButtonClass} text-red-400 border border-red-600/60`}
          onClick={() => {
            setBattleHistory(null);
            setStartBattle(false);
          }}
        >
          <MdClose className="h-4 w-4" /> Clear Board
        </button>
        
        <button className={`${baseButtonClass} text-blue-400 border border-blue-500/60`}>
          <MdAnalytics className="h-4 w-4" /> View Details
        </button>
        
        {/* File management buttons */}
        <button className={`${baseButtonClass} text-blue-400 border border-blue-500/60`}>
          <MdSave className="h-4 w-4" /> Save Board
        </button>
        
        <button className={`${baseButtonClass} text-blue-400 border border-blue-500/60`}>
          <MdFolderOpen className="h-4 w-4" /> Load Board
        </button>
        
        <button className={`${baseButtonClass} text-yellow-400 border border-yellow-500/60`}>
          <MdSettings className="h-4 w-4" /> Options
        </button>
        
        {/* Navigation buttons */}
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
