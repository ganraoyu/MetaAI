export const getDamageTypeColor = (type: string): string => {
  switch (type) {
    case "totalChampionTrueDamage":
      return "rgba(255, 255, 255, 0.7)"; // white with 70% opacity
    case "totalChampionMagicDamage":
      return "rgba(59, 130, 246, 0.7)"; // blue
    case "totalChampionDamage":
      return "rgba(239, 68, 68, 0.7)"; // red (physical)
    case "totalChampionAbilityDamage":
      return "rgba(59, 130, 246, 0.7)"; // blue (ability damage)
    default:
      return "rgba(156, 163, 175, 0.7)"; // gray fallback
  }
};


export const getDamagePercentages = (damage: number, totalDamage: number): number => {
  return totalDamage === 0 ? 0 : (damage / totalDamage) * 100;
};

export const buildDamageGradient = (
  truePercent: number,
  magicPercent: number,
  abilityPercent: number,
  physicalPercent: number
): string => {
  const trueEnd = truePercent;
  const magicEnd = trueEnd + magicPercent;
  const abilityEnd = magicEnd + abilityPercent;
  const physicalEnd = abilityEnd + physicalPercent;

  return `linear-gradient(to right,
    ${getDamageTypeColor("totalChampionTrueDamage")} 0% ${trueEnd}%,
    ${getDamageTypeColor("totalChampionMagicDamage")} ${trueEnd}% ${magicEnd}%,
    ${getDamageTypeColor("totalChampionAbilityDamage")} ${magicEnd}% ${abilityEnd}%,
    ${getDamageTypeColor("totalChampionDamage")} ${abilityEnd}% ${physicalEnd}%
  )`;
};

