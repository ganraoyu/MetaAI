import axios from "axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Cost,
  Rank,
  ChampionStats,
  ChampionDataContextProps,
  ChampionStatsWithTotalGames,
  ChampionItemStats,
} from "../Champion/types";

const ChampionContext = createContext<ChampionDataContextProps | null>(null);

interface ChampionDataProviderProps {
  children: ReactNode;
}

export const ChampionProvider = ({ children }: ChampionDataProviderProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [rank, setRank] = useState<Rank[]>(["Challenger", "Grandmaster"]);
  const [cost, setCost] = useState<Cost[]>([]);
  const [table, setTable] = useState<boolean>(true);
  const [chart, setChart] = useState<boolean>(false);
  const [championLoading, setChampionLoading] = useState<boolean>(false);
  const [championItemLoading, setChampionItemLoading] = useState<boolean>(false);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [championStats, setChampionStats] = useState<ChampionStats[]>([]);
  const [championStatsWithTotalGames, setChampionStatsWithTotalGames] = useState<ChampionStatsWithTotalGames | null>(null);
  const [championItemStats, setChampionItemStats] = useState<ChampionItemStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setChampionLoading(true);
        setChampionItemLoading(true);

        const params = new URLSearchParams();
        if (rank.length === 0 || rank.length === 9) {
          params.append("rank", "all");
        } else {
          rank.forEach((r) => params.append("rank", r.toLowerCase()));
        }

        // Fetch both in parallel
        const [championStatsRes, championItemStatsRes] = await Promise.all([
          axios.get(`http://localhost:3000/statistics/champions?${params.toString()}`),
          axios.get(`http://localhost:3000/statistics/championItems?${params.toString()}`),
        ]);

        // Set champion data
        setTotalGames(championStatsRes.data.totalGames);
        setChampionStats(championStatsRes.data.championData);
        console.log(championStatsRes.data.championData)
        setChampionStatsWithTotalGames(championStatsRes.data.championStatsWithTotalGames);

        // Set champion item data
        setChampionItemStats(championItemStatsRes.data.championData);
        console.log(championItemStatsRes.data.championData)

        // Set loading states to false after successful data fetch
        setChampionLoading(false);
        setChampionItemLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setChampionLoading(false);
        setChampionItemLoading(false);
      }
    };

    fetchData();
  }, [rank]);

  const updateChampionData = async () => {
    try {
      // Convert current ranks to lowercase for the update call
      const lowercaseRanks = rank.map((r) => r.toLowerCase());
      const rankQuery =
        lowercaseRanks.length === 0 || lowercaseRanks.length === 9
          ? "all"
          : lowercaseRanks.join(",");

      console.log("Updating champion data for ranks:", rankQuery);

      // Use the correct update endpoint
      const response = await axios.get(
        `http://localhost:3000/statistics/update/champions?rank=${rankQuery}`
      );

      console.log("Update response:", response.data);

      // Handle the response structure from your backend
      if (Array.isArray(response.data)) {
        // If multiple ranks, combine the results
        let totalGamesSum = 0;
        let allChampions: any[] = [];

        response.data.forEach((rankResult: any) => {
          if (rankResult.totalGames) {
            totalGamesSum += rankResult.totalGames;
          }
          if (rankResult.updatedChampions) {
            allChampions.push(...rankResult.updatedChampions);
          }
        });

        setTotalGames(totalGamesSum);
        setChampionStats(allChampions);
      } else {
        // Single rank result
        setTotalGames(response.data.totalGames || 0);
        setChampionStats(response.data.updatedChampions || []);
      }

      // Refresh the data after update
      const updatedChampionStats = await axios.get(
        `http://localhost:3000/statistics/champions?rank=${rankQuery}`
      );
      const updatedChampionItemStats = await axios.get(
        `http://localhost:3000/statistics/championItems?rank=${rankQuery}`
      );

      setTotalGames(updatedChampionStats.data.totalGames);
      setChampionStats(updatedChampionStats.data.championData);
      setChampionItemStats(updatedChampionItemStats.data.championData);
    } catch (error) {
      console.error("Error updating champion data:", error);
    }
  };

  return (
    <ChampionContext.Provider
      value={{
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
        championLoading,
        setChampionLoading,
        championItemLoading,
        setChampionItemLoading,
        totalGames,
        setTotalGames,
        championStats,
        setChampionStats,
        championItemStats,
        setChampionItemStats,
        championStatsWithTotalGames,
        setChampionStatsWithTotalGames,
        updateChampionData,
      }}
    >
      {children}
    </ChampionContext.Provider>
  );
};

export const useChampionContext = () => {
  const context = useContext(ChampionContext);
  if (!context) throw new Error("useChampionDataContext must be used inside ChampionDataProvider");
  return context;
};
