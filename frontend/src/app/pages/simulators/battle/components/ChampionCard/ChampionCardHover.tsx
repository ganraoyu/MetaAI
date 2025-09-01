import { useState, useLayoutEffect } from 'react';
import { ChampionImage } from './ChampionCardHover/ChampionImage.tsx';
import { ChampionStatBars } from './ChampionCardHover/ChampionStatBars.tsx';
import { ChampionCardHoverProvider } from './ChampionCardHover/ChampionCardHoverContext.tsx';
import { ChampionCardHoverProps } from './types.ts';
import { ChampionAbilitySlot } from './ChampionCardHover/ChampionAbilitySlot.tsx';
import { ChampionItemsSlot } from './ChampionCardHover/ChampionItemsSlot.tsx';
import ChampionStatsGrid from './ChampionCardHover/ChampionStatsGrid.tsx';

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
  parentRef,
}: ChampionCardHoverProps) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!parentRef.current) return;

    const viewportWidth = window.innerWidth;

    const calculatePosition = () => {
      const rect = parentRef.current?.getBoundingClientRect();
      if (!rect) return; // extra guard
      let left = rect.right + 10;
      if (left + 180 > viewportWidth) left = rect.left - 180;
      setPosition({ top: rect.top, left: Math.max(10, left) });
    };

    calculatePosition(); // initial position

    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [parentRef]);

  return (
    <ChampionCardHoverProvider>
      <div
        className="fixed bg-[#1e1e1e] text-white rounded-md w-44 h-78 z-50 origin-top-left animate-grow-in border border-[#464646] shadow-md shadow-gray-700/50"
        style={{
          top: position?.top ?? 0, // use 0 if position is null
          left: position?.left ?? 0, // use 0 if position is null
        }}
      >
        {/* Champion Image and Traits */}
        <ChampionImage
          champion={champion}
          cost={cost || 0}
          starLevel={starLevel || 1}
          trait1={trait1}
          trait2={trait2}
          trait3={trait3}
        />

        {/* Champion Stats */}
        <ChampionStatBars
          currentHp={currentHp || 0}
          maxHp={maxHp || 0}
          shield={shield || 0}
          mana={mana || 0}
          maxMana={maxMana || 0}
        />

        {/* Champion Ability/Items Slots */}
        <div className="flex justify-center gap-2 mt-3">
          <ChampionAbilitySlot champion={champion} />
          <ChampionItemsSlot item1={item1} item2={item2} item3={item3} />
        </div>

        {/* Stats */}
        <ChampionStatsGrid
          armor={armor || 0}
          magicResist={magicResist || 0}
          attackDamage={attackDamage || 0}
          attackSpeed={attackSpeed || 0}
          critChance={critChance || 0}
          critDamage={critDamage || 0}
          abilityPower={abilityPower || 0}
          damageAmp={damageAmp || 0}
          omnivamp={omnivamp || 0}
          reduction={reduction || 0}
          range={range || 0}
        />

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
    </ChampionCardHoverProvider>
  );
};

export default ChampionCardHover;
