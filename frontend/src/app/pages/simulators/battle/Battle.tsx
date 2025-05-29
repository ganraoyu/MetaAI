import { useState, useEffect, useRef } from 'react';
import { HexCells } from './HexCells';
import { ChampionCard } from './components/ChampionCard/ChampionCard';
import axios from 'axios';
import { MdClose, MdPlayArrow, MdAnalytics, MdSave, MdFolderOpen, MdAutorenew, MdSettings } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Filter } from './components/BattleLogCards/_Filter';
import { AutoAttack } from './components/BattleLogCards/AutoAttack';
import { Ability } from './components/BattleLogCards/Ability';
import { HealCard } from './components/BattleLogCards/HealCard';
import { champions } from './data/SET13/champion-data';

interface BattleLog {
  formattedTime: string;
  type: string;
  details: any;
  isCrit?: boolean;
  source: string;
}

interface BattleData {
  battleLogs: BattleLog[];
  duration: number;
}

const Battle = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [champion, setChampion] = useState<string | null>(null);
  const [battleHistory, setBattleHistory] = useState<BattleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);

  const [toggleAttack, setToggleAttack] = useState(true);
  const [toggleAbility, setToggleAbility] = useState(true);
  const [toggleHeal, setToggleHeal] = useState(true);

  const [toggleItemHeal, setToggleItemHeal] = useState(true);
  const [toggleMagicDamage, setToggleMagicDamage] = useState(true);
  const [toggleBurn, setToggleBurn] = useState(true);

  const [toggleUnits, setToggleUnits] = useState(true);
  const [toggleAugments, setToggleAugments] = useState(false);

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
    <div className='bg-mainBackground min-h-screen pt-[4.5rem]'>        
      <div className='flex-col items-center w-[70rem] mx-auto'>
        <div className='flex-col items-center justify-center mr-[2rem] '>
          <h1 className='text-[1.2rem] w-full text-white font-semibold'>TFT Battle Simulator</h1>
          <p className='text-white text-[0.8rem]'>Get real-time replays of battles with our TFT Battle Simulator</p>
        </div>        
        <div className='flex items-center gap-1 mb-[0.5rem]'>
          {/* Existing buttons */}
          <button className='btn btn-outline btn-success btn-sm flex items-center gap-1' onClick={() => {setClicked(true); fetchBattleHistory();}}>
            <MdPlayArrow className="text-lg h-4 w-4" /> Start Battle
          </button>
          <button className='btn btn-outline btn-error btn-sm flex items-center gap-1' onClick={() => setBattleHistory(null)}>
            <MdClose className="text-lg h-4 w-4" /> Clear Board
          </button>
          <button className='btn btn-outline btn-info btn-sm flex items-center gap-1'>
            <MdAnalytics className="text-lg h-4 w-4" /> View Details
          </button>
          
          {/* New buttons */}
          <button className='btn btn-outline btn-primary btn-sm flex items-center gap-1'>
            <MdSave className="text-lg h-4 w-4" /> Save Board
          </button>
          <button className='btn btn-outline btn-primary btn-sm flex items-center gap-1'>
            <MdFolderOpen className="text-lg h-4 w-4" /> Load Board
          </button>
          <button className='btn btn-outline btn-accent btn-sm flex items-center gap-1'>
            <MdSettings className="text-lg h-4 w-4" /> Options
          </button>
          
          {/* Navigation buttons */}
          <button className='btn btn-outline btn-secondary btn-sm flex items-center gap-1'>
            <FaArrowLeft className="text-lg h-4 w-4" />
          </button>
          <button className='btn btn-outline btn-secondary btn-sm flex items-center gap-1'>
            <FaArrowRight className="text-lg h-4 w-4" />
          </button>
        </div>
        <div className='flex flex-row items-start justify-between h-[35rem] w-[70rem] mx-auto p-4 bg-hexCellBackground rounded-t-2xl'>
          {/* Left side - Traits */}
          <div className='w-1/4 text-white'>
            <p className="font-semibold">
              Traits
            </p>
            <div className='bg-hexCellComponents rounded-2xl w-56 h-56 mb-6'>

            </div>
            <div className='bg-hexCellComponents rounded-2xl mb-2 w-56 h-56'>
            </div>
            {/* Trait content goes here */}
          </div>
          
          {/* Center - Hex Board */}
          <div className="flex-1 flex items-center justify-center mr-[3rem] mt-[2.6rem]">
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
          <div className='mb-10'>
            <div className='flex justify-center items-center h-17 w-[18rem] bg-hexCellComponents rounded-2xl pt-5 select-none'>
              <Filter
                toggleAttack={toggleAttack}
                toggleAbility={toggleAbility}
                toggleHeal={toggleHeal}
                toggleItemHeal={toggleItemHeal}
                toggleMagicDamage={toggleMagicDamage}
                toggleBurn={toggleBurn}
                setToggleAttack={setToggleAttack}
                setToggleAbility={setToggleAbility}
                setToggleHeal={setToggleHeal}
                setToggleItemHeal={setToggleItemHeal}
                setToggleMagicDamage={setToggleMagicDamage}
                setToggleBurn={setToggleBurn}
              />
            </div>
            <div className='mt-4 w-[18rem] h-[26rem] max-h-[calc(100%-3rem)] overflow-y-auto scrollbar-hide text-white bg-hexCellComponents rounded-2xl p-4' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                display: none;
                }

                @keyframes growIn {
                  from {
                    transform: scale(0.6);
                    opacity: 0;
                  }
                  to {
                    transform: scale(1);
                    opacity: 1;
                  }
                }

              .animate-grow-in {
                animation: growIn 0.2s ease-out forwards;
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
                <div className='select-none'>
                  {battleHistory && battleHistory.battleLogs && battleHistory.battleLogs.length > 0 ? (
                    <div>
                    <ul className="battle-log text-[0.8rem]">
                      {battleHistory.battleLogs.map((log, index) => (
                        <li key={index} className="mb-3 animate-fadeIn">
                          {log.type === "attack" && toggleAttack && (
                          <AutoAttack 
                            log={log}
                            index={index}
                            parentRef={parentRef}
                          />
                        )}
                        {log.type === "ability" && toggleAbility && (
                          <Ability
                            log={log}
                            index={index}
                            parentRef={parentRef}
                          />
                        )}
                        {log.type === "heal" && toggleHeal && (
                          <HealCard  
                            log={log}
                          />
                        )}
                        {log.type === "heal" && log.details.type === "item" && toggleItemHeal && (
                          <div className='bg-gradient-to-r from-teal-900/40 to-teal-800/20 border-l-4 border-teal-500 rounded-md p-2 shadow-md'>
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-gray-400">[{log.formattedTime}]</span>
                              <span className="text-xs font-bold text-teal-400 bg-teal-400/20 px-2 py-0.5 rounded">
                                +{log.details.healAmount}
                              </span>
                            </div>
                            <div>Item healing from {log.details.item}</div>
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
        {/* Bottom section - Units and Augments */}
        <div className='h-[40rem] w-[70rem] bg-hexCellBackground rounded-b-2xl mt-[-1.5rem] ml-[1.5rem]'>
          <div className=''>
            <button>Units</button>
            <button>Augments</button>
            <div>
              {toggleUnits && (
                <div className='flex gap-2 select-none'>
                  {champions.map(champion => (
                    <div key={champion.name}>
                      <img src={champion.image} alt={champion.name} className="w-10 h-10 border border-gray-600" />
                      <p className='text-[0.65rem] text-center'>{champion.name}</p>
                      {}
                    </div>
                  ))}
                </div>
                )}
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Battle;