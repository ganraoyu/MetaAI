import { traitsSET13 } from "./SET13/trait-data"
import { Trait } from "./types"
import { basicItems, combinedItems } from "./items/item-data";
const traitsBySet: Record<string, any> = {
  'SET13': traitsSET13
}

export function getTraitByName(traitName: string, set: string) {
  const traits = traitsBySet[set];
  const trait = traits.find((t: Trait) => t.name === traitName);

  return trait;
};

const allItems = [...basicItems, ...combinedItems];
// const allItems = [...basicItems, ...combinedItems, ...artifactItems, ...radiantItems, ...supportItems, ...emblemItems];

export function getItemByName(itemName: string) {
  return allItems.find(i => i.name === itemName);
};