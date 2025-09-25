interface SummonerData {
  summonerId: string;
  region: string; 
}

interface PuuidData {
  puuid: string;
  region: string; // platform region
}

interface MatchIdData {
  matchId: string;
  region: string;
}

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
  SummonerData,
  PuuidData,
  MatchIdData,
  Unit,
  PlayerData,
  ChampionStats,
}