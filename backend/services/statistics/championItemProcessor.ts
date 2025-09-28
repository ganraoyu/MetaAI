import { ChampionItemStats, ChampionStats, PlayerData } from "../types";

export class ChampionItemProcessor {
  static processMatches(matches: any[]) {}

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
    return playerData.reduce((acc: Record<string, ChampionItemStats>, player) => {
      player.units.forEach((unit) => {
        const existing = acc[unit.character_id];

        if (existing) {
        }
      });
      return acc;
    }, {});
  }
}
