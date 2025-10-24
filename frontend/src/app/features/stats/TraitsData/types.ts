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

export interface TraitItem {
  item: string;
  tier: string;
  averagePlacement: number;
  winRate: number;
  totalGames: number;
  frequency: number;
  index: number;
};

export interface TraitCellProps {
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

interface TraitStats {
  itemId: string;
  averagePlacement: number;
  totalGames: number;
  wins: number;
}

interface TraitDocument {
  itemStats: TraitStats;
  ranks: Record<string, TraitStats>;
}

interface TraitDataContextProps {
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

  itemStats: TraitDocument[];
  setItemStats: React.Dispatch<React.SetStateAction<TraitDocument[]>>;


  updateItemData: () => void;
}
p
export type {
  TraitStats,
  TraitDocument,
  TraitDataContextProps
};
