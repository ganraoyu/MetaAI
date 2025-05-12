import { useEffect, useState, RefObject } from 'react';
import { itemMap } from '../utils/ItemMapping';

interface ChampionCardHoverProps {
  champion: string;
  cost: number;
  currentHp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  shield: number;
  trait1: string;
  trait2: string;
  trait3: string;
  item1?: string;
  item2?: string;
  item3?: string;
  armor: number;
  magicResist: number;
  attackDamage: number;
  attackSpeed: number;
  critChance: number;
  critDamage: number;
  abilityPower: number;
  damageAmp: number;
  omnivamp: number;
  reduction: number;
  range: number;
  starLevel?: number;
  parentRef: RefObject<HTMLDivElement>;
}

const ChampionCardHover = ({
  champion,
  cost = 4,
  currentHp,
  maxHp,
  mana,
  maxMana,
  shield,
  trait1,
  trait2,
  trait3,
  item1,
  item2,
  item3,
  armor,
  magicResist,
  attackDamage,
  attackSpeed,
  critChance,
  critDamage,
  abilityPower,
  damageAmp,
  omnivamp,
  reduction,
  range,
  starLevel = 3,
  parentRef
}: ChampionCardHoverProps) => {
  const [hasShield, setHasShield] = useState(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (parentRef.current) {
      const updatePosition = () => {
        const rect = parentRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const viewportWidth = window.innerWidth;

        let left = rect.right + 10;
        
        if (left + 180 > viewportWidth) {
          left = rect.left - 180;
        }
        
        setPosition({
          top: rect.top,
          left: Math.max(10, left)
        });
      };
      
      // Initial position
      updatePosition();
      
      // Update position on scroll
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [parentRef]);

  return (
    <div 
      className='fixed bg-gray-800 text-white rounded-md shadow-lg w-44 h-78 z-50 origin-top-left animate-grow-in'
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px` 
      }}
    >
      <div className={`relative border-2 rounded-t-md ${
        cost === 1 ? 'border-gray-400' : 
        cost === 2 ? 'border-green-500' : 
        cost === 3 ? 'border-blue-500' : 
        cost === 4 ? 'border-purple-700' : 
        cost === 5 ? 'border-yellow-400' : 
        'border-red-500'
      }`}>
        <img 
          src={`../assets/SET14/champions/splash/${champion}.png`} 
          alt={champion}
          className="rounded-t-md w-full h-24 object-cover"
        />

        {/* Star level */}
        <div className="absolute top-1 left-1 flex space-x-1">
          {[1, 2, 3].map((star) => (
            <svg 
              key={star}
              className={`w-3.5 h-3.5 ${star <= starLevel ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Traits */}
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
          {trait1 && (
            <div className="flex items-center gap-1 mb-1">
              <img src={`../assets/SET14/traits/${trait1}.png`} className="h-4 w-4" alt={trait1} />
              <p className="text-white text-xs text-outline">{trait1}</p>
            </div>
          )}
          {trait2 && (
            <div className="flex items-center gap-1 mb-1">
              <img src={`../assets/SET14/traits/${trait2}.png`} className="h-4 w-4" alt={trait2} />
              <p className="text-white text-xs text-outline">{trait2}</p>
            </div>
          )}
          {trait3 && (
            <div className="flex items-center gap-1">
              <img src={`../assets/SET14/traits/${trait3}.png`} className="h-4 w-4" alt={trait3} />
              <p className="text-white text-xs text-outline">{trait3}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cost */}
      <div className={`absolute top-[5.2rem] right-0 rounded-tl-md px-1.5 text-white font-bold flex items-center gap-1 bg-gradient-to-r ${
        cost === 1 ? 'from-gray-600 to-gray-400' :
        cost === 2 ? 'from-green-700 to-green-500' :
        cost === 3 ? 'from-blue-700 to-blue-500' :
        cost === 4 ? 'from-purple-900 to-purple-400' :
        cost === 5 ? 'from-yellow-600 to-yellow-400' :
        'from-red-700 to-red-500'
      }`}>
        <img src="../assets/icons/coin.png" className="h-2 w-2"/>
        <p className="text-xs text-outline">{cost || 1}</p>
      </div>

      {/* Champion Health and Mana */}
      <div className="px-2 pt-2">
        <div className="relative h-3 mt-1 bg-gray-700 rounded">
          <div 
            className="absolute top-0 left-0 h-3 bg-green-600 rounded" 
            style={{ width: `${(currentHp / maxHp) * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
            {Math.round(currentHp)}/{maxHp}
          </div>
        </div>
        {shield > 0 && (
          <div className="relative h-3 mt-1 bg-gray-500 rounded">
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
              {Math.round(shield)}/{shield}
            </div>
          </div>
        )}
        <div className="relative h-3 bg-gray-700 mt-1 rounded">
          <div 
            className="absolute top-0 left-0 h-3 bg-blue-600 rounded" 
            style={{ width: `${(mana / maxMana) * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium text-outline">
            {mana}/{maxMana}
          </div>
        </div>
      </div>

      {/* Champion Items */}
      <div className="flex justify-center gap-5 mt-2">
        <div>
          {item1 && itemMap[item1] ? (
            <img
              src={itemMap[item1].image}
              alt={item1}
              className="h-8 w-8 border-2 border-gray-700"
            />
          ) : <div className='border-2 h-8 w-8 border-gray-700'></div>}
        </div>
        <div>
          {item2 && itemMap[item2] ? (
            <img
              src={itemMap[item2].image}
              alt={item2}
              className="h-8 w-8 border-2 border-gray-700"
            />
          ) : <div className='border-2 h-8 w-8 border-gray-700'></div>}
        </div>
        <div>
          {item3 && itemMap[item3] ? (
            <img
              src={itemMap[item3].image}
              alt={item3}
              className="h-8 w-8 border-2 border-gray-700"
            />
          ) : <div className='border-2 h-8 w-8 border-gray-700'></div>}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 text-[0.7rem]">
        <div className="grid grid-cols-5 gap-0.5 text-gray-300">
          {/* First row of stats */}
          <div className="flex flex-col items-center">
        <img src="../assets/icons/attack.png" className="h-4 w-4 mb-0.5" alt="attack" />
        <p className="text-center w-full truncate">{attackDamage}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/abilitypower.png" className="h-4 w-4 mb-0.5" alt="abilityPower" />
        <p className="text-center w-full truncate">{abilityPower}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/armor.png" className="h-4 w-4 mb-0.5" alt="armor" />
        <p className="text-center w-full truncate">{armor}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/magicresist.png" className="h-4 w-4 mb-0.5" alt="magicResist" />
        <p className="text-center w-full truncate">{magicResist}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/attackspeed.png" className="h-4 w-4 mb-0.5" alt="attackSpeed" />
        <p className="text-center w-full truncate">{attackSpeed.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-0.5 text-gray-300 mt-1">
          {/* Second row of stats */}
          <div className="flex flex-col items-center">
        <img src="../assets/icons/criticalstrikechance.png" className="h-4 w-4 mb-0.5" alt="criticalstrikechance" />
        <p className="text-center w-full truncate">{critChance}%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/criticaldamage.svg" className="h-4 w-4 mb-0.5" alt="critDamage" />
        <p className="text-center w-full truncate">{critDamage}0%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/omnivamp.png" className="h-4 w-4 mb-0.5" alt="omnivamp" />
        <p className="text-center w-full truncate">{omnivamp || 0}%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/damageamp.png" className="h-4 w-4 mb-0.5" alt="damageAmp" />
        <p className="text-center w-full truncate">{damageAmp}%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/range.png" className="h-4 w-4 mb-0.5" alt="range" />
        <p className="text-center w-full truncate">{range}</p>
          </div>
        </div>
      </div>

      <style>{`
        .text-outline {
          text-shadow: 
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
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
    </div>
  );
};

export default ChampionCardHover;