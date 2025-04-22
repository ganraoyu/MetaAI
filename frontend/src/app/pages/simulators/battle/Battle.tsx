import { useState, useEffect } from 'react';
import { HexCells } from './HexCells';
import { ChampionCard } from './ChampionCard';
import axios from 'axios';
import { MdClose, MdPlayArrow } from "react-icons/md";

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

  const [toggleAttack, setToggleAttack] = useState(true);
  const [toggleAbility, setToggleAbility] = useState(true);
  const [toggleHeal, setToggleHeal] = useState(true);
  const [toggleMagicDamage, setToggleMagicDamage] = useState(true);
  const [toggleBurn, setToggleBurn] = useState(true);

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
    <div className='bg-mainBackground min-h-screen pt-[6rem]'>        
      <div className='flex-col items-center w-[70rem] mx-auto mb-4'>
        <div className='flex-col items-center justify-center mr-[2rem] mb-[0.5rem]'>
          <h1 className='text-[1.2rem] w-full text-white font-semibold'>TFT Battle Simulator</h1>
          <p className='text-white text-[0.8rem]'>Get real-time replays of battles with our TFT Battle Simulator</p>
        </div>        
        <div className='flex items-center gap-1 mb-[0.5rem]'>          
          <button className='btn btn-outline btn-success btn-sm flex items-center gap-1' onClick={() => {setClicked(true); fetchBattleHistory();}}>
            <MdPlayArrow className="text-lg" /> Start Battle
          </button>
          <button className='btn btn-outline btn-error btn-sm flex items-center gap-1' onClick={() => setBattleHistory(null)}>
            <MdClose className="text-lg" /> Clear Board
          </button>
        </div>

        <div className='flex flex-row items-start justify-between h-[34rem] w-[70rem] mx-auto p-4 bg-hexCellBackground rounded-2xl'>
          {/* Left side - Traits */}
          <div className='w-1/4 text-white'>
            <p className="font-semibold">
              Traits
            </p>
            {/* Trait content goes here */}
          </div>
          
          {/* Center - Hex Board */}
          <div className="flex-1 flex items-center justify-center mr-[3rem] mt-[1.3rem]">
            <div className="grid grid-cols-1 justify-items-center">
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
              <div className='flex justify-center items-center gap-0 mt-[0.5rem] mr-8 mb-[-1.1rem]'>
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
            <div className='w-[18rem] h-full overflow-auto scrollbar-hide text-white bg-hexCellComponents rounded-2xl p-4 border-[0.5px] border-black' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
              display: none;
              }
            `}</style>
            {loading && clicked ? (
              <p>Loading battle data...</p>
            ) : error ? (
              <div>
              <p>{error}</p>
              <button onClick={fetchBattleHistory}>Try Again</button>
              </div>
            ) : (
              <div>
              <div className='flex items-center justify-between ml-4 mb-2'>
                <div className="flex flex-wrap gap-2 mb-3">
                <div className="form-control">
                  <label className="label cursor-pointer gap-1 p-1">
                  <div className="label-text text-white text-xs">Attacks</div>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-xs checkbox-success" 
                    checked={toggleAttack} 
                    onChange={() => setToggleAttack(!toggleAttack)}
                  />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-1 p-1">
                  <div className="label-text text-white text-xs">Abilities</div>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-xs checkbox-primary" 
                    checked={toggleAbility} 
                    onChange={() => setToggleAbility(!toggleAbility)}
                  />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-1 p-1">
                  <div className="label-text text-white text-xs">Heals</div>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-xs checkbox-accent" 
                    checked={toggleHeal}
                    onChange={() => setToggleHeal(!toggleHeal)}
                  />
                  </label>
                </div>
                </div>
              </div>
              {battleHistory && battleHistory.battleLogs && battleHistory.battleLogs.length > 0 ? (
                <div>
                <ul className="battle-log text-[0.8rem]">
                  {battleHistory.battleLogs.map((log, index) => (
                    <li key={index} className="mb-3 animate-fadeIn">
                    {log.type === "attack" && toggleAttack && (
                    <div className='bg-gradient-to-r from-red-900/40 to-red-800/20 border-l-4 border-red-600 rounded-md p-2 shadow-md'>
                      <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
                      <span className="text-xs font-bold text-red-400 bg-red-400/20 px-2 py-0.5 rounded">
                      {log.details.damage}
                      </span>
                      </div>
                      <div className='grid grid-cols-3 gap-2 mb-4'>
                      <div className="flex justify-end">
                        <ChampionCard 
                        champion={log.details.attacker.champion}
                        currentHp={log.details.attacker.currentHp || 0}
                        maxHp={log.details.attacker.maxHp || 100}
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        </div>
                        <p className="text-xs font-bold text-red-500 animate-pulse mt-1 px-2">CRIT</p>
                      </div>
                      <div className="flex justify-start">
                        <ChampionCard 
                        champion={log.details.target.champion}
                        currentHp={log.details.target.currentHp || 0}
                        maxHp={log.details.target.maxHp || 100}
                        />
                      </div>
                      </div>
                    </div>
                    )}
                    {log.type === "ability" && toggleAbility && (
                      <div className='bg-gradient-to-r from-blue-900/40 to-blue-800/20 border-l-4 border-blue-500 rounded-md p-2 shadow-md'>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
                          <span className="text-xs font-bold text-blue-400 bg-blue-400/20 px-2 py-0.5 rounded">
                            {log.details.damage}
                          </span>
                        </div>
                        <div className='grid grid-cols-3 gap-2 mb-2'>
                          <div className="flex justify-end">
                          <ChampionCard 
                            champion={log.details.attacker.champion}
                            currentHp={log.details.attacker.currentHp || 0}
                            maxHp={log.details.attacker.maxHp || 100}
                          />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                              </svg>
                            </div>
                          <div className="mt-1 text-xs font-semibold text-blue-400">{log.details.ability}</div>
                          </div>
                          <div className="flex justify-start">
                            <ChampionCard 
                              champion={log.details.target.champion}
                              currentHp={log.details.target.currentHp || 0}
                              maxHp={log.details.target.maxHp || 100}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {log.type === "heal" && toggleHeal && (
                      <div className='bg-gradient-to-r from-green-900/40 to-green-800/20 border-l-4 border-green-500 rounded-md p-2 shadow-md'>        
                      <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
                      <span className="text-xs font-bold text-green-400 bg-green-400/20 px-2 py-0.5 rounded ">
                        +{log.details.healAmount}
                      </span>
                      </div>
                      <div className='grid grid-cols-3 gap-2 mb-2'>
                        <div className="flex justify-end">                            
                        <ChampionCard
                          champion={log.details.healer.champion}
                          currentHp={log.details.healer.currentHp + log.details.healAmount}
                          maxHp={log.details.healer.maxHp}
                        />
                        </div>
                        <div className="flex flex-col items-center justify-center">  
                        <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                          <img src='../assets/icons/health.png' className='w-8 h-8'/>
                        </div>
                        </div>
                        <div className="flex justify-start">
                        <ChampionCard 
                          champion={log.details.target.champion}
                          currentHp={log.details.target.currentHp + log.details.healAmount}
                          maxHp={log.details.target.maxHp}
                        />
                        </div>
                      </div>
                      </div>
                    )}
                    {log.type === "magicDamage" && toggleMagicDamage && (
                        <div className='bg-gradient-to-r from-purple-900/40 to-purple-800/20 border-l-4 border-purple-500 rounded-md p-2 shadow-md'>
                        <span className="text-xs text-gray-400 block mb-1">[{log.formattedTime}]</span>
                        <span className="font-medium">{log.details.champion}</span> deals magic damage to <span className="font-medium">{log.details.target}</span>
                        <div className="text-xs opacity-75 mt-1">from {log.details.item}</div>
                        <span className="float-right font-bold text-purple-400">{log.details.magicDamage}</span>
                        </div>
                        )}
                        {log.type === 'burn' && toggleBurn && (
                        <div className='bg-gradient-to-r from-orange-900/40 to-orange-800/20 border-l-4 border-orange-500 rounded-md p-2 shadow-md'>
                        <span className="text-xs text-gray-400 block mb-1">[{log.formattedTime}]</span>
                        <span className="font-medium">{log.details.champion}</span> burns <span className="font-medium">{log.details.target}</span>
                        <div className="text-xs opacity-75 mt-1">from {log.details.item}</div>
                        <span className="float-right font-bold text-orange-400">{log.details.burnDamage}</span>
                        </div>
                        )}
                        {log.type === 'wound' && (
                        <div className='bg-gradient-to-r from-rose-900/40 to-rose-800/20 border-l-4 border-rose-500 rounded-md p-2 shadow-md'> 
                        <span className="text-xs text-gray-400 block mb-1">[{log.formattedTime}]</span>
                        <span className="font-medium">{log.details.champion}</span> wounds <span className="font-medium">{log.details.target}</span>
                        <div className="text-xs opacity-75 mt-1">from {log.details.item}</div>
                        <span className="float-right font-bold text-rose-400">{log.details.woundDamage}</span>
                        </div>
                        )}
                      </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                    <div className='flex items-center justify-center h-full w-full mt-[10rem]'>
                      <p className="text-hexCellComponentsFont text-center text-[0.9rem]">No battle logs available. Start a battle to see logs here.</p>
                    </div>
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