export interface BattleLog {
  formattedTime: string;
  type: string;
  details: any;
  isCrit?: boolean;
  source: string;
};

export interface BattleData {
  battleLogs: BattleLog[];
  duration: number;
};

interface ChampionStats {
  name: string;
  items: string[];
  hp: number;
  isAlive: boolean;
  totalChampionDamage: number;
  totalChampionTrueDamage: number;
  totalChampionMagicDamage: number;  
  totalChampionAbilityDamage: number;
  allChampionDamage: number;
  totalChampionHealing: number; 
};

export interface PlayerChampionStatsBlock {
  playerWinRate: string;
  playerStatistics: ChampionStats[];
};

export interface OpponentChampionStatsBlock {
  opponentWinRate: string;
  opponentStatistics: ChampionStats[];
};

export interface BattleEndStats {
  playerChampionStatistics: PlayerChampionStatsBlock[]; 
  opponentChampionStatistics: OpponentChampionStatsBlock[]; 
};

export interface BattleContextType {
  startBattle: boolean;
  setStartBattle: (start: boolean) => void;

  battleHistory: BattleData | null;
  setBattleHistory: (data: BattleData | null) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string | null;
  fetchBattleHistory: () => Promise<void>;

  battleEndStats: BattleEndStats | null;
  setBattleEndStats: (stats: BattleEndStats | null) => void;

  fetchBattleStats: () => Promise<void>;
};
