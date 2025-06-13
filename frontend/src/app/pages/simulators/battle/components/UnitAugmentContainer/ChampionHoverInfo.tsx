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

  const imageAbilityName = abilityName.replace(/\s/g, "");

  const borderColor =
    cost === 1 ? "border-gray-400" :
    cost === 2 ? "border-green-500" :
    cost === 3 ? "border-blue-500" :
    cost === 4 ? "border-purple-700" :
    cost === 5 ? "border-yellow-500" :
    cost === 6 ? "border-orange-500" :
    "border-red-500";

  return (
    <div className="absolute z-50 bg-hexCell text-white rounded-md w-[16rem] origin-bottom animate-grow-in shadow-2xl shadow-gray-900 -top-[17rem]">

      {/* Image with border and traits in bottom-left */}
      <div className={`relative border-2 rounded-t-md overflow-hidden ${borderColor}`}>
        <img
          src={`../assets/${set}/champions/splash/${champion}.png`}
          alt={champion}
          className="w-full h-[9rem] object-cover"
        />

        {/* Traits */}
        <div className="absolute bottom-[0.25rem] left-[0.25rem] flex flex-col gap-[0.125rem] p-[0.5rem]">
          {[trait1, trait2, trait3].map(
            (trait, i) =>
              trait && (
                <div key={i} className="flex items-center gap-[0.25rem]">
                  <img src={`../assets/${set}/traits/${trait}.png`} className="h-[1rem] w-[1rem]" alt={trait} />
                  <p className="text-white text-[0.8rem] text-outline">{trait}</p>
                </div>
              )
          )}
        </div>
      </div>

      {/* Cost */}
      <div className={`absolute top-[8.1rem] right-[0.125rem] rounded-tl-md px-[0.375rem] font-bold flex items-center gap-[0.25rem] text-white text-xs bg-gradient-to-r ${
        cost === 1 ? "from-gray-600 to-gray-400" :
        cost === 2 ? "from-green-700 to-green-500" :
        cost === 3 ? "from-blue-700 to-blue-500" :
        cost === 4 ? "from-purple-900 to-purple-400" :
        cost === 5 ? "from-yellow-600 to-yellow-400" :
        "from-red-700 to-red-500"
      }`}>
        <img src="../assets/icons/coin.png" className="h-[0.5rem] w-[0.5rem]" />
        <p className="text-outline">{cost || 1}</p>
      </div>

      {/* Champion Ability Slot */}
      <div className="flex items-center justify-between p-[0.5rem] bg-darkerHexCellComponents rounded-b-md">
        <div className="flex items-center gap-[0.5rem]">
          <img src={`../assets/${set}/abilities/${imageAbilityName}.png`} alt={abilityName} className="h-[2.5rem] w-[2.5rem]" />
          <p className="text-[0.75rem]">{abilityName}</p>
        </div>
        <div className="flex items-center justify-center">
          <img src="../assets/icons/mana.png" className="h-[0.75rem] w-[0.75rem] mr-[0.25rem]" />
          <p className="text-[0.75rem]">{mana}/{maxMana}</p>
        </div>
      </div>

      {/* Ability Description */}
      <div>
        <p className="text-[0.75rem] p-[0.5rem] text-gray-300">{abilityDescription}</p>
      </div>

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
