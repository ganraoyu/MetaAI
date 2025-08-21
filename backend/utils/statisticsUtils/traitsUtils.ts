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

interface Trait {
  traitName: string;
}

interface PlayerData {
  traits: Trait[];
}

const fetchSummonerIds = async (rank: string, division: string): Promise<SummonerData[]> => {
  const allSummonerIds = await Promise.all(
    regions.map(async (region) => {
      const client = shortRegionClient(region);
      let response: any;

      if (rank === 'master' || rank === 'grandmaster' || rank === 'challenger') {
        response = await client.get(`/tft/league/v1/${rank}`);
        const players = response.data.entries.slice(0, 1);
        return players.map((player: any) => ({ summonerId: player.summonerId, region }));
      } else {
        response = await client.get(
          `/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=RANKED_TFT&page=1`
        );
        const players = response.data.slice(0, 1);
        return players.map((player: any) => ({ summonerId: player.summonerId, region }));
      }
    })
  );

  return allSummonerIds.flat();
};

const fetchSummonerPuuids = async (summonerData: SummonerData[]): Promise<PuuidData[]> => {
  const summonerPuuids = await Promise.all(
    summonerData.map(async ({ summonerId, region }) => {
      const client = shortRegionClient(region);
      const response: any = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
      return { puuid: response.data.puuid, region };
    })
  );
  return summonerPuuids.flat();
};

const fetchMatchHistory = async (puuids: PuuidData[]): Promise<MatchIdData[]> => {
  const puuidMatchHistory = await Promise.all(
    puuids.map(async ({ puuid, region }) => {
      const matchRegion = regionMapping[region];
      const client = shortRegionClient(matchRegion);
      const response: any = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`);
      return response.data.slice(0, 1).map((matchId: string) => ({ matchId, region: matchRegion }));
    })
  );
  return puuidMatchHistory.flat();
};

const fetchMatchDetails = async (matchIds: MatchIdData[]): Promise<any[]> => {
  const matchDetailsPromises = matchIds.map(({ matchId, region }) => {
    const client = shortRegionClient(region);
    return client.get(`/tft/match/v1/matches/${matchId}`);
  });
  const matchDetailsResponses = await Promise.all(matchDetailsPromises);
  return matchDetailsResponses.map((response) => response.data);
};

const processPlayerData = (matchDetails: any[]): PlayerData[] => {
  return matchDetails.flatMap((response) =>
    response.info.participants.map((participant: any) => ({
      traits: participant.traits.map((trait: any) => ({
        traitName: trait.name,
      })),
    }))
  );
};

const calculateTraitData = (playerData: PlayerData[]) => {
  const traitData: Record<string, number> = playerData.reduce((acc, player) => {
    player.traits.forEach((trait) => {
      acc[trait.traitName] = (acc[trait.traitName] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(traitData)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

const getTraitData = async (rank: string, division: string = '') => {
  try {
    const summonerIds = await fetchSummonerIds(rank, division);
    const summonerPuuids = await fetchSummonerPuuids(summonerIds);
    const matchHistory = await fetchMatchHistory(summonerPuuids);
    const matchDetails = await fetchMatchDetails(matchHistory);
    const playerData = processPlayerData(matchDetails);
    const traitData = calculateTraitData(playerData);

    return traitData;
  } catch (error: any) {
    console.error(error);
    throw new Error('Failed to fetch trait data');
  }
};

export default getTraitData;
