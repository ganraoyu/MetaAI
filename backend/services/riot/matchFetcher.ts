import { shortRegionClient } from "../../utilities/riotHttpClient";
import { regions, regionMapping } from "../../utilities/regionMappings";
import { SummonerData, PuuidData, MatchIdData } from "./types";

export class MatchFetcher {
  static async fetchMatches(rank: string, division: string = ""): Promise<any[]> {
    try {
      const puuidData = await this.fetchPuuids(rank, division);
      if (!puuidData.length) throw new Error(`No ${rank} players found`);

      const summonerPuuids = ["master", "grandmaster", "challenger"].includes(rank.toLowerCase())
        ? puuidData
        : await this.fetchSummonerPuuids(puuidData as any);

      if (!summonerPuuids.length) throw new Error(`No ${rank} players found`);

      const matchHistory = await this.fetchMatchHistory(summonerPuuids);
      if (!matchHistory.length) throw new Error(`No ${rank} matches found`);

      const matchDetails = await this.fetchMatchDetails(matchHistory);
      if (!matchDetails.length) throw new Error(`No ${rank} match details found`);

      return matchDetails;
    } catch (error: any) {
      const msg =
        error?.response?.data?.status?.message ||
        error?.response?.data?.message ||
        error?.message ||
        String(error);
      console.error("Error fetching matches:", msg);
      throw new Error("Failed to fetch match data");
    }
  }

  private static async fetchPuuids(rank: string, division: string): Promise<PuuidData[]> {
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
  }

  private static async fetchSummonerPuuids(summoners: SummonerData[]): Promise<PuuidData[]> {
    const results = await Promise.all(
      summoners.map(async ({ summonerId, region }) => {
        const client = shortRegionClient(region);
        const response = await client.get(`/tft/summoner/v1/summoners/${summonerId}`);
        return { puuid: response.data.puuid, region };
      })
    );
    return results;
  }

  private static async fetchMatchHistory(puuids: PuuidData[]): Promise<MatchIdData[]> {
    const histories = await Promise.all(
      puuids.map(async ({ puuid, region }) => {
        const matchRegion = regionMapping[region];
        const client = shortRegionClient(matchRegion);
        const response = await client.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
          params: { count: 5 },
        });
        return response.data.slice(0, 5).map((matchId: string) => ({
          matchId,
          region: matchRegion,
        }));
      })
    );

    return histories.flat();
  }

  private static async fetchMatchDetails(matches: MatchIdData[]): Promise<any[]> {
    const responses = await Promise.all(
      matches.map(({ matchId, region }) =>
        shortRegionClient(region).get(`/tft/match/v1/matches/${matchId}`)
      )
    );

    return responses.map((res) => res.data);
  }
}
