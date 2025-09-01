import { useState, useRef } from 'react';
import { useTFTSetContext } from '../../../../../utilities/TFTSetContext';
import ChampionCardHover from './ChampionCardHover';
import { ChampionCardProps } from './types';

export const ChampionCard = ({
  champion = '',
  cost = 6,
  currentHp = 0,
  maxHp = 0,
  mana = 0,
  maxMana = 0,
  shield = 0,
  trait1 = '',
  trait2 = '',
  trait3 = '',
  item1 = '',
  item2 = '',
  item3 = '',
  armor = 0,
  magicResist = 0,
  attackDamage = 0,
  attackSpeed = 0,
  critChance = 0,
  critDamage = 0,
  abilityPower = 0,
  damageAmp = 0,
  omnivamp = 0,
  reduction = 0,
  range = 0,
  starLevel = 1,
}: ChampionCardProps) => {
  const { set } = useTFTSetContext();
  const [toggleChampionCardHover, setToggleChampionCardHover] = useState(false);
  const [clickChampionCardHover, setClickChampionCardHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const hpPercentage = (currentHp / maxHp) * 100;
  const hpColor =
    hpPercentage > 60 ? 'bg-green-500' : hpPercentage > 30 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center rounded-md relative cursor-pointer w-14 h-20"
      onMouseEnter={() => {
        if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
        setToggleChampionCardHover(true);
      }}
      onMouseLeave={() => {
        leaveTimeout.current = setTimeout(() => setToggleChampionCardHover(false), 50);
      }}
      onClick={() => setClickChampionCardHover(!clickChampionCardHover)}
    >
      <div className="flex flex-col items-center">
        {/* Champion Image */}
        <div className="relative w-10 h-10">
          <img
            src={`../assets/${set}/champions/centered/${champion}.png`}
            alt={champion}
            className="w-full h-full rounded-full border-2 border-gray-600 object-cover"
          />
        </div>

        {/* HP Bar */}
        <div className="w-10 bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full ${hpColor} transition-all duration-300`}
            style={{ width: `${hpPercentage}%` }}
          />
        </div>

        {/* HP Text */}
        <div className="text-[0.65rem] text-white font-semibold text-center w-full">
          {Math.round(currentHp)}/{Math.round(maxHp)}
        </div>
      </div>

      {(toggleChampionCardHover || clickChampionCardHover) && cardRef.current && (
        <ChampionCardHover
          champion={champion}
          trait1={trait1}
          trait2={trait2}
          trait3={trait3}
          item1={item1}
          item2={item2}
          item3={item3}
          cost={cost}
          currentHp={Math.round(currentHp)}
          maxHp={Math.round(maxHp)}
          mana={mana}
          maxMana={maxMana}
          shield={shield}
          armor={armor}
          magicResist={magicResist}
          attackDamage={attackDamage}
          attackSpeed={attackSpeed}
          critChance={critChance}
          critDamage={critDamage}
          abilityPower={abilityPower}
          damageAmp={damageAmp}
          omnivamp={omnivamp}
          reduction={reduction}
          range={range}
          starLevel={starLevel}
          parentRef={cardRef}
        />
      )}

      <style>{`
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
        .animate-grow-out {
          animation: growOut 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChampionCard;
