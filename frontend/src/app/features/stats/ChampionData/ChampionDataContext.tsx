import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cost, Rank, ChampionStats, ChampionDataContextProps, ChampionStatsWithTotalGames, ChampionItemStats } from "./types";

const ChampionDataContext = createContext<ChampionDataContextProps | null>(null);

interface ChampionDataProviderProps {
  children: ReactNode;
}

export const ChampionDataProvider = ({ children }: ChampionDataProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [rank, setRank] = useState<Rank[]>(["Challenger", "Grandmaster", "Master", "Diamond", "Platinum", "Gold", "Silver","Bronze", "Iron"]);
  const [cost, setCost] = useState<Cost[]>([]);
  const [table, setTable] = useState<boolean>(true);
  const [chart, setChart] = useState<boolean>(false);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [championStats, setChampionStats] = useState<ChampionStats[]>([]);
  const [championStatsWithTotalGames, setChampionStatsWithTotalGames] = useState<ChampionStatsWithTotalGames | null>(null);
  const [championItemStats, setChampionItemStats] = useState<ChampionItemStats[]>([]);

    useEffect(() => {
      const fetchData = async (rank: string[]) => {
        try {
          const championStats = await axios.get(`http://localhost:3000/statistics/${rank[0]}/champions`);
          const championItemStats = await axios.get(`http://localhost:3000/statistics/${rank[0]}/championItems`);
          
          setTotalGames(championStats.data.totalGames);
          setChampionStats(championStats.data.championData);
          setChampionStatsWithTotalGames(championStats.data.championStatsWithTotalGames);
          setChampionItemStats(championItemStats.data.championData);
          console.log(championItemStats.data.championData)
        } catch (error) {
          console.error("Error fetching champion data:", error);
        }
      };

    fetchData(rank);
  }, [rank]);

  const updateChampionData = async () => {
    try { 
      const response = await axios.get("http://localhost:3000/statistics/challenger/allStatistics");

      setTotalGames(response.data.totalGames.count);
      setChampionStats(response.data.updatedChampions);  
      setChampionStatsWithTotalGames(response.data);
    } catch (error) {
      console.error("Error updating champion data:", error);
    }
  }

  return (
    <ChampionDataContext.Provider value={{
      searchValue,
      setSearchValue,
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
      championStats,
      setChampionStats,
      championItemStats,
      setChampionItemStats,
      championStatsWithTotalGames,
      setChampionStatsWithTotalGames,
      updateChampionData
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
