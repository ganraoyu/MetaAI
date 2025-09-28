import { queueMapping } from "../../utilities/queueMappings";
import { shortRegionClient } from "../../utilities/riotHttpClient";
import { LeaderboardRequest } from "./types";

export class LeaderboardService {
  static async getLeaderboard(params: LeaderboardRequest) {
    const { rank } = params;
    if (["challenger", "grandmaster", "master"].includes(rank.toLowerCase())) {
      return this.getAboveMasterLeaderboards(params);
    } else {
      if (!params.division) throw new Error("Division is required for below master ranks");
      return this.getBelowMasterLeaderboards(params);
    }
  }

  private static async getAboveMasterLeaderboards({ region, rank, mode }: LeaderboardRequest) {
    if (!region) throw new Error("Region is required");

    try {
      const queue = queueMapping[mode as keyof typeof queueMapping];
      const client = shortRegionClient(region);
      const response = await client.get(`/tft/league/v1/${rank}?queue=${queue}`);

      const playerData = Object.entries(response.data.entries ?? {}).map(
        ([index, entry]: [string, any]) => ({
          rank: parseInt(index) + 1,
          summonerId: entry.summonerId,
          leaguePoints: entry.leaguePoints,
          winrate: ((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(2) + "%",
          wins: entry.wins,
          losses: entry.losses,
        })
      );

      return { playerData };
    } catch (error: any) {
      console.error(`Error fetching ${rank} data:`, error.response?.data || error.message);
      throw new Error(`Failed to fetch ${rank} leaderboard`);
    }
  }

  private static async getBelowMasterLeaderboards({ region, rank, division, mode }: LeaderboardRequest) {
    if (!region) throw new Error("Region is required");
    if (!division) throw new Error("Division is required");

    try {
      const queue = queueMapping[mode as keyof typeof queueMapping];
      const client = shortRegionClient(region);
      const response = await client.get(
        `/tft/league/v1/entries/${rank.toUpperCase()}/${division.toUpperCase()}?queue=${queue}`
      );

      const playerData = response.data.map((entry: any, index: number) => ({
        rank: index + 1,
        summonerId: entry.summonerId,
        leaguePoints: entry.leaguePoints,
        winrate: ((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(2) + "%",
        wins: entry.wins,
        losses: entry.losses,
      }));

      return { playerData };
    } catch (error: any) {
      console.error(`Error fetching ${rank} ${division} data:`, error.response?.data || error.message);
      throw new Error(`Failed to fetch ${rank} ${division} leaderboard`);
    }
  }
}
