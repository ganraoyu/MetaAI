import { ChampionStatsGridProps } from './types';

export const ChampionStatsGrid = ({
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
}: ChampionStatsGridProps) => {
  return (
    <div className="px-2 py-3 text-[0.7rem]">
      <div className="grid grid-cols-5 gap-0.5 text-gray-300">
        {/* First row of stats */}
        <div className="flex flex-col items-center">
          <img src="../assets/icons/attack.png" className="h-4 w-4 mb-0.5" alt="attack" />
          <p className="text-center w-full truncate">{Math.round(attackDamage || 0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="../assets/icons/abilitypower.png"
            className="h-4 w-4 mb-0.5"
            alt="abilityPower"
          />
          <p className="text-center w-full truncate">{Math.round(abilityPower || 0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/icons/armor.png" className="h-4 w-4 mb-0.5" alt="armor" />
          <p className="text-center w-full truncate">{Math.round(armor || 0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/icons/magicresist.png" className="h-4 w-4 mb-0.5" alt="magicResist" />
          <p className="text-center w-full truncate">{Math.round(magicResist || 0)}</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/icons/attackspeed.png" className="h-4 w-4 mb-0.5" alt="attackSpeed" />
          <p className="text-center w-full truncate">{attackSpeed?.toFixed(2) || 0}</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-0.5 text-gray-300 mt-1">
        {/* Second row of stats */}
        <div className="flex flex-col items-center">
          <img
            src="../assets/icons/criticalstrikechance.png"
            className="h-4 w-4 mb-0.5"
            alt="criticalstrikechance"
          />
          <p className="text-center w-full truncate">{critChance || 0}%</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="../assets/icons/criticaldamage.svg"
            className="h-4 w-4 mb-0.5"
            alt="critDamage"
          />
          <p className="text-center w-full truncate">{critDamage || 0}0%</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/icons/omnivamp.png" className="h-4 w-4 mb-0.5" alt="omnivamp" />
          <p className="text-center w-full truncate">{Math.round(omnivamp || 0)}%</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/icons/damageamp.png" className="h-4 w-4 mb-0.5" alt="damageAmp" />
          <p className="text-center w-full truncate">{Math.round(damageAmp || 0)}%</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="../assets/icons/range.png" className="h-4 w-4 mb-0.5" alt="range" />
          <p className="text-center w-full truncate">{Math.round(range || 0)}</p>
        </div>
      </div>
    </div>
  );
};

export default ChampionStatsGrid;
