interface ToggleAbilityStatsSwitchProps {
  toggleAbilityStatsSwitch: boolean;
  setToggleAbilityStatsSwitch: (toggle: boolean) => void;
}

export const ToggleAbilityStatsSwitch = ({
  toggleAbilityStatsSwitch,
  setToggleAbilityStatsSwitch,
}: ToggleAbilityStatsSwitchProps) => {
  return (
    <div className="flex flex-col items-center mb-2 bg-hexCel">
      <div className="relative flex w-full">
        
        {/* Ability Button */}        
        <button
          onClick={() => setToggleAbilityStatsSwitch(false)}
          className={`py-2 flex-1 text-center transition-colors duration-200
            ${!toggleAbilityStatsSwitch ? 'text-yellow-400' : 'text-gray-300'}
            bg-[#1e1924] hover:bg-[#3b3738] active:bg-[#4e4a4b]`}
        >
          Stats
        </button>

        <button
          onClick={() => setToggleAbilityStatsSwitch(true)}
          className={`py-2 flex-1 text-center transition-colors duration-200
            ${toggleAbilityStatsSwitch ? 'text-yellow-400' : 'text-gray-300'}
            bg-[#1e1924] hover:bg-[#3b3738] active:bg-[#4e4a4b]`}
        >
          Ability
        </button>

        {/* Underline */}
        <div className="absolute bottom-0 h-[0.15rem] w-full flex">
          <div
            className={`h-full bg-yellow-400 transition-all duration-300 rounded-full ${
              toggleAbilityStatsSwitch ? 'flex-1 ml-[50%]' : 'flex-1 mr-[50%]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
