import axios from "axios";
import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { TraitDocument, TraitDataContextProps } from "./types";

const TraitDataContext = createContext<TraitDataContextProps | null>(null);

interface TraitDataProvider {
  children: ReactNode;
}

export const TraitDataProvider = ({ children }: TraitDataProvider) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [rank, setRank] = useState<string[]>(["Master"]);

  const [levelType, setLevelType] = useState<string>("Overall");

  const [table, setTable] = useState<boolean>(true);
  const [chart, setChart] = useState<boolean>(false);

  const [traitLoading, setTraitLoading] = useState<boolean>(false);
  
  const [totalGames, setTotalGames] = useState<number>(0);

  const [traitStats, setTraitStats] = useState<TraitDocument[]>([]);

  const updateTraitData = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTraitLoading(true);

        const params = new URLSearchParams();
        if (rank.length === 0 || rank.length === 9) {
          params.append("rank", "all");
        } else {
          rank.forEach((r) => params.append("rank", r.toLowerCase()));
        }
        const [traitStatsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/statistics/traits?${params.toString()}`),
        ]);

        setTraitStats(traitStatsResponse.data.traitData);
        console.log(traitStatsResponse.data);
        setTotalGames(traitStatsResponse.data.totalGames);
      } catch (error) {
        console.error("Error fetching trait data:", error);
      } finally {
        setTraitLoading(false);
      }
    };
    fetchData();
  }, [rank]);

  return (
    <TraitDataContext.Provider
      value={{
        searchValue,
        setSearchValue,
        rank,
        setRank,
        levelType,
        setLevelType,
        table,
        setTable,
        chart,
        setChart,
        traitLoading,
        setTraitLoading,
        totalGames,
        setTotalGames,
        traitStats,
        setTraitStats,
        updateTraitData,
      }}
    >
      {children}
    </TraitDataContext.Provider>
  );
};

export const useTraitDataContext = () => {
  const context = useContext(TraitDataContext);
  if (!context) throw new Error("useChampionDataContext must be used inside ChampionDataProvider");
  return context;
};
