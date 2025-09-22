import { createContext, useContext, useState, ReactNode } from "react";
import { Cost, Rank } from "./types";

interface ChampionDataContextProps {
  rank: Rank[];
  setRank: React.Dispatch<React.SetStateAction<Rank[]>>;

  cost: Cost[];
  setCost: React.Dispatch<React.SetStateAction<Cost[]>>;

  table: boolean;
  setTable: React.Dispatch<React.SetStateAction<boolean>>;

  chart: boolean;
  setChart: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChampionDataContext = createContext<ChampionDataContextProps |  null>(null);

interface ChampionDataProviderProps {
  children: ReactNode;
};

export const ChampionDataProvider = ({ children }: ChampionDataProviderProps) => {
  const [rank, setRank] = useState<Rank[]>(["Master"]);
  const [cost, setCost] = useState<Cost[]>([]);
  const [table, setTable] = useState<boolean>(true);
  const [chart, setChart] = useState<boolean>(false);

  return (
    <ChampionDataContext.Provider value={{
      rank, 
      setRank, 
      cost, 
      setCost, 
      table, 
      setTable, 
      chart, 
      setChart
    }}>
      {children}
    </ChampionDataContext.Provider>
  )
};

export const useChampionDataContext = () => {
  const context = useContext(ChampionDataContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
};