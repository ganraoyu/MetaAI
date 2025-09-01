import { useState, createContext, useContext, ReactNode } from 'react';
import { BattleStatsContainerType } from './types';

const BattleStatsContext = createContext<BattleStatsContainerType | undefined>(undefined);

export const useBattleStatsContext = () => {
  const context = useContext(BattleStatsContext);
  if (!context) {
    throw new Error('useBattleStatsContext must be used within a BattleStatsProvider');
  }
  return context;
};

type BattleStatsProviderProps = {
  children: ReactNode;
};

export const BattleStatsProvider = ({ children }: BattleStatsProviderProps) => {
  const [toggleTraits, setToggleTraits] = useState<boolean>(true);
  const [toggleBattleEndStats, setToggleBattleEndStats] = useState<boolean>(false);

  return (
    <BattleStatsContext.Provider
      value={{
        toggleTraits,
        setToggleTraits,
        toggleBattleEndStats,
        setToggleBattleEndStats,
      }}
    >
      {children}
    </BattleStatsContext.Provider>
  );
};
