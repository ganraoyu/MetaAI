interface AbilityInfoProps {
  set: string;
  imageAbilityName: string;
  abilityName: string;
  abilityDescription: string;
  mana: number;
  maxMana: number;
}

export const AbilityInfo = ({
  set,
  imageAbilityName,
  abilityName,
  abilityDescription,
  mana,
  maxMana,
}: AbilityInfoProps) => {
  return (
    <div>
      {/* Ability Info */}
      <div className="flex items-center justify-between p-[0.5rem] bg-[#161616] rounded-b-md">
        <div className="flex items-center gap-[0.5rem]">
          <img
            src={`../assets/${set}/abilities/${imageAbilityName}.png`}
            alt={abilityName}
            className="h-[2.5rem] w-[2.5rem]"
          />
          <p className="text-[0.75rem]">{abilityName}</p>
        </div>
        <div className="flex items-center justify-center">
          <img src="../assets/icons/mana.png" className="h-[0.75rem] w-[0.75rem] mr-[0.25rem]" />
          <p className="text-[0.75rem]">
            {mana}/{maxMana}
          </p>
        </div>
      </div>

      {/* Ability Description */}
      <div>
        <p className="text-[0.75rem] p-[0.5rem] text-gray-300">{abilityDescription}</p>
      </div>
    </div>
  );
};
