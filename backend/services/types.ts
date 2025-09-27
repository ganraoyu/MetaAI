interface Unit {
  character_id: string;
  itemNames: string[];
  tier: number;
}

interface PlayerData {
  placement: number;
  units: Unit[];
  traits?: Trait[];
}

interface ChampionStats {
  totalGames: number;
  wins: number;
  placements: number[];
}

interface TraitStats {
  totalGames: number;
  wins: number;
  placements: number[];
}

interface Trait {
  traitName: string;
}

export {
  Unit,
  PlayerData,
  ChampionStats,
  Trait,
  TraitStats
}