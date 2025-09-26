
interface Unit {
  character_id: string;
  itemNames: string[];
  tier: number;
}

interface PlayerData {
  placement: number;
  units: Unit[];
}

interface ChampionStats {
  totalGames: number;
  wins: number;
  placements: number[];
}

export {
  Unit,
  PlayerData,
  ChampionStats,
}