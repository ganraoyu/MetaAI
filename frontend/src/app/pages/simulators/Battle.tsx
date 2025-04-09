import { useState, useEffect } from 'react';
import axios from 'axios';

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

interface HexCellsProps {
  champion: any;
  row: number;
  col: number;
  occupied?: boolean;
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
    <div className='bg-mainBackground'>
    <div>
      
    
      <div>
        <h1 className='text-[1.2rem] flex justify-center w-full pt-[6rem] text-white font-semibold'>TFT Battle Simulator</h1>
        <p className='text-white text-[0.8rem]'>Get real-time replays of battles with our TFT Battle Simulator</p>
      </div>
      <div>
        <button>Clear</button>
      </div>
      <div
        className="w-16 h-16 bg-hexCell mx-auto my-4 relative hover:bg-hexCellHover transition-colors duration-300 flex items-center justify-center text-white"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}>
      </div>
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
                <h2>Battle Log</h2>
                <ul className="battle-log">
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
              <p>No battle history found.</p>
            )}
            <button onClick={() => setBattleHistory(null)} >Clear History</button>
            <button
              onClick={() => {
                setClicked(true);
                fetchBattleHistory();
              }}
              >
              Simulate Battle
            </button>
            <button onClick={fetchBattleHistory} >Refresh</button>
          </div>
        )}
        </div>
    </div>
  );
};

export default Battle;