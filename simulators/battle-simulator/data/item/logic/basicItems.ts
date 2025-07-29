import { Item, ItemProps } from "../item";
import { Champion } from "../../champion/champion";

function getFormattedTime(champion: any) {
  const mins = Math.floor(champion.battleTime / 6000);
  const secs = Math.floor((champion.battleTime % 6000) / 100);
  const cents = champion.battleTime % 100;
  const formattedTime = `${mins}:${secs.toString().padStart(2, "0")}:${cents
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
}

// Basic Stats
export function addAdditionalItemStatistics(champion: Champion) {
  if (!champion || !champion.items || !champion.items.length)
    return "No items equipped";

  if (champion.items.length > 0 && champion.items.length <= 3) {
    champion.items.forEach((item: ItemProps) => {
      champion.currentHp += item.additionalHealth || 0;
      champion.statsByStarLevel[champion.starLevel].hp += item.additionalHealth || 0;
      champion.currentHp *= item.additionalPercentageHealth || 1;
      champion.statsByStarLevel[champion.starLevel].hp *= item.additionalPercentageHealth || 1;
      champion.statsByStarLevel[champion.starLevel].hp *= item.additionalPercentageHealth || 1;
      champion.statsByStarLevel[champion.starLevel].armor += item.additionalArmor || 0;
      champion.statsByStarLevel[champion.starLevel].magicResist += item.additionalMagicResist || 0;
      champion.statsByStarLevel[champion.starLevel].attackDamage *= item.additionalAttackDamage || 1;
      champion.damageAmp += item.additionalDamageAmp || 0;
      champion.attackSpeed *= item.additionalAttackSpeed || 1;
      champion.manaPerAttack += item.additionalManaPerAttack || 0;
      champion.range += item.additionalAttackRange || 0;
      champion.attackCritChance += item.additionalCritChance || 0;
      champion.attackCritDamage += item.additionalCritDamage || 0;
      champion.durability += item.additionalDurability || 0;
      champion.statsByStarLevel[champion.starLevel].reduction += item.reductionAmount || 0;
      champion.abilityPower += item.additionalAbilityPower || 0;
      champion.mana += item.additionalStartingMana || 0;
      champion.abilityManaCost -= item.reducedMaxMana || 0;
    });
  } else if (champion.items.length === 0) {
    console.log("No items equipped");
  } else if (champion.items.length >= 4) {
    console.log("Max 3 items can be equipped");
  }
}
