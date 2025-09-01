import { shortRegionClient } from '../generalUtils';
import { regions, regionMapping } from '../regionData';

interface SummonerData {
  summonerId: string;
  region: string;
}

interface PuuidData {
  puuid: string;
  region: string;
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

const fetchSummonerIds = async (rank: string, division: string): Promise<SummonerData[]> => {
  const allSummonerIds = await Promise.all(
    regions.map(async (region) => {
      const client = shortRegionClient(region);
      let response;

      if (rank === 'master' || rank === 'grandmaster' || rank === 'challenger') {
        response = await client.get(`/tft/league/v1/${rank}`);
        const players = response.data.entries.slice(0, 1);
        return players.map((player: any) => ({ summonerId: player.summonerId, region }));
      } else {
        console.log(`Making request for rank: ${rank}, division: ${division}`);
        response = await client.get(
          `/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=RANKED_TFT&page=1`,
        );
        const players = response.data.slice(0, 1);
        return players.map((player: any) => ({ summonerId: player.summonerId, region }));
      }
    }),
  );

  return allSummonerIds.flat();
};

const fetchSummonerPuuids = async (summonerData: SummonerData[]): Promise<PuuidData[]> => {
  const summonerPuuids = await Promise.all(
    summonerData.map(async ({ summonerId, region }) => {
      const client = shortRegionClient(region);
      const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
      return { puuid: response.data.puuid, region };
    }),
  );
  return summonerPuuids.flat();
};

const fetchMatchHistory = async (puuids: PuuidData[]): Promise<MatchIdData[]> => {
  const puuidMatchHistory = await Promise.all(
    puuids.map(async ({ puuid, region }) => {
      const matchRegion = regionMapping[region];
      const client = shortRegionClient(matchRegion);
      const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
      return response.data.slice(0, 1).map((matchId: string) => ({ matchId, region: matchRegion }));
    }),
  );
  return puuidMatchHistory.flat();
};

const fetchMatchDetails = async (matchIds: MatchIdData[]): Promise<any[]> => {
  const matchDetailsPromises = await Promise.all(
    matchIds.map(({ matchId, region }) => {
      const client = shortRegionClient(region);
      return client.get(`/tft/match/v1/matches/${matchId}`);
    }),
  );

  return matchDetailsPromises.map((response) => response.data);
};

const processPlayerData = (matchDetails: any[]): PlayerData[] => {
  return matchDetails.flatMap((response) =>
    response.info.participants.map((participant: any) => ({
      placement: participant.placement,
      units: participant.units.map((unit: any) => ({
        character_id: unit.character_id,
        items: unit.itemNames,
        tier: unit.tier,
      })),
    })),
  );
};

const calculateChampionData = (playerData: PlayerData[]): Record<string, ChampionStats> => {
  return playerData.reduce((acc: Record<string, ChampionStats>, player) => {
    player.units.forEach((unit) => {
      if (acc[unit.character_id]) {
        acc[unit.character_id].totalGames += 1;
        acc[unit.character_id].placements.push(player.placement);
        if (player.placement === 1) acc[unit.character_id].wins += 1;
      } else {
        acc[unit.character_id] = {
          totalGames: 1,
          placements: [player.placement],
          wins: player.placement <= 4 ? 1 : 0,
        };
      }
    });
    return acc;
  }, {});
};

const calculateChampionRanking = (championData: Record<string, ChampionStats>) => {
  return Object.entries(championData)
    .map(([championId, { totalGames, wins, placements }]) => ({
      championId,
      winrate: ((wins / totalGames) * 100).toFixed(2),
      placement: (placements.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2),
      totalGames,
    }))
    .sort((a, b) => Number(a.placement) - Number(b.placement));
};

const getChampionData = async (rank: string, division: string = '') => {
  try {
    const summonerIds = await fetchSummonerIds(rank, division);
    if (summonerIds.length === 0) throw new Error(`No ${rank} players found`);

    const summonerPuuids = await fetchSummonerPuuids(summonerIds);
    if (summonerPuuids.length === 0) throw new Error(`No ${rank} players found`);

    const matchHistory = await fetchMatchHistory(summonerPuuids);
    if (matchHistory.length === 0) throw new Error(`No ${rank} matches found`);

    const matchDetails = await fetchMatchDetails(matchHistory);
    if (matchDetails.length === 0) throw new Error(`No ${rank} match details found`);

    const playerData = processPlayerData(matchDetails);
    if (playerData.length === 0) throw new Error(`No ${rank} player data found`);

    const championData = calculateChampionData(playerData);
    const championRanking = calculateChampionRanking(championData);

    return championRanking;
  } catch (error: any) {
    console.error('Error in getChampionData:', error.message);
    throw new Error('Failed to fetch champion data');
  }
};

export default getChampionData;
