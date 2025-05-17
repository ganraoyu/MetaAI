import { GiSwordClash, GiMagicSwirl, GiHealthNormal } from 'react-icons/gi';
import { FaFire } from 'react-icons/fa';
import { ImShield } from 'react-icons/im';

interface FilterProps {
  toggleAttack: boolean;
  toggleAbility: boolean;
  toggleHeal: boolean;
  toggleItemHeal: boolean;
  toggleMagicDamage: boolean;
  toggleBurn: boolean;
  setToggleAttack: (value: boolean) => void;
  setToggleAbility: (value: boolean) => void;
  setToggleHeal: (value: boolean) => void;
  setToggleItemHeal: (value: boolean) => void;
  setToggleMagicDamage: (value: boolean) => void;
  setToggleBurn: (value: boolean) => void;
}

export const Filter = ({
  toggleAttack,
  toggleAbility,
  toggleHeal,
  toggleItemHeal,
  toggleMagicDamage,
  toggleBurn,
  setToggleAttack,
  setToggleAbility,
  setToggleHeal,
  setToggleItemHeal,
  setToggleMagicDamage,
  setToggleBurn
}: FilterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      <button
        className={`relative h-10 w-10 rounded-md transition-all duration-300 ${
          toggleAttack 
            ? 'bg-gradient-to-br from-red-700 to-red-900 border-2 border-red-500 shadow-lg shadow-red-900/50' 
            : 'bg-gray-800 border-2 border-gray-700 opacity-60'
        }`}
        onClick={() => setToggleAttack(!toggleAttack)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <GiSwordClash 
            className={`text-2xl ${toggleAttack ? 'text-red-200' : 'text-gray-400'}`} 
          />
        </div>
        {toggleAttack && (
           <div className="absolute inset-0 rounded-md bg-red-400/20 animate-pulse"></div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 opacity-70"></div>
        <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-red-300">Attack</p>
      </button>
      
      <button
        className={`relative h-10 w-10 rounded-md transition-all duration-300 ${
          toggleAbility 
            ? 'bg-gradient-to-br from-blue-700 to-blue-900 border-2 border-blue-500 shadow-lg shadow-blue-900/50' 
            : 'bg-gray-800 border-2 border-gray-700 opacity-60'
        }`}
        onClick={() => setToggleAbility(!toggleAbility)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <GiMagicSwirl 
            className={`text-2xl ${toggleAbility ? 'text-blue-200' : 'text-gray-400'}`} 
          />
        </div>
        {toggleAbility && (
          <div className="absolute inset-0 rounded-md bg-blue-400/20 animate-pulse"></div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/80 to-blue-500/0 opacity-70"></div>
        <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-300">Ability</p>
      </button>
      
      <button
        className={`relative h-10 w-10 rounded-md transition-all duration-300 ${
          toggleHeal 
            ? 'bg-gradient-to-br from-green-700 to-green-900 border-2 border-green-500 shadow-lg shadow-green-900/50' 
            : 'bg-gray-800 border-2 border-gray-700 opacity-60'
        }`}
        onClick={() => setToggleHeal(!toggleHeal)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <GiHealthNormal 
            className={`text-2xl ${toggleHeal ? 'text-green-200' : 'text-gray-400'}`} 
          />
        </div>
        {toggleHeal && (
          <div className="absolute inset-0 rounded-md bg-green-400/20 animate-pulse"></div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500/80 to-green-500/0 opacity-70"></div>
        <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-300">Heal</p>
      </button>
      
      <button
        className={`relative h-10 w-10 rounded-md transition-all duration-300 ${
          toggleMagicDamage 
            ? 'bg-gradient-to-br from-purple-700 to-purple-900 border-2 border-purple-500 shadow-lg shadow-purple-900/50' 
            : 'bg-gray-800 border-2 border-gray-700 opacity-60'
        }`}
        onClick={() => setToggleMagicDamage(!toggleMagicDamage)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <ImShield 
            className={`text-2xl ${toggleMagicDamage ? 'text-purple-200' : 'text-gray-400'}`} 
          />
        </div>
        {toggleMagicDamage && (
          <div className="absolute inset-0 rounded-md bg-purple-400/20 animate-pulse"></div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 opacity-70"></div>
        <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-purple-300">Magic</p>
      </button>
      
      <button
        className={`relative h-10 w-10 rounded-md transition-all duration-300 ${
          toggleBurn 
            ? 'bg-gradient-to-br from-orange-700 to-orange-900 border-2 border-orange-500 shadow-lg shadow-orange-900/50' 
            : 'bg-gray-800 border-2 border-gray-700 opacity-60'
        }`}
        onClick={() => setToggleBurn(!toggleBurn)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <FaFire 
            className={`text-2xl ${toggleBurn ? 'text-orange-200' : 'text-gray-400'}`} 
          />
        </div>
        {toggleBurn && (
          <div className="absolute inset-0 rounded-md bg-orange-400/20 animate-pulse"></div>
        )}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/80 to-orange-500/0 opacity-70"></div>
        <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-orange-300">Burn</p>
      </button>
    </div>
  );
};

