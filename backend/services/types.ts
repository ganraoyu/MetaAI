interface Unit {
  character_id: string;
  itemNames: string[];
  tier: number;
}

interface PlayerItem {
  items: string[];
}

interface PlayerData {
  placement: number;
  units: Unit[];
  traits?: Trait[];
  items?: PlayerItem[];
}

interface ChampionStats {
  totalGames: number;
  wins: number;
  placements: number[];
}

interface ChampionItemStats {
  
}

interface TraitStats {
  totalGames: number;
  wins: number;
  placements: number[];
}

interface Trait {
  traitName: string;
}

interface ItemStats {
  totalGames: number;
  wins: number;
  placements: number[];
}

export {
  Unit,
  PlayerData,
  ChampionStats,
  ChampionItemStats,
  Trait,
  TraitStats,
  ItemStats,
}