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

export interface TraitCardProps {
  trait: string;
  tier: string;
  averagePlacement: number;
  winRate: number;
  totalGames: number;
  level: any;
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
  traitId: string;
  averagePlacement: number;
  totalGames: number;
  wins: number;
}

interface TraitDocument {
  traitStatsFe: TraitStats;
  ranks: Record<string, TraitStats>;
}

interface TraitDataContextProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;

  levelType: string;
  setLevelType: React.Dispatch<React.SetStateAction<string>>;
  
  rank: string[];
  setRank: React.Dispatch<React.SetStateAction<string[]>>;

  table: boolean;
  setTable: React.Dispatch<React.SetStateAction<boolean>>;

  chart: boolean;
  setChart: React.Dispatch<React.SetStateAction<boolean>>;

  traitLoading: boolean;
  setTraitLoading: React.Dispatch<React.SetStateAction<boolean>>;

  totalGames: number;
  setTotalGames: React.Dispatch<React.SetStateAction<number>>;

  traitStats: TraitDocument[];
  setTraitStats: React.Dispatch<React.SetStateAction<TraitDocument[]>>;

  updateTraitData: () => void;
}

export type {
  TraitStats,
  TraitDocument,
  TraitDataContextProps
};
