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
  starLevel?: number;
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
  starLevel = 3,
}: ChampionCardHoverProps) => {
  return (
    <div className='absolute ml-[15rem] bg-gray-800 text-white rounded-md shadow-lg w-44 h-64 z-50 origin-top-left animate-grow-in'>
      <div className={`relative  border-2 rounded-t-md ${
      cost === 1 ? 'border-gray-400' : 
      cost === 2 ? 'border-green-500' : 
      cost === 3 ? 'border-blue-500' : 
      cost === 4 ? 'border-purple-700' : 
      cost === 5 ? 'border-yellow-400'
      : 'border-red-500'
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
          <div className="flex items-center gap-1 mb-1">
            <img src={`../assets/SET14/traits/${trait1}.png`} className="h-4 w-4" alt={trait1} />
            <p className="text-white text-xs">{trait1 || 'Trait 1'}</p>
          </div>
          {trait2 && (
            <div className="flex items-center gap-1 mb-1">
              <img src={`../assets/SET14/traits/${trait2}.png`} className="h-4 w-4" alt={trait2} />
              <p className="text-white text-xs">{trait2}</p>
            </div>
          )}
          {trait3 && (
            <div className="flex items-center gap-1">
              <img src={`../assets/SET14/traits/${trait3}.png`} className="h-4 w-4" alt={trait3} />
              <p className="text-white text-xs">{trait3}</p>
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
        <div className="relative h-3 mt-1 bg-gray-700 rounded inset-0">
          <div 
        className="absolute top-0 left-0 h-3 bg-green-600 rounded" 
        style={{ width: `${(currentHp / maxHp) * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
        {currentHp}/{maxHp}
          </div>
        </div>
        <div className="relative h-3 bg-gray-700 mt-1 rounded">
          <div 
        className="absolute top-0 left-0 h-3 bg-blue-600 rounded" 
        style={{ width: `${(mana / maxMana) * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
        {mana}/{maxMana}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-2 text-xs">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-gray-300">
          {/* Sections*/}
          <div className="flex items-center">
            <img src="../assets/icons/attack.png" className="h-3 w-3 inline mr-1" alt="attack" />
            <p>{attackDamage}</p>
          </div>
          <div className="flex items-center">
            <img src="../assets/icons/abilitypower.png" className="h-3 w-3 inline mr-1" alt="abilityPower" />
            <p>{abilityPower}</p>
          </div>
          <div className="flex items-center">
            <img src="../assets/icons/armor.png" className="h-3 w-3 inline mr-1" alt="armor" />
            <p>{armor}</p>
          </div>
          <div className="flex items-center">
            <img src="../assets/icons/magicresist.png" className="h-3 w-3 inline mr-1" alt="magicResist" />
            <p>{magicResist}</p>
          </div>
          <div className="flex items-center">
            <img src="../assets/icons/attackspeed.png" className="h-3 w-3 inline mr-1" alt="attackSpeed" />
            <p>{attackSpeed}</p>
          </div>
        </div>
      </div>

      <style tsx>{`
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
  )
}

export default ChampionCardHover