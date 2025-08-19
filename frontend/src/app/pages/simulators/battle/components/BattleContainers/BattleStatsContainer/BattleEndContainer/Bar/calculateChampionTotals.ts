import { Champion } from "./types";

export const getDamageTotals = (champion: Champion) => {
  return {
    totalChampionDamage: champion.totalChampionDamage || 0,
    totalChampionTrueDamage: champion.totalChampionTrueDamage || 0,
    totalChampionMagicDamage: champion.totalChampionMagicDamage || 0,
    totalChampionAbilityDamage: champion.totalChampionAbilityDamage || 0,
    allChampionDamage: champion.allChampionDamage || 0
  };
};

// Heal is already the total version, but will still have helper for the sake of consistency
export const getHealTotals = (champion: Champion) => {
  return champion.totalChampionHealing || 0
};

export const getTotalBarWidth = (champion: Champion) => {
  return Math.max(
    champion.allChampionDamage || 0,
    champion.totalChampionHealing || 0,
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
