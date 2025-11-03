import { PlayerData, Trait, TraitStats } from "../types";

export class TraitProcessor {
  static processMatches(matches: any[]) {
    const playerData = this.processPlayerData(matches);
    const traitData = this.calculateTraitData(playerData);
    const traitRanking = this.calculateTraitRanking(traitData);
    if (!playerData?.length) throw new Error("No player data found");

    return traitRanking;
  }

  private static processPlayerData(matches: any[]) {
    const processPlayerData = (matchDetails: any[]): PlayerData[] => {
      return matchDetails.flatMap((match) =>
        match.info.participants.map((participant: any) => ({
          placement: participant.placement,
          traits: participant.traits.map((trait: any) => ({
            traitName: trait.name,
          })),
        }))
      );
    };

    return processPlayerData(matches);
  }

  private static calculateTraitData = (playerData: PlayerData[]) => {
    return playerData.reduce<Record<string, TraitStats>>((acc, player) => {
      player?.traits?.forEach((trait: Trait) => {
        const existing = acc[trait.traitName];
        if (existing) {
          existing.totalGames += 1;
          existing.placements.push(player.placement);
          existing.wins += player.placement === 1 ? 1 : 0;
        } else {
          acc[trait.traitName] = {
            totalGames: 1,
            wins: player.placement === 1 ? 1 : 0,
            placements: [player.placement],
          };
        }
      });
      return acc;
    }, {}); 
  };

 private static calculateTraitRanking = (traitData: Record<string, TraitStats>) => {
  return Object.entries(traitData)
    .map(([id, { totalGames, wins, placements }]) => ({
      traitId: id.toUpperCase(),
      wins,
      winrate: ((wins / totalGames) * 100).toFixed(2),
      placementArray: [...placements],
      placement: ([...placements].reduce((sum, p) => sum + p, 0) / totalGames).toFixed(2),
      totalGames,
    }))
    .sort((a, b) => Number(a.placement) - Number(b.placement));
  };
};
