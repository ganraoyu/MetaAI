import { useState, ReactNode, useContext, createContext } from 'react';

interface ChampionHoverInfoContextType {
  toggleAbilityStatsSwitch: boolean;
  setToggleAbilityStatsSwitch: (toggle: boolean) => void;
}

const ChampionHoverInfoContext = createContext<ChampionHoverInfoContextType | undefined>(undefined);

interface ChampionHoverInfoProviderProps {
  children: ReactNode;
}

export const ChampionHoverInfoProvider = ({ children }: ChampionHoverInfoProviderProps) => {
  const [toggleAbilityStatsSwitch, setToggleAbilityStatsSwitch] = useState<boolean>(false);

  return (
    <ChampionHoverInfoContext.Provider
      value={{ toggleAbilityStatsSwitch, setToggleAbilityStatsSwitch }}
    >
      {children}
    </ChampionHoverInfoContext.Provider>
  );
};

export const useChampionHoverInfoContext = () => {
  const context = useContext(ChampionHoverInfoContext);
  if (!context) {
    throw new Error('useChampionHoverInfoContext must be used within a ChampionHoverInfoProvider');
  }
  return context;
};
