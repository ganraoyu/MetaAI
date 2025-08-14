export const getTypeColor = (type: string): string => {
  switch (type) {
    case "totalChampionTrueDamage":
      return "#ffffff"; // white
    case "totalChampionMagicDamage":
      return "#3b82f6"; // blue
    case "totalChampionDamage":
      return "#ef4444"; // red (physical)
    case "totalChampionAbilityDamage":
      return "#3b82f6"; // blue (ability damage)
    default:
      return "#9ca3af"; // gray fallback
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
    ${getTypeColor("totalChampionTrueDamage")} 0% ${trueEnd}%,
    ${getTypeColor("totalChampionMagicDamage")} ${trueEnd}% ${magicEnd}%,
    ${getTypeColor("totalChampionAbilityDamage")} ${magicEnd}% ${abilityEnd}%,
    ${getTypeColor("totalChampionDamage")} ${abilityEnd}% ${physicalEnd}%
  )`;
};