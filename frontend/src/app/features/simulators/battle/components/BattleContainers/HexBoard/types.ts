export interface ChampionData {
  name: string;
  traitsList: string[];
  image: string;
  cost: number;
  starLevel: number;
  items?: string[];
  [key: string]: any;
}

export interface BoardState {
  [cellId: string]: {
    champion: ChampionData | null;
    starLevel: number;
  };
}

export interface ChampionPosition {
  championName: string;
  cellId: string;
  cost: number;
  traitsList: string[];
  starLevel: number | 1;
}
export interface TraitCountMap {
  [trait: string]: number;
}

export interface ChampionMap {
  championName: string;
  cellId: string;
  cost: number;
  traitsList: string[];
  starLevel: number | 1;
}

export interface HexBoardContextType {
  boardState: BoardState;
  boardArray: ChampionPosition[];

  playerSunder: boolean;
  setPlayerSunder: React.Dispatch<React.SetStateAction<boolean>>;

  playerShred: boolean;
  setPlayerShred: React.Dispatch<React.SetStateAction<boolean>>;

  opponentSunder: boolean;
  setOpponentSunder: React.Dispatch<React.SetStateAction<boolean>>;

  opponentShred: boolean;
  setOpponentShred: React.Dispatch<React.SetStateAction<boolean>>;

  playerTraitsObj: TraitCountMap;
  opponentTraitsObj: TraitCountMap;

  playerChampionArray: ChampionMap[];
  setPlayerChampionArray: React.Dispatch<React.SetStateAction<ChampionMap[]>>;

  opponentChampionArray: ChampionMap[];
  setOpponentChampionArray: React.Dispatch<React.SetStateAction<ChampionMap[]>>;

  playerChampionCostCount: number;
  setPlayerChampionCostCount: React.Dispatch<React.SetStateAction<number>>;

  opponentChampionCostCount: number;
  setOpponentChampionCostCount: React.Dispatch<React.SetStateAction<number>>;

  orderedPlayerTraits: [string, number][];
  orderedOpponentTraits: [string, number][];

  setOrderedPlayerTraits: React.Dispatch<React.SetStateAction<[string, number][]>>;
  setOrderedOpponentTraits: React.Dispatch<React.SetStateAction<[string, number][]>>;

  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setBoardArray: React.Dispatch<React.SetStateAction<ChampionPosition[]>>;

  placeChampion: (cellId: string, championData: ChampionData) => void;
  removeChampion: (cellId: string) => void;
  moveChampion: (fromCellId: string, toCellId: string) => void;
  getChampion: (cellId: string) => ChampionData | null;
  setChampionStarLevel: (cellId: string, starLevel: number) => void;
  addItemToChampion: (cellId: string, itemName: string) => void;
  removeItemFromChampion: (cellId: string, itemName: string) => void;
}

export type TraitCountEntry = [string, number];

export interface HexCellProps {
  cellId: string;
  team: "player" | "opponent" | "";
}
