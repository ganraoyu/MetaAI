export interface ChampionCardProps {
  champion: string;
  cost: number;
  tier: string;
  averagePlacement: number;
  winRate: number;
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