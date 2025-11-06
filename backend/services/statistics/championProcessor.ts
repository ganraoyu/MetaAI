import { PlayerData, ChampionStats } from "../types";

// Pulls data from riot games api, logic in repository
export class ChampionProcessor {
  static processMatches(matches: any[]) {
    const playerData = this.processPlayerData(matches);
    if (!playerData.length) throw new Error("No player data found");

    const championData = this.calculateChampionData(playerData);
    return this.calculateChampionRanking(championData);
  }

  // Extract relevant player and champion data from match details
  private static processPlayerData(matches: any[]): PlayerData[] {
    return matches.flatMap((match) =>
      match.info.participants.map((p: any) => ({
        placement: p.placement,
        units: p.units.map((u: any) => ({
          character_id: u.character_id,
          itemNames: u.itemNames ?? [],
          tier: u.tier,
        })),
      }))
    );
  }

  // Calculate total games, wins, and placements for each champion
  private static calculateChampionData(playerData: PlayerData[]): Record<string, ChampionStats> {
    return playerData.reduce((acc: Record<string, ChampionStats>, player) => {
      player.units.forEach((unit) => {
        const existing = acc[unit.character_id];
        if (existing) {
          existing.totalGames += 1;
          existing.placements.push(player.placement);
          existing.wins += player.placement === 1 ? 1 : 0;
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
  }
  
  private static calculateChampionRanking(championData: Record<string, ChampionStats>) {
    return Object.entries(championData)
      .map(([championId, stats]) => {
        const { totalGames, wins, placements } = stats;

        const placementArray = [...placements];

        const winrate = totalGames ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;

        const averagePlacement = totalGames
          ? Number((placementArray.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2))
          : 0;

        const top4count = placementArray.reduce((acc, p) => acc + (p <= 4 ? 1 : 0), 0);
        const top4rate = totalGames ? Number(((top4count / totalGames) * 100).toFixed(2)) : 0;

        return {
          championId: championId.toUpperCase(),
          wins,
          winrate,
          placement: averagePlacement,
          top4rate,
          placementArray,
          totalGames,
        };
      })
      .sort((a, b) => a.placement - b.placement);
  }
}
