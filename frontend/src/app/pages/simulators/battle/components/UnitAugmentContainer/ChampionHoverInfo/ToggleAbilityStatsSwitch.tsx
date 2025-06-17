import { useChampionHoverInfoContext } from "./ChampoinHoverInfoContext"


interface ToggleAbilityStatsSwitchProps {
  toggleAbilityStatsSwitch: boolean;
  setToggleAbilityStatsSwitch: (toggle: boolean) => void;
}

export const ToggleAbilityStatsSwitch = ({toggleAbilityStatsSwitch, setToggleAbilityStatsSwitch }: ToggleAbilityStatsSwitchProps) => {
  return (
    <div>
        <button onClick={() => setToggleAbilityStatsSwitch(!toggleAbilityStatsSwitch)}>
          {toggleAbilityStatsSwitch ? "Hide Ability Stats" : "Show Ability Stats"}
        </button>
    </div>
  )
}

