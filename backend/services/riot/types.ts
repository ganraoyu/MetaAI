// Player-related types
interface AccountResponse {
  puuid: string;
  [key: string]: any;
};

interface MatchDetail {
  [key: string]: any;
};

// Match-related types
interface SummonerData {
  summonerId: string;
  region: string; 
};

interface PuuidData {
  puuid: string;
  region: string;
};

interface MatchIdData {
  matchId: string;
  region: string;
}

// Leaderboard-related types
type LeaderboardRequest = {
  region: string;
  rank: string;
  division?: string;
  mode: string;
}

export { 
  AccountResponse,
  MatchDetail, 
  SummonerData, 
  PuuidData, 
  MatchIdData,
  LeaderboardRequest
}