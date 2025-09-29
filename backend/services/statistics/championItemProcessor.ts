import { PlayerData } from "../types";

export class ChampionItemProcessor {
  static processMatches(matches: any[]) {
    const playerData = this.processPlayerData(matches);
    if (!playerData.length) throw new Error("No player data found");

    const championItemData = this.calculateChampionItemData(playerData);
    return this.calculateChampionItemRanking(championItemData);
  }

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

  private static calculateChampionItemData(playerData: PlayerData[]) {
    const championItemMap: Record<string, Record<string, any>> = {};

    playerData.forEach((player) => {
      player.units.forEach((unit) => {
        if (!unit.character_id || !unit.itemNames?.length) return;

        const championId = unit.character_id.toUpperCase();
        if (!championItemMap[championId]) {
          championItemMap[championId] = {};
        }

        // Process each item on this champion
        unit.itemNames.forEach((itemId) => {
          const itemKey = itemId;
          if (!championItemMap[championId][itemKey]) {
            championItemMap[championId][itemKey] = {
              totalGames: 0,
              wins: 0,
              placements: [],
            };
          }

          championItemMap[championId][itemKey].totalGames += 1;
          championItemMap[championId][itemKey].placements.push(player.placement);
          if (player.placement === 1) {
            championItemMap[championId][itemKey].wins += 1;
          }
        });
      });
    });

    return championItemMap;
  }

  private static calculateChampionItemRanking(
    championItemMap: Record<string, Record<string, any>>
  ) {
    return Object.entries(championItemMap).map(([championId, items]) => ({
      championId,
      items: Object.entries(items).map(([itemId, stats]) => {
        const avgPlacement =
          stats.placements.reduce((sum: number, p: number) => sum + p, 0) / stats.totalGames;
        const winrate = (stats.wins / stats.totalGames) * 100;

        return {
          itemId,
          wins: stats.wins,
          totalGames: stats.totalGames,
          winrate: Number(winrate.toFixed(2)),
          averagePlacement: Number(avgPlacement.toFixed(2)),
        };
      }),
    }));
  }
}
