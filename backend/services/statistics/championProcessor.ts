import { PlayerData, ChampionStats } from "../types";


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
  private static calculateChampionData(players: PlayerData[]): Record<string, ChampionStats> {
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
  }

  // Generate champion ranking based on average placement, winrate, and total games
  private static calculateChampionRanking(champData: Record<string, ChampionStats>) {
    return Object.entries(champData)
      .map(([id, { totalGames, wins, placements }]) => ({
        championId: id.toUpperCase(),
        wins,
        winrate: ((wins / totalGames) * 100).toFixed(2),
        placement: (
          placements.reduce((sum, p) => sum + p, 0) / totalGames
        ).toFixed(2),
        totalGames,
      }))
      .sort((a, b) => Number(a.placement) - Number(b.placement));
  }
};