import { createContext, useContext, useState, ReactNode } from "react";
import { Rank } from "./types";

interface ChampionDataContextProps {
  rank: Rank[];
  setRank: React.Dispatch<React.SetStateAction<Rank[]>>;
};

const ChampionDataContext = createContext<ChampionDataContextProps |  null>(null);

interface ChampionDataProviderProps {
  children: ReactNode;
};

export const ChampionDataProvider = ({ children }: ChampionDataProviderProps) => {
  const [rank, setRank] = useState<Rank[]>(["Master"]);

  return (
    <ChampionDataContext.Provider value={{rank, setRank}}>
      {children}
    </ChampionDataContext.Provider>
  )
};

export const useChampionDataContext = () => {
  const context = useContext(ChampionDataContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
};