import { useState } from 'react';
import ChampionCardHover from './ChampionCardHover.tsx';

interface ChampionCardProps {
  champion: string;
  cost: number;
  currentHp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  shield: number;
  armor: number;
  magicResist: number;
  attackDamage: number;
  attackSpeed: number;
  critChance: number;
  critDamage: number;
  abilityPower: number;
  damageAmp: number;
  reduction: number;
  range: number;
}

export const ChampionCard = ({
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
  armor,
  magicResist,
  attackDamage,
  attackSpeed,
  critChance,
  critDamage,
  abilityPower,
  damageAmp,
  reduction,
  range,
}: ChampionCardProps) => {
  const [toggleChampionCardHover, setToggleChampionCardHover] = useState(false);

  const hpPercentage = (currentHp / maxHp) * 100;
  const hpColor = hpPercentage > 60 ? 'bg-green-500' : 
          hpPercentage > 30 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div 
      className="flex flex-col items-center rounded-md" 
      onMouseEnter={() => setToggleChampionCardHover(true)} 
      onMouseLeave={() => setToggleChampionCardHover(false)}
    >
      <div className="relative">
        <img 
          src={`../assets/SET14/champions/centered/${champion}.png`} 
          alt={champion}
          className="w-10 h-10 rounded-full border-2 border-gray-600"
        />
        <div className="absolute bottom-0 w-full px-1">
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${hpColor} transition-all duration-300`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>
      </div>
      <div className="text-[0.7rem] text-white mt-1 font-semibold">
        {currentHp}/{maxHp}
      </div>
      {toggleChampionCardHover && 
        <ChampionCardHover 
        champion={champion} 
        trait1={trait1}
        trait2={trait2}
        trait3={trait3}
        cost={cost}
        currentHp={currentHp}
        maxHp={maxHp}
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
        reduction={reduction}
        range={range}
      />}
    </div>
  );
};