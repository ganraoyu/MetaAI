import { traitsSET13 } from "./SET13/trait-data"
import { Trait } from "./types"

const traitsBySet: Record<string, any> = {
  'SET13': traitsSET13
}

export function getTraitByName(traitName: string, set: string) {
  const traits = traitsBySet[set];
  const trait = traits.find((t: Trait) => t.name === traitName);

  return trait;
}