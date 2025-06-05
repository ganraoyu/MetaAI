import { useEffect, useState, RefObject } from 'react';
import { useTFTSetContext } from '../../../../../utilities/TFTSetContext';

import { combinedItems } from '../../data/item-data';
import { ItemHover } from './SlotHover/ItemSlotHover';
import { abilityData } from '../../data/SET13/ability-data.ts';
import { AbilitySlotHover } from './SlotHover/AbilitySlotHover';

interface ItemData {
  name: string;
  description: string;
  image: string;
  additionalAttackSpeed?: number;
  additionalAbilityPower?: number;
  additionalAttackDamage?: number;
  additionalHealth?: number;
  additionalPercentageHealth?: number;
  additionalArmor?: number;
  additionalMagicResist?: number;
  additionalStartingMana?: number;
  additionalManaPerAttack?: number;
  additionalCritChance?: number;
  additionalDamageAmp?: number;
  attackSpeedStacking?: boolean;
  additionalAttackSpeedPerStack?: number;
  abilityPowerStacking?: boolean;
  abilityPowerStackInterval?: number;
  additionalAbilityPowerPerStack?: number;
  abilityCritStrike?: boolean;
  shield?: boolean;
  shieldAmount?: number;
  shieldDuration?: number;
  omnivamp?: number;
  heal?: boolean;
  healAmount?: number;
  reduction?: boolean;
  reductionAmount?: number;
  externalMagicDamage?: number;
  sunder?: boolean;
  sunderRadius?: number;
  shred?: boolean;
  burn?: boolean;
  wound?: boolean;
}

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
  cost,
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
  starLevel,
  parentRef
}: ChampionCardHoverProps) => {
  const { set } = useTFTSetContext();

  const [toggleChampionItemHover, setToggleChampionItemHover] = useState(true);
  const [abilityHover, setAbilityHover] = useState(false);
  const [item1Hover, setItem1Hover] = useState(false);
  const [item2Hover, setItem2Hover] = useState(false);
  const [item3Hover, setItem3Hover] = useState(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const item1Data = combinedItems.find(item => item.name === item1);
  const item2Data = combinedItems.find(item => item.name === item2);
  const item3Data = combinedItems.find(item => item.name === item3); 

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
      className='fixed bg-gray-800 text-white rounded-md w-44 h-78 z-50 origin-top-left animate-grow-in shadow-2xl shadow-gray-900'
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
          src={`../assets/${set}/champions/splash/${champion}.png`} 
          alt={champion}
          className="rounded-t-md w-full h-24 object-cover"
        />

        {/* Star level */}
        <div className="absolute top-2 left-2 flex space-x-1">
          {[1, 2, 3].map((star) => (
            <svg 
              key={star}
              className={`w-3.5 h-3.5 ${star <= (starLevel || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 fill-gray-600'}`}
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
              <img src={`../assets/${set}/traits/${trait1}.png`} className="h-4 w-4" alt={trait1} />
              <p className="text-white text-[0.7rem] text-outline">{trait1}</p>
            </div>
          )}
          {trait2 && (
            <div className="flex items-center gap-1 mb-1">
              <img src={`../assets/${set}/traits/${trait2}.png`} className="h-4 w-4" alt={trait2} />
              <p className="text-white text-[0.7rem] text-outline">{trait2}</p>
            </div>
          )}
          {trait3 && (
            <div className="flex items-center gap-1">
              <img src={`../assets/${set}/traits/${trait3}.png`} className="h-4 w-4" alt={trait3} />
              <p className="text-white text-[0.7rem] text-outline">{trait3}</p>
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

      {/* Champion Ability/Items Slots */}
      <div className="flex justify-center gap-2 mt-3">
        <div onMouseEnter={() => setAbilityHover(true)} onMouseLeave={() => setAbilityHover(false)}>
        {champion ? (
          <img 
          // Use the abilityData to find the champion's ability image
            src={abilityData.find(ability => ability.name === champion)?.image} 
            alt={`${champion} ability`} 
            className="h-8 w-8 border-2 border-gray-700" 
          />
          ) : (
            <div className='border-2 h-8 w-8 border-gray-700'></div>
        )}
        </div>
        <div onMouseEnter={() => setItem1Hover(true)} onMouseLeave={() => setItem1Hover(false)}>
          {item1 ? (
            <img
              src={combinedItems.find(item => item.name === item1)?.image}
              alt={item1}
              className="h-8 w-8 border-2 border-gray-700"
            />
          ) : <div className='border-2 h-8 w-8 border-gray-700'></div>}
        </div>
        <div onMouseEnter={() => setItem2Hover(true)} onMouseLeave={() => setItem2Hover(false)}>
          {item2 ? (
            <img
              src={combinedItems.find(item => item.name === item2)?.image}
              alt={item2}
              className="h-8 w-8 border-2 border-gray-700"
            />
          ) : <div className='border-2 h-8 w-8 border-gray-700'></div>}
        </div>
        <div onMouseEnter={() => setItem3Hover(true)} onMouseLeave={() => setItem3Hover(false)}>
          {item3 ? (
            <img
              src={combinedItems.find(item => item.name === item3)?.image}
              alt={item3}
              className="h-8 w-8 border-2 border-gray-700"
            />
          ) : <div className='border-2 h-8 w-8 border-gray-700'></div>}
        </div>
      </div>

      {/* Item Hovers */}
      {abilityHover && champion && (
        <AbilitySlotHover 
          name={champion}
          ability={abilityData[champion]?.ability}
          description={abilityData[champion]?.description}
        />
      )}
      {item1Hover && item1 && (
        <ItemHover 
          name={item1 || ''}
          description={item1Data?.description || ''}
          components={item1Data?.components || []}
          componentsImages={item1Data?.componentsImages || []}
          image={item1Data?.image || ''}
          additionalAttackSpeed={item1Data?.additionalAttackSpeed || 0}
          additionalAbilityPower={item1Data?.additionalAbilityPower || 0}
          additionalAttackDamage={item1Data?.additionalAttackDamage || 0}
          additionalHealth={item1Data?.additionalHealth || 0}
          additionalPercentageHealth={item1Data?.additionalPercentageHealth || 0}
          additionalArmor={item1Data?.additionalArmor || 0}
          additionalMagicResist={item1Data?.additionalMagicResist || 0}
          additionalStartingMana={item1Data?.additionalStartingMana || 0}
          additionalManaPerAttack={item1Data?.additionalManaPerAttack || 0}
          additionalCritChance={item1Data?.additionalCritChance || 0}
          additionalDamageAmp={item1Data?.additionalDamageAmp || 0}
          attackSpeedStacking={item1Data?.attackSpeedStacking || false}
          additionalAttackSpeedPerStack={item1Data?.additionalAttackSpeedPerStack || 0}
          abilityPowerStacking={item1Data?.abilityPowerStacking || false}
          abilityPowerStackInterval={item1Data?.abilityPowerStackInterval || 0}
          additionalAbilityPowerPerStack={item1Data?.additionalAbilityPowerPerStack || 0}
          abilityCritStrike={item1Data?.abilityCritStrike || false}
          shield={item1Data?.shield || false}
          shieldAmount={item1Data?.shieldAmount || 0}
          shieldDuration={item1Data?.shieldDuration || 0}
          omnivamp={item1Data?.omnivamp || 0}
          heal={item1Data?.heal || false}
          healAmount={item1Data?.healAmount || 0}
          reduction={item1Data?.reduction || false}
          reductionAmount={item1Data?.reductionAmount || 0}
          externalMagicDamage={item1Data?.externalMagicDamage || 0}
          sunder={item1Data?.sunder || false}
          sunderRadius={item1Data?.sunderRadius || 0}
          shred={item1Data?.shred || false}
          burn={item1Data?.burn || false}
          wound={item1Data?.wound || false}
        />
      )}
      {item2Hover && item2 && (
        <ItemHover 
          name={item2 || ''}
          description={item2Data?.description || ''}
          components={item2Data?.components || []}
          componentsImages={item2Data?.componentsImages || []}
          image={item2Data?.image || ''}
          additionalAttackSpeed={item2Data?.additionalAttackSpeed || 0}
          additionalAbilityPower={item2Data?.additionalAbilityPower || 0}
          additionalAttackDamage={item2Data?.additionalAttackDamage || 0}
          additionalHealth={item2Data?.additionalHealth || 0}
          additionalPercentageHealth={item2Data?.additionalPercentageHealth || 0}
          additionalArmor={item2Data?.additionalArmor || 0}
          additionalMagicResist={item2Data?.additionalMagicResist || 0}
          additionalStartingMana={item2Data?.additionalStartingMana || 0}
          additionalManaPerAttack={item2Data?.additionalManaPerAttack || 0}
          additionalCritChance={item2Data?.additionalCritChance || 0}
          additionalDamageAmp={item2Data?.additionalDamageAmp || 0}
          attackSpeedStacking={item2Data?.attackSpeedStacking || false}
          additionalAttackSpeedPerStack={item2Data?.additionalAttackSpeedPerStack || 0}
          abilityPowerStacking={item2Data?.abilityPowerStacking || false}
          abilityPowerStackInterval={item2Data?.abilityPowerStackInterval || 0}
          additionalAbilityPowerPerStack={item2Data?.additionalAbilityPowerPerStack || 0}
          abilityCritStrike={item2Data?.abilityCritStrike || false}
          shield={item2Data?.shield || false}
          shieldAmount={item2Data?.shieldAmount || 0}
          shieldDuration={item2Data?.shieldDuration || 0}
          omnivamp={item2Data?.omnivamp || 0}
          heal={item2Data?.heal || false}
          healAmount={item2Data?.healAmount || 0}
          reduction={item2Data?.reduction || false}
          reductionAmount={item2Data?.reductionAmount || 0}
          externalMagicDamage={item2Data?.externalMagicDamage || 0}
          sunder={item2Data?.sunder || false}
          sunderRadius={item2Data?.sunderRadius || 0}
          shred={item2Data?.shred || false}
          burn={item2Data?.burn || false}
          wound={item2Data?.wound || false}
        />
      )}
      {item3Hover && item3 && (
        <ItemHover 
          name={item3 || ''}
          description={item3Data?.description || ''}
          components={item3Data?.components || []}
          componentsImages={item3Data?.componentsImages || []}
          image={item3Data?.image || ''}
          additionalAttackSpeed={item3Data?.additionalAttackSpeed || 0}
          additionalAbilityPower={item3Data?.additionalAbilityPower || 0}
          additionalAttackDamage={item3Data?.additionalAttackDamage || 0}
          additionalHealth={item3Data?.additionalHealth || 0}
          additionalPercentageHealth={item3Data?.additionalPercentageHealth || 0}
          additionalArmor={item3Data?.additionalArmor || 0}
          additionalMagicResist={item3Data?.additionalMagicResist || 0}
          additionalStartingMana={item3Data?.additionalStartingMana || 0}
          additionalManaPerAttack={item3Data?.additionalManaPerAttack || 0}
          additionalCritChance={item3Data?.additionalCritChance || 0}
          additionalDamageAmp={item3Data?.additionalDamageAmp || 0}
          attackSpeedStacking={item3Data?.attackSpeedStacking || false}
          additionalAttackSpeedPerStack={item3Data?.additionalAttackSpeedPerStack || 0}
          abilityPowerStacking={item3Data?.abilityPowerStacking || false}
          abilityPowerStackInterval={item3Data?.abilityPowerStackInterval || 0}
          additionalAbilityPowerPerStack={item3Data?.additionalAbilityPowerPerStack || 0}
          abilityCritStrike={item3Data?.abilityCritStrike || false}
          shield={item3Data?.shield || false}
          shieldAmount={item3Data?.shieldAmount || 0}
          shieldDuration={item3Data?.shieldDuration || 0}
          omnivamp={item3Data?.omnivamp || 0}
          heal={item3Data?.heal || false}
          healAmount={item3Data?.healAmount || 0}
          reduction={item3Data?.reduction || false}
          reductionAmount={item3Data?.reductionAmount || 0}
          externalMagicDamage={item3Data?.externalMagicDamage || 0}
          sunder={item3Data?.sunder || false}
          sunderRadius={item3Data?.sunderRadius || 0}
          shred={item3Data?.shred || false}
          burn={item3Data?.burn || false}
          wound={item3Data?.wound || false}
        />
      )}

      {/* Stats */}
      <div className="px-2 py-3 text-[0.7rem]">
        <div className="grid grid-cols-5 gap-0.5 text-gray-300">
          {/* First row of stats */}
          <div className="flex flex-col items-center">
        <img src="../assets/icons/attack.png" className="h-4 w-4 mb-0.5" alt="attack" />
        <p className="text-center w-full truncate">{Math.round(attackDamage) || 0}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/abilitypower.png" className="h-4 w-4 mb-0.5" alt="abilityPower" />
        <p className="text-center w-full truncate">{Math.round(abilityPower) || 0}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/armor.png" className="h-4 w-4 mb-0.5" alt="armor" />
        <p className="text-center w-full truncate">{Math.round(armor) || 0}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/magicresist.png" className="h-4 w-4 mb-0.5" alt="magicResist" />
        <p className="text-center w-full truncate">{Math.round(magicResist) || 0}</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/attackspeed.png" className="h-4 w-4 mb-0.5" alt="attackSpeed" />
        <p className="text-center w-full truncate">{attackSpeed.toFixed(2) || 0}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-0.5 text-gray-300 mt-1">
          {/* Second row of stats */}
          <div className="flex flex-col items-center">
        <img src="../assets/icons/criticalstrikechance.png" className="h-4 w-4 mb-0.5" alt="criticalstrikechance" />
        <p className="text-center w-full truncate">{critChance || 0}%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/criticaldamage.svg" className="h-4 w-4 mb-0.5" alt="critDamage" />
        <p className="text-center w-full truncate">{critDamage || 0}0%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/omnivamp.png" className="h-4 w-4 mb-0.5" alt="omnivamp" />
        <p className="text-center w-full truncate">{Math.round(omnivamp) || 0}%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/damageamp.png" className="h-4 w-4 mb-0.5" alt="damageAmp" />
        <p className="text-center w-full truncate">{Math.round(damageAmp) || 0}%</p>
          </div>
          <div className="flex flex-col items-center">
        <img src="../assets/icons/range.png" className="h-4 w-4 mb-0.5" alt="range" />
        <p className="text-center w-full truncate">{Math.round(range) || 0}</p>
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
        
        @keyframes growOut {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.6);
            opacity: 0;
          }
        }
        .animate-grow-in {
          animation: growIn 0.2s ease-out forwards;
        }
        
        .animate-grow-out {
          animation: growOut 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChampionCardHover;