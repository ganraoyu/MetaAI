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
  const [totalGames, setTotalGames] = useState<number>(0);
  const [championData, setChampionData] = useState<ChampionData[]>([]);
  const [championStatsWithTotalGames, setChampionStatsWithTotalGames] = useState<ChampionStatsWithTotalGames | null>(null);

  // fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/statistics/challenger/champions"
        );
        setTotalGames(response.data.totalGames.count);
        setChampionData(response.data.championData);
        setChampionStatsWithTotalGames(response.data.championStatsWithTotalGames);

        console.log("Fetched champion data:", response.data);
        console.log("Total games:", response.data.totalGames);
        console.log("Champion data:", response.data.championData);
        console.log("Champion stats with total games:", response.data);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };

    fetchData();
  }, []);

  const updateChampionData = async () => {
    try { 
      const response = await axios.get("http://localhost:3000/statistics/update/challenger/champions");

      setTotalGames(response.data.totalGames.count);
      setChampionData(response.data.updatedChampions);  
      setChampionStatsWithTotalGames(response.data);
    } catch (error) {
      console.error("Error updating champion data:", error);
    }
  }

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
