export interface ItemMap {
  [key: string]: {
    name: string;
    image: string;
  };
}

export const itemMap: ItemMap = {
  "Artifact Fishbones": { name: "Fishbones (Artifact)", image: "/assets/items/combined/Fishbones.png" },
  "Fishbones": { name: "Fishbones (Artifact)", image: "/assets/items/combined/Fishbones.png" },

  "Event PMBossBadge": { name: "PM Boss Badge (Event)", image: "/assets/items/combined/PMBossBadge.png" },
  "pmbossbadge": { name: "PM Boss Badge (Event)", image: "/assets/items/combined/PMBossBadge.png" },

  "Item ChallengerEmblem": { name: "Challenger Emblem (Item)", image: "/assets/items/combined/ChallengerEmblemItem.png" },
  "ChallengerEmblemItem": { name: "Challenger Emblem (Item)", image: "/assets/items/combined/ChallengerEmblemItem.png" },


  // ---------------------
  // Fallback / unknown placeholder
  // ---------------------
  "UNKNOWN_ITEM": { name: "Unknown Item", image: "/assets/items/combined/placeholder.png" },
};


export function normalizeItemId(rawId?: string): string {
  if (!rawId) return 'UNKNOWN_ITEM';
  const id = String(rawId).trim();
  const tries = new Set<string>();

  const up = id.toUpperCase();
  tries.add(id);
  tries.add(up);

  // If it ends with RADIANT (or similar), try without that suffix
  if (/RADIANT$/i.test(up)) {
    const withoutRadiant = up.replace(/RADIANT$/i, '');
    tries.add(withoutRadiant);
    // also try lowercased original base
    tries.add(withoutRadiant.toLowerCase());
  }

  // Normalize TFT numbered prefixes, e.g. TFT5_ITEM_ -> TFT_ITEM_
  const normalizedPrefix = up.replace(/^TFT\d+_/, 'TFT_');
  tries.add(normalizedPrefix);

  // Also try swapping TFT_ back to TFT_ITEM_ if necessary
  if (/^TFT_/.test(normalizedPrefix)) {
    tries.add(normalizedPrefix.replace(/^TFT_/, 'TFT_ITEM_'));
  }

  // Try a few casing variants
  const variants = Array.from(tries);
  for (const candidate of variants) {
    if ((itemMap as any)[candidate]) return candidate;
  }

  // Try matching by removing any trailing numbers or odd suffixes
  const stripped = up.replace(/[^A-Z0-9_]+$/i, '');
  if ((itemMap as any)[stripped]) return stripped;

  return 'UNKNOWN_ITEM';
}

/**
 * Get item info (name + image) for a backend itemId. Always returns a valid
 * object (falls back to UNKNOWN_ITEM).
 */
export function getItemInfo(itemId?: string) {
  const key = normalizeItemId(itemId);
  return (itemMap as any)[key] || itemMap['UNKNOWN_ITEM'];
}
