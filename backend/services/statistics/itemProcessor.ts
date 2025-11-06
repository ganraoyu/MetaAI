import { ItemStats, PlayerData } from "../types";

export class ItemProcessor {
  static processMatches(matches: any[]) {
    const playerData = this.processPlayerData(matches);
    if (!playerData?.length) throw new Error("No player data found");

    const itemData = this.calculateItemData(playerData);
    const itemRanking = this.calculateItemRanking(itemData);
    return itemRanking;
  }

  private static processPlayerData(matches: any[]): PlayerData[] {
    return matches.flatMap((match) =>
      match.info.participants.map((participant: any) => ({
        placement: participant.placement,
        units: participant.units.map((u: any) => ({
          character_id: u.character_id,
          itemNames: u.itemNames ?? [],
          tier: u.tier,
        })),
        traits: [],
      }))
    );
  }

  private static calculateItemData(playerData: PlayerData[]): Record<string, ItemStats> {
    return playerData.reduce<Record<string, ItemStats>>((acc, player) => {
      const playerItems: string[] = [];
      player.units.forEach((unit) => {
        if (unit.itemNames && unit.itemNames.length > 0) {
          playerItems.push(...unit.itemNames);
        }
      });

      // Count each item for this player
      playerItems.forEach((itemName) => {
        // Normalize to uppercase for consistency; frontend will handle display mapping
        itemName = itemName.toUpperCase();
        const existing = acc[itemName];
        if (existing) {
          existing.totalGames += 1;
          existing.placements.push(player.placement);
          existing.wins += player.placement === 1 ? 1 : 0;
        } else {
          acc[itemName] = {
            totalGames: 1,
            wins: player.placement === 1 ? 1 : 0,
            placements: [player.placement],
          };
        }
      });

      return acc;
    }, {});
  }

  private static calculateItemRanking(itemData: Record<string, ItemStats>) {
    return Object.entries(itemData)
      .map(([itemId, stats]) => {
        const { totalGames, wins, placements } = stats;

        const placementArray = [...placements];
        const winrate = totalGames ? Number(((wins / totalGames) * 100).toFixed(2)) : 0;

        const averagePlacement = totalGames
          ? Number((placementArray.reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2))
          : 0;

        const top4count = placementArray.reduce((acc, p) => acc + (p <= 4 ? 1 : 0), 0);
        const top4rate = totalGames ? Number(((top4count / totalGames) * 100).toFixed(2)) : 0;

        return {
          itemId: itemId.toUpperCase(),
          wins,
          winrate,
          top4rate,
          placementArray,
          placement: averagePlacement,
          totalGames,
        };
      })
      .sort((a, b) => a.placement - b.placement);
  }
}
