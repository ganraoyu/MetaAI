import { MdClose, MdPlayArrow, MdAnalytics, MdSave, MdFolderOpen, MdSettings } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useBattleContext } from "../../BattleContext";

export const BattleButtons = () => {
  const { 
    setStartBattle, 
    fetchBattleHistory, 
    setBattleHistory,
    loading
  } = useBattleContext();

  const handleStartBattle = () => {
    setStartBattle(true);
    fetchBattleHistory();
  };

  return (
    <div>
      <div className='flex items-center gap-1 mb-[0.5rem]'>
                
        {/* Main action buttons */}
        <button 
          className='h-8 px-3 rounded-md bg-hexCellComponents text-green-400 border border-green-600/60 text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all' 
          onClick={handleStartBattle}
          disabled={loading}
        >
          <MdPlayArrow className="h-4 w-4" /> 
          {loading ? 'Simulating...' : 'Start Battle'}
        </button>
        
        <button 
          className='h-8 px-3 rounded-md bg-hexCellComponents text-red-400 border border-red-600/60 text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all' 
          onClick={() => {
            setBattleHistory(null);
            setStartBattle(false);
          }}
        >
          <MdClose className="h-4 w-4" /> Clear Board
        </button>
        
        <button 
          className='h-8 px-3 rounded-md bg-hexCellComponents text-blue-400 border border-blue-500/60 text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all'
        >
          <MdAnalytics className="h-4 w-4" /> View Details
        </button>
        
        {/* File buttons */}
        <button 
          className='h-8 px-3 rounded-md bg-hexCellComponents text-blue-400 border border-blue-500/60 text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all'
        >
          <MdSave className="h-4 w-4" /> Save Board
        </button>
        
        <button 
          className='h-8 px-3 rounded-md bg-hexCellComponents text-blue-400 border border-blue-500/60 text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all'
        >
          <MdFolderOpen className="h-4 w-4" /> Load Board
        </button>
        
        <button 
          className='h-8 px-3 rounded-md bg-hexCellComponents text-yellow-400 border border-yellow-500/60 text-xs font-medium flex items-center gap-1 hover:bg-hexCellComponents/90 transition-all'
        >
          <MdSettings className="h-4 w-4" /> Options
        </button>
        
        {/* Navigation buttons */}
        <button 
          className='h-8 w-8 rounded-md bg-hexCellComponents text-gray-300 border border-gray-600/60 text-xs font-medium flex items-center justify-center hover:bg-hexCellComponents/90 transition-all'
        >
          <FaArrowLeft className="h-3 w-3" />
        </button>
        
        <button 
          className='h-8 w-8 rounded-md bg-hexCellComponents text-gray-300 border border-gray-600/60 text-xs font-medium flex items-center justify-center hover:bg-hexCellComponents/90 transition-all'
        >
          <FaArrowRight className="h-3 w-3" />
        </button>
      </div>
      
    </div>
  )
}
