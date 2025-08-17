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
  physicalPercent: number,
  magicPercent: number,
  abilityPercent: number
): string => {
  const trueEnd = truePercent;
  const physicalEnd = trueEnd + physicalPercent;
  const magicEnd = physicalEnd + magicPercent;
  const abilityEnd = magicEnd + abilityPercent;

  return `linear-gradient(to right,
    ${getDamageTypeColor("totalChampionTrueDamage")} 0% ${trueEnd}%,
    ${getDamageTypeColor("totalChampionDamage")} ${trueEnd}% ${physicalEnd}%,
    ${getDamageTypeColor("totalChampionMagicDamage")} ${physicalEnd}% ${magicEnd}%,
    ${getDamageTypeColor("totalChampionAbilityDamage")} ${magicEnd}% ${abilityEnd}%
  )`;
};

export const getHealShieldPercentages = (
  heal: number,
  shield: number,
  total: number
): { healPercent: number; shieldPercent: number } => {
  if (total === 0) {
    return { healPercent: 0, shieldPercent: 0 };
  }

  return {
    healPercent: (heal / total) * 100,
    shieldPercent: (shield / total) * 100,
  };
};

export const getHealShieldTypeColor = (type: string): string => {
  switch (type) {
    case "getHealTypeColor":
      return "rgba(34, 197, 94, 0.7)"; // green (70% opacity)
    case "shield":
      return "rgba(156, 163, 175, 0.7)"; // gray (70% opacity)
    default:
      return "rgba(107, 114, 128, 0.7)"; // fallback gray
  }
};

export const buildHealShieldGradient = (
  healPercent: number,
  shieldPercent: number
): string => {
  const healEnd = healPercent;
  const shieldEnd = healEnd + shieldPercent;

  return `linear-gradient(to right,
    ${getHealShieldTypeColor("heal")} 0% ${healEnd}%,
    ${getHealShieldTypeColor("shield")} ${healEnd}% ${shieldEnd}%
  )`;
};
