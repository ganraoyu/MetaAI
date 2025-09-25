import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cost, Rank, ChampionData, ChampionDataContextProps, ChampionStatsWithTotalGames } from "./types";

const ChampionDataContext = createContext<ChampionDataContextProps | null>(null);

interface ChampionDataProviderProps {
  children: ReactNode;
}

export const ChampionDataProvider = ({ children }: ChampionDataProviderProps) => {
  const [rank, setRank] = useState<Rank[]>(["Master"]);
  const [cost, setCost] = useState<Cost[]>([]);
  const [table, setTable] = useState<boolean>(true);
  const [chart, setChart] = useState<boolean>(false);
  const [totalGames, setTotalGames] = useState<any[]>([]);
  const [championData, setChampionData] = useState<ChampionData[]>([]);
  const [championStatsWithTotalGames, setChampionStatsWithTotalGames] = useState<ChampionStatsWithTotalGames | null>(null);

  // fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/statistics/challenger/champions"
        );
        setTotalGames(response.data.totalGames);
        setChampionData(response.data.championData);
        setChampionStatsWithTotalGames(response.data.championStatsWithTotalGames);
        
        console.log("Fetched champion data:", response.data);
        console.log("Total games:", response.data.totalGames);
        console.log("Champion data:", response.data.championData);
        console.log("Champion stats with total games:", response.data.championStatsWithTotalGames);
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
      totalGames,
      setTotalGames,
      championData,
      setChampionData,
      championStatsWithTotalGames,
      setChampionStatsWithTotalGames
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
