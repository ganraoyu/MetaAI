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
        traits: [] 
      }))
    );
  }

  private static calculateItemData(playerData: PlayerData[]): Record<string, ItemStats> {
    return playerData.reduce<Record<string, ItemStats>>((acc, player) => {
      const playerItems: string[] = [];
      player.units.forEach(unit => {
        if (unit.itemNames && unit.itemNames.length > 0) {
          playerItems.push(...unit.itemNames);
        }
      });

      // Count each item for this player
      playerItems.forEach(itemName => {
         // Normalize to uppercase for consistency; frontend will handle display mapping
        itemName = itemName.toUpperCase() 
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
      .map(([itemId, { totalGames, wins, placements }]) => ({
        itemId: itemId.toUpperCase(),
        wins,
        winrate: ((wins / totalGames) * 100).toFixed(2),
        placementArray: [...placements],
        placement: ([...placements].reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2),
        totalGames,
      }))
      .sort((a, b) => parseFloat(a.placement) - parseFloat(b.placement));
  }
}