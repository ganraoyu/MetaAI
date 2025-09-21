export interface ChampionCardProps {
  champion: string;
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
