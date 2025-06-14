import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { AbilityInfo } from "./AbilityInfo";
import { ChampionImage } from "./ChampionImage";

interface ChampionHoverInfoProps {
  champion: string;
  cost: number;
  currentHp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  abilityName: string;
  abilityDescription: string;
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
  currentHp,
  maxHp,
  mana,
  maxMana,
  abilityName,
  abilityDescription,
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

      <ChampionImage
        set={set}
        champion={champion}
        trait1={trait1}
        trait2={trait2}
        trait3={trait3}
        cost={cost}
        borderColor={borderColor}
      />

      <AbilityInfo
        set={set}
        imageAbilityName={imageAbilityName}
        abilityName={abilityName}
        abilityDescription={abilityDescription}
        mana={mana}
        maxMana={maxMana}
      />

      {/* Outline text utility */}
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
