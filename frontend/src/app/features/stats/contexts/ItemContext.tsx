import axios from "axios";
import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { ChampionDocument, ItemDataContextProps, ItemsDocument } from "../Item/types";
import { nonPlayableItems } from "../../../data/SET15/itemData/nonPlayableItems";

const ItemContext = createContext<ItemDataContextProps | null>(null);

interface ItemDataProvider {
  children: ReactNode;
}

export const ItemProvider = ({ children }: ItemDataProvider) => {
  const [searchValue, setSearchValue] = useState<string>("");
  
  const [rank, setRank] = useState<string[]>(["Challenger"]);

  const [itemType, setItemType] = useState<string[]>(["Basic", "Combined", "Radiant", "Artifact", "Emblem"]);

  const [table, setTable] = useState<boolean>(true);
  const [chart, setChart] = useState<boolean>(false);

  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [championLoading, setChampionLoading] = useState<boolean>(false);

  const [totalGames, setTotalGames] = useState<number>(0);

  const [itemStats, setItemStats] = useState<ItemsDocument[]>([]);

  const [championStats, setChampionStats] = useState<ChampionDocument[]>([]);

  const updateItemData = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setItemLoading(true);
        setChampionLoading(true);
    
        const params = new URLSearchParams();
        if (rank.length === 0 || rank.length === 9) {
          params.append("rank", "all");
        } else {
          rank.forEach((r) => params.append("rank", r.toLowerCase()));
        }

        const [itemStatsResponse, championItemStatsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/statistics/items?${params.toString()}`),
          axios.get(`http://localhost:3000/statistics/championItems?${params.toString()}`),
        ]);
        const filteredItemStatsResponse = itemStatsResponse.data.itemData.filter((item: any) => !nonPlayableItems.includes(item.itemId));

        setItemStats(filteredItemStatsResponse);
        console.log(filteredItemStatsResponse);
        console.log(filteredItemStatsResponse)
        setTotalGames(itemStatsResponse.data.totalGames);
        setChampionStats(championItemStatsResponse.data.championData);
      } catch (error) {
        console.error("Error fetching item data:", error);
      } finally {
        setItemLoading(false);
        setChampionLoading(false);
      }
    };
    fetchData();
  }, [rank]);
  
  return (
    <ItemContext.Provider
      value={{
        searchValue,
        setSearchValue,
        rank,
        setRank,
        itemType,
        setItemType,
        table,
        setTable,
        chart,
        setChart,
        itemLoading,
        setItemLoading,
        championLoading,
        setChampionLoading,
        totalGames,
        setTotalGames,
        itemStats,
        setItemStats,
        championStats,
        setChampionStats,
        updateItemData,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
    if (!context) throw new Error("useChampionDataContext must be used inside ChampionDataProvider");
  return context;
};