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

interface PlayerItem {
  items: string[];
}

interface PlayerData {
  placement: number;
  items: PlayerItem[];
}

interface ItemStats {
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

const fetchMatchDetails = async (matchIds: MatchIdData[]) => {
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
      items: participant.units
        .filter((unit: any) => unit.itemNames && unit.itemNames.length > 0)
        .map((unit: any) => ({ items: unit.itemNames })),
    })),
  );
};

const calculateItemData = (playerData: PlayerData[]): Record<string, ItemStats> => {
  return playerData.reduce((acc: Record<string, ItemStats>, player) => {
    player.items.forEach((itemGroup) => {
      itemGroup.items.forEach((itemName) => {
        if (acc[itemName]) {
          acc[itemName].totalGames += 1;
          acc[itemName].placements.push(player.placement);
          if (player.placement === 1) acc[itemName].wins += 1;
        } else {
          acc[itemName] = {
            totalGames: 1,
            placements: [player.placement],
            wins: player.placement === 1 ? 1 : 0,
          };
        }
      });
    });
    return acc;
  }, {});
};

const calculateItemRanking = (itemData: Record<string, ItemStats>) => {
  const itemRanking = Object.entries(itemData).map(
    ([itemId, { totalGames, wins, placements }]) => ({
      itemId,
      winrate: ((wins / totalGames) * 100).toFixed(2),
      placement: (placements.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2),
      totalGames,
    }),
  );
  return itemRanking.sort((a, b) => parseFloat(a.placement) - parseFloat(b.placement));
};

const getItemData = async (rank: string, division: string = '') => {
  try {
    const summonerIds = await fetchSummonerIds(rank, division);
    const summonerPuuids = await fetchSummonerPuuids(summonerIds);
    const matchHistory = await fetchMatchHistory(summonerPuuids);
    const matchDetails = await fetchMatchDetails(matchHistory);

    const playerData = processPlayerData(matchDetails);
    const itemData = calculateItemData(playerData);
    const itemRankings = calculateItemRanking(itemData);

    return itemRankings;
  } catch (error: any) {
    console.error(error);
    throw new Error('Failed to fetch item data');
  }
};

export default getItemData;
