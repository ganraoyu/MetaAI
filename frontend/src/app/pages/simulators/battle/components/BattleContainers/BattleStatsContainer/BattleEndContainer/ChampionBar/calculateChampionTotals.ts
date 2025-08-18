import { Champion } from "./types";

export const getDamageTotals = (champion: Champion) => {
  return {
    totalChampionDamage: champion.totalChampionDamage,
    totalChampionTrueDamage: champion.totalChampionTrueDamage,
    totalChampionMagicDamage: champion.totalChampionMagicDamage,
    totalChampionAbilityDamage: champion.totalChampionAbilityDamage,
    allChampionDamage: champion.allChampionDamage
  };
};

export const getTotalBarWidth = (champion: Champion) => {
  return Math.max(
    champion.allChampionDamage,
    champion.totalChampionHealing,
    champion.totalChampionShield || 0
  );
};

// export const getChampionMaxTotal = (
//   totalDamage: number,
//   totalHeal: number,
//   totalShield: number
// ): number => {
//   break;
// };
