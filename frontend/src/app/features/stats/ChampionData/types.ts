export interface ChampionCardProps {
  champion: string;
  cost: number;
  tier: string;
  averagePlacement: number;
  winRate: number;
  totalGames: number;
  frequency: number;
  popularItems: string[];
  index: number;
};

export interface ChampionCellProps {
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
  "Challenger"
];

export type Cost = 1 | 2 | 3 | 4 | 5 | 6;

export type TotalGames = number;

export interface ChampionData {
  championId: string;
  averagePlacement: number;
  win: number;
  winrate: number;
  cost: number | 1;
  totalGames: number | 1;
  frequency: number | 1;
  tier: string | '';
  popularItems: string[] | [];
};

export interface ChampionStatsWithTotalGames {
  totalGames: TotalGames;
  championData: ChampionData[];
};

export interface ChampionDataContextProps {
  rank: Rank[];
  setRank: React.Dispatch<React.SetStateAction<Rank[]>>;

  cost: Cost[];
  setCost: React.Dispatch<React.SetStateAction<Cost[]>>;

  table: boolean;
  setTable: React.Dispatch<React.SetStateAction<boolean>>;

  chart: boolean;
  setChart: React.Dispatch<React.SetStateAction<boolean>>;

  totalGames: TotalGames;
  setTotalGames: React.Dispatch<React.SetStateAction<TotalGames>>;

  championData: ChampionData[]
  setChampionData: React.Dispatch<React.SetStateAction<ChampionData[]>>

  championStatsWithTotalGames: ChampionStatsWithTotalGames | null;
  setChampionStatsWithTotalGames: React.Dispatch<React.SetStateAction<ChampionStatsWithTotalGames | null>>;

  updateChampionData: () => Promise<void>; 
};
