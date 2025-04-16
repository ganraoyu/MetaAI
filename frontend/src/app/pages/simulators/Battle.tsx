import { useState, useEffect } from 'react';
import { HexCells } from './HexCells';
import axios from 'axios';
import { MdClose, MdPlayArrow } from "react-icons/md";

// Define interfaces for your battle data
interface BattleLog {
  formattedTime: string;
  type: string;
  details: any;
}

interface BattleData {
  battleLogs: BattleLog[];
  duration: number;
}

const Battle = () => {
  const [champion, setChampion] = useState<string | null>(null);
  const [battleHistory, setBattleHistory] = useState<BattleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);

  const fetchBattleHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/battle-simulator/battle-history');
      console.log('Response data:', response.data); 
      setBattleHistory(response.data);
      setError(null);
      setLoading(false);
    } catch (err: any) {
      setError('Failed to fetch battle history: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching battle history:', err);
      setLoading(false);
    }
  };
                
  return (
    <div className='bg-mainBackground min-h-screen pt-[10rem]'>        
      <div className='flex-col items-center w-[70rem] mx-auto mb-4'>
        <div className='flex-col items-center justify-center mr-[2rem] mb-4'>
          <h1 className='text-[1.2rem] w-full text-white font-semibold'>TFT Battle Simulator</h1>
          <p className='text-white text-[0.8rem]'>Get real-time replays of battles with our TFT Battle Simulator</p>
        </div>        
        <div className='flex items-center gap-1'>          
          <button className='btn btn-outline btn-success btn-sm flex items-center gap-1' onClick={() => {setClicked(true); fetchBattleHistory();}}>
            <MdPlayArrow className="text-lg" /> Start Battle
          </button>
          <button className='btn btn-outline btn-error btn-sm flex items-center gap-1' onClick={() => setBattleHistory(null)}>
            <MdClose className="text-lg" /> Clear Board
          </button>
        </div>

        <div className='flex flex-row items-start justify-between h-[35rem] w-[70rem] mx-auto p-4 bg-hexCellBackground rounded-2xl'>
          {/* Left side - Traits */}
          <div className='w-1/4 text-white'>
            <p className="font-semibold">
              Traits
            </p>
            {/* Trait content goes here */}
          </div>
          
          {/* Center - Hex Board */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-1 justify-items-center mb-[30rem]">
              <div className='flex justify-center items-center gap-0 mr-8 mb-[-1.1rem]'>
                <HexCells champion={null} row={0} col={0} occupied={false} />
                <HexCells champion={null} row={0} col={1} occupied={false} />
                <HexCells champion={null} row={0} col={2} occupied={false} />
                <HexCells champion={null} row={0} col={3} occupied={false} />
                <HexCells champion={null} row={0} col={4} occupied={false} />
                <HexCells champion={null} row={0} col={5} occupied={false} />
                <HexCells champion={null} row={0} col={6} occupied={false} />
              </div>
              <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
                <HexCells champion={null} row={1} col={0} occupied={false} />
                <HexCells champion={null} row={1} col={1} occupied={false} />
                <HexCells champion={null} row={1} col={2} occupied={false} />
                <HexCells champion={null} row={1} col={3} occupied={false} />
                <HexCells champion={null} row={1} col={4} occupied={false} />
                <HexCells champion={null} row={1} col={5} occupied={false} />
                <HexCells champion={null} row={1} col={6} occupied={false} />
              </div>
              <div className='flex justify-center items-center gap-0 mr-8 mb-[-1.1rem]'>
                <HexCells champion={null} row={2} col={0} occupied={false} />
                <HexCells champion={null} row={2} col={1} occupied={false} />
                <HexCells champion={null} row={2} col={2} occupied={false} />
                <HexCells champion={null} row={2} col={3} occupied={false} />
                <HexCells champion={null} row={2} col={4} occupied={false} />
                <HexCells champion={null} row={2} col={5} occupied={false} />
                <HexCells champion={null} row={2} col={6} occupied={false} />
              </div>
              <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
                <HexCells champion={null} row={3} col={0} occupied={false} />
                <HexCells champion={null} row={3} col={1} occupied={false} />
                <HexCells champion={null} row={3} col={2} occupied={false} />
                <HexCells champion={null} row={3} col={3} occupied={false} />
                <HexCells champion={null} row={3} col={4} occupied={false} />
                <HexCells champion={null} row={3} col={5} occupied={false} />
                <HexCells champion={null} row={3} col={6} occupied={false} />
              </div>
              <div className='flex justify-center items-center gap-0 mr-8 mb-[-1.1rem]'>
                <HexCells champion={null} row={0} col={0} occupied={false} />
                <HexCells champion={null} row={0} col={1} occupied={false} />
                <HexCells champion={null} row={0} col={2} occupied={false} />
                <HexCells champion={null} row={0} col={3} occupied={false} />
                <HexCells champion={null} row={0} col={4} occupied={false} />
                <HexCells champion={null} row={0} col={5} occupied={false} />
                <HexCells champion={null} row={0} col={6} occupied={false} />
              </div>
              <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
                <HexCells champion={null} row={1} col={0} occupied={false} />
                <HexCells champion={null} row={1} col={1} occupied={false} />
                <HexCells champion={null} row={1} col={2} occupied={false} />
                <HexCells champion={null} row={1} col={3} occupied={false} />
                <HexCells champion={null} row={1} col={4} occupied={false} />
                <HexCells champion={null} row={1} col={5} occupied={false} />
                <HexCells champion={null} row={1} col={6} occupied={false} />
              </div>
              <div className='flex justify-center items-center gap-0 mr-8 mb-[-1.1rem]'>
                <HexCells champion={null} row={2} col={0} occupied={false} />
                <HexCells champion={null} row={2} col={1} occupied={false} />
                <HexCells champion={null} row={2} col={2} occupied={false} />
                <HexCells champion={null} row={2} col={3} occupied={false} />
                <HexCells champion={null} row={2} col={4} occupied={false} />
                <HexCells champion={null} row={2} col={5} occupied={false} />
                <HexCells champion={null} row={2} col={6} occupied={false} />
              </div>
              <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
                <HexCells champion={null} row={3} col={0} occupied={false} />
                <HexCells champion={null} row={3} col={1} occupied={false} />
                <HexCells champion={null} row={3} col={2} occupied={false} />
                <HexCells champion={null} row={3} col={3} occupied={false} />
                <HexCells champion={null} row={3} col={4} occupied={false} />
                <HexCells champion={null} row={3} col={5} occupied={false} />
                <HexCells champion={null} row={3} col={6} occupied={false} />
              </div>
            </div>
          </div>
          
          {/* Right side - Battle Logs */}
          <div className='w-1/4 h-full overflow-auto text-white'>
            {loading && clicked ? (
              <p>Loading battle data...</p>
            ) : error ? (
              <div>
                <p>{error}</p>
                <button onClick={fetchBattleHistory}>Try Again</button>
              </div>
            ) : (
              <div>
                {battleHistory && battleHistory.battleLogs && battleHistory.battleLogs.length > 0 ? (
                  <div>
                    <h2 className="font-semibold">Battle Log</h2>
                    <ul className="battle-log text-sm">
                      {battleHistory.battleLogs.map((log, index) => (
                        <li key={index} className={`log-entry ${log.type}`}>
                          <div className="time">{log.formattedTime}</div>
                          {log.type === "attack" && (
                            <div>
                              {log.details.attacker.champion} attacks {log.details.target.champion} 
                              for {log.details.isCrit ? "CRIT " : ""}{log.details.damage} damage
                            </div>
                          )}
                          {log.type === "ability" && (
                            <div>
                              {log.details.attacker.champion} uses {log.details.ability} 
                              on {log.details.target.champion} for {log.details.damage} damage
                            </div>
                          )}
                          {log.type === "heal" && (
                            <div>
                              {log.details.champion} heals for {log.details.healAmount}
                            </div>
                          )}
                          {log.type === "magicDamage" && (
                            <div>
                              {log.details.champion} deals {log.details.magicDamage} magic damage 
                              to {log.details.target} from {log.details.item}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No battle logs available.</p>
                )}
              </div>
            )}
          </div>
        </div>      
      </div>
    </div>
  );
};

export default Battle;