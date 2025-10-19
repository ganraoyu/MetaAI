export type Rank = 
  | "Iron"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Master"
  | "Grandmaster"
  | "Challenger";
export const ranks: Rank[] = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster",
  "Challenger",
];

export interface ItemCardProps {
  item: string;
  tier: string;
  averagePlacement: number;
  winRate: number;
  totalGames: number;
  frequency: number;
  popularChampions: any[];
  index: number;
};

export interface ItemCellProps {
  children: React.ReactNode;
  width: string;
  index: number;
};

export interface HeaderCellProps {
  children: React.ReactNode;
  width: string;
  isFirst?: boolean;
  isLast?: boolean;
}

interface ItemStats {
  itemId: string;
  averagePlacement: number;
  totalGames: number;
  wins: number;
}

interface ItemsDocument {
  itemStats: ItemStats;
  ranks: Record<string, ItemStats>;
}

interface ChampionStats {
  championId: string;
  cost: number;
}

interface ChampionDocument {
  championStats: ChampionStats;
}

interface ItemDataContextProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;

  itemType: string[];
  setItemType: React.Dispatch<React.SetStateAction<string[]>>;
  
  rank: string[];
  setRank: React.Dispatch<React.SetStateAction<string[]>>;

  table: boolean;
  setTable: React.Dispatch<React.SetStateAction<boolean>>;

  chart: boolean;
  setChart: React.Dispatch<React.SetStateAction<boolean>>;

  itemLoading: boolean;
  setItemLoading: React.Dispatch<React.SetStateAction<boolean>>;

  championLoading: boolean;
  setChampionLoading: React.Dispatch<React.SetStateAction<boolean>>;

  totalGames: number;
  setTotalGames: React.Dispatch<React.SetStateAction<number>>;

  itemStats: ItemsDocument[];
  setItemStats: React.Dispatch<React.SetStateAction<ItemsDocument[]>>;

  championStats: ChampionDocument[];
  setChampionStats: React.Dispatch<React.SetStateAction<ChampionDocument[]>>;

  updateItemData: () => void;
}

// Export everything in a single statement
export type {
  ItemStats,
  ItemsDocument,
  ChampionStats,
  ChampionDocument,
  ItemDataContextProps
};
