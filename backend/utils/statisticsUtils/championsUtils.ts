import { connectDB } from "../../database/db";
import { shortRegionClient } from "../generalUtils";
import { regions, regionMapping } from "../regionData";
import { SummonerData, PuuidData, MatchIdData, Unit, PlayerData, ChampionStats } from "./types";

const fetchPuuids = async (rank: string, division: string): Promise<PuuidData[]> => {
  const allPuuids = await Promise.all(
    regions.slice(0, 5).map(async (region) => {
      const client = shortRegionClient(region);

      if (["master", "grandmaster", "challenger"].includes(rank.toLowerCase())) {
        const response = await client.get(`/tft/league/v1/${rank}`);
        const players = response.data.entries.slice(0, 1);
        return players.map((p: any) => ({ puuid: p.puuid, region }));
      }

      const response = await client.get(
        `/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?page=1`
      );
      const players = response.data.slice(0, 1);
      return players.map((p: any) => ({ summonerId: p.summonerId, region }));
    })
  );

  return allPuuids.flat();
};

const fetchSummonerPuuids = async (summoners: SummonerData[]): Promise<PuuidData[]> => {
  const results = await Promise.all(
    summoners.map(async ({ summonerId, region }) => {
      const client = shortRegionClient(region);
      const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
      return { puuid: response.data.puuid, region };
    })
  );
  return results;
};

const fetchMatchHistory = async (puuids: PuuidData[]): Promise<MatchIdData[]> => {
  const histories = await Promise.all(
    puuids.map(async ({ puuid, region }) => {
      const matchRegion = regionMapping[region];
      const client = shortRegionClient(matchRegion);
      const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
        params: { count: 5 },
      });
      return response.data.slice(0, 5).map((matchId: string) => ({ matchId, region: matchRegion }));
    })
  );

  return histories.flat();
};

const fetchMatchDetails = async (matches: MatchIdData[]): Promise<any[]> => {
  const responses = await Promise.all(
    matches.map(({ matchId, region }) =>
      shortRegionClient(region).get(`/tft/match/v1/matches/${matchId}`)
    )
  );

  return responses.map((res) => res.data);
};

const processPlayerData = (matches: any[]): PlayerData[] =>
  matches.flatMap((match) =>
    match.info.participants.map((p: any) => ({
      placement: p.placement,
      units: p.units.map((u: any) => ({
        character_id: u.character_id,
        itemNames: u.itemNames ?? [],
        tier: u.tier,
      })),
    }))
  );

const calculateChampionData = (players: PlayerData[]): Record<string, ChampionStats> => {
  return players.reduce((acc: Record<string, ChampionStats>, player) => {
    player.units.forEach((unit) => {
      const existing = acc[unit.character_id];
      if (existing) {
        existing.totalGames += 1;
        existing.placements.push(player.placement);
        if (player.placement === 1) existing.wins += 1;
      } else {
        acc[unit.character_id] = {
          totalGames: 1,
          placements: [player.placement],
          wins: player.placement === 1 ? 1 : 0,
        };
      }
    });
    return acc;
  }, {});
};

const calculateChampionRanking = (champData: Record<string, ChampionStats>) =>
  Object.entries(champData)
    .map(([id, { totalGames, wins, placements }]) => ({
      championId: id.toUpperCase(),
      wins: wins,
      winrate: ((wins / totalGames) * 100).toFixed(2),
      placement: (placements.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2),
      totalGames,
    }))
    .sort((a, b) => Number(a.placement) - Number(b.placement));

const getChampionDataFromDB = async () => {
  try {
    const db = await connectDB();
    const championCollections = db.db("TFT").collection("champions");
    const champions = await championCollections.find().toArray();
    return champions;

  } catch (error) {
    console.error("Error fetching champion data from DB:", error);
    return [];
  }
};

const getChampionData = async (rank: string, division: string = "") => {
  try {
    const puuidData = await fetchPuuids(rank, division);
    if (!puuidData.length) throw new Error(`No ${rank} players found`);

    const summonerPuuids = ["master", "grandmaster", "challenger"].includes(rank.toLowerCase())
      ? puuidData
      : await fetchSummonerPuuids(puuidData as any);

    if (!summonerPuuids.length) throw new Error(`No ${rank} players found`);

    const matchHistory = await fetchMatchHistory(summonerPuuids);
    if (!matchHistory.length) throw new Error(`No ${rank} matches found`);

    const matchDetails = await fetchMatchDetails(matchHistory);
    if (!matchDetails.length) throw new Error(`No ${rank} match details found`);

    const playerData = processPlayerData(matchDetails);
    if (!playerData.length) throw new Error(`No ${rank} player data found`);

    const championData = calculateChampionData(playerData);
    const championRanking = calculateChampionRanking(championData);

    return championRanking;
  } catch (error: any) {
    const msg =
      error?.response?.data?.status?.message ||
      error?.response?.data?.message ||
      error?.message ||
      String(error);
    console.error("Error in getChampionData:", msg);
    throw new Error("Failed to fetch champion data");
  }
};

const updateChampionDataInDB = async (championRanking: any[]) => {
  const updatedChampions: any[] = [];
  try {
    const db = await connectDB();
    const championsCollection = db.db("TFT").collection("champions");

    for (const championStats of championRanking) {
      const champ = await championsCollection.findOne({ championId: championStats.championId });

      const totalGames = (champ?.totalGames || 0) + championStats.totalGames;

      const averagePlacement =
        (Number(championStats.placement) * championStats.totalGames +
          (champ?.averagePlacement || 0) * (champ?.totalGames || 0)) /
        totalGames;

      const wins = Number(championStats.wins) + (champ?.wins || 0);
      const winrate = Number((wins / totalGames) * 100).toFixed(2);

      await championsCollection.updateOne(
        { championId: championStats.championId },
        {
          $set: {
            totalGames: totalGames,
            averagePlacement: Number(averagePlacement.toFixed(2)),
            wins: wins,
            winrate: Number(winrate),
          },
        },
        { upsert: true }
      );

      console.log(`Updated stats for champion ${championStats.championId}`);
      updatedChampions.push({
        championId: championStats.championId,
        totalGames,
        averagePlacement: Number(averagePlacement.toFixed(2)),
        wins,
        winrate: Number(winrate),
      });
    };

    return updatedChampions;
  } catch (error) {
    console.error("Error pushing champion data to DB:", error);
    return [];
  }
};

export { getChampionDataFromDB, getChampionData, updateChampionDataInDB };
