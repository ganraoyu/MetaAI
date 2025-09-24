import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cost, Rank, ChampionData, ChampionDataContextProps } from "./types";

const ChampionDataContext = createContext<ChampionDataContextProps | null>(null);

interface ChampionDataProviderProps {
  children: ReactNode;
}

export const ChampionDataProvider = ({ children }: ChampionDataProviderProps) => {
  const [rank, setRank] = useState<Rank[]>(["Master"]);
  const [cost, setCost] = useState<Cost[]>([]);
  const [table, setTable] = useState<boolean>(true);
  const [chart, setChart] = useState<boolean>(false);
  const [championData, setChampionData] = useState<ChampionData[]>([]);

  // fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/statistics/challenger/champions"
        );
        setChampionData(response.data);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChampionDataContext.Provider value={{
      rank, 
      setRank, 
      cost, 
      setCost, 
      table, 
      setTable, 
      chart, 
      setChart,
      championData,
      setChampionData,
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
