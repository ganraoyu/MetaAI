import { useTFTSetContext } from "../../../../../utilities/TFTSetContext";

interface ChampionHoverInfoProps {
  champion: string;
  cost: number;
  currentHp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  abilityName: string;
  abilityDescription: string;
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
}

export const ChampionHoverInfo = ({
  champion,
  cost,
  mana,
  maxMana,
  abilityName,
  abilityDescription,
  trait1,
  trait2,
  trait3,
}: ChampionHoverInfoProps) => {
  const { set } = useTFTSetContext();

  let imageAbilityName = abilityName.replace(/\s/g, '');

  if (abilityName.trim().split(/\s+/).length > 1) {
    imageAbilityName = abilityName.replace(/\s/g, '');
  }

  const borderColor =
    cost === 1 ? 'border-gray-400' :
    cost === 2 ? 'border-green-500' :
    cost === 3 ? 'border-blue-500' :
    cost === 4 ? 'border-purple-700' :
    cost === 5 ? 'border-yellow-500' :
    cost === 6 ? 'border-orange-500' :
    'border-red-500';

  return (
    <div className="absolute -top-[17rem] z-50  bg-hexCell text-white rounded-md w-64 origin-bottom animate-grow-in shadow-2xl shadow-gray-900">
      
      {/* Image with border and traits in bottom-left */}
      <div className={`relative border-2 rounded-t-md overflow-hidden ${borderColor}`}>
        <img 
          src={`../assets/${set}/champions/splash/${champion}.png`} 
          alt={champion}
          className="w-full h-36 object-cover"
        />

        {/* Traits */}
        <div className="absolute bottom-1 left-1 flex flex-col gap-0.5 p-2">
          {trait1 && (
            <div className="flex items-center gap-1">
              <img src={`../assets/${set}/traits/${trait1}.png`} className="h-4 w-4" alt={trait1} />
              <p className="text-white text-[0.8rem] text-outline">{trait1}</p>
            </div>
          )}
          {trait2 && (
            <div className="flex items-center gap-1">
              <img src={`../assets/${set}/traits/${trait2}.png`} className="h-4 w-4" alt={trait2} />
              <p className="text-white text-[0.8rem] text-outline">{trait2}</p>
            </div>
          )}
          {trait3 && (
            <div className="flex items-center gap-1">
              <img src={`../assets/${set}/traits/${trait3}.png`} className="h-4 w-4" alt={trait3} />
              <p className="text-white text-[0.8rem] text-outline">{trait3}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cost */}
      <div className={`absolute top-[8.1rem] right-0.5 rounded-tl-md px-1.5 text-white font-bold flex items-center gap-1 bg-gradient-to-r ${
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

      {/* Champion Ability Slot */}
      <div className="flex items-center justify-between p-2 bg-darkerHexCellComponents rounded-b-md">
        <div className="flex items-center gap-2">
          <img src={`../assets/${set}/abilities/${imageAbilityName}.png`} alt={abilityName} className="h-10 w-10"/>
          <p className="text-xs">{abilityName}</p>
        </div>
        <div className="flex items-end justify-center">
          <img src="../assets/icons/mana.png" className='h-3 w-3 mr-1'/>
          <p className="text-xs">{mana}/{maxMana}</p>
        </div>
      </div>

      {/* Ability Description */}
      <div>
        <p className="text-xs p-2 text-gray-300">
          {abilityDescription}
        </p>
        
      </div>

      {/* Style */}
      <style>{`
        .text-outline {
          text-shadow: 
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
        }
      `}</style>
    </div>
  );
};
