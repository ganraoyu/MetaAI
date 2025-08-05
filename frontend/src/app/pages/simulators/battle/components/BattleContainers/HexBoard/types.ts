export interface ChampionData {
  name: string;
  traitsList: string[];
  image: string;
  cost: number;
  starLevel: number;
  [key: string]: any;
};

export interface BoardState {
  [cellId: string]: {
    champion: ChampionData | null;
    starLevel: number;
  };
};

export interface ChampionPosition {
  championName: string;
  cellId: string;
  traitsList: string[];
  starLevel: number | 1;
};

export interface TraitCountMap {
  [trait: string]: number;
};

export interface HexBoardContextType {
  boardState: BoardState;
  boardArray: ChampionPosition[];
  playerTraitsObj: TraitCountMap;
  opponentTraitsObj: TraitCountMap;
  orderedPlayerTraits: [string, number][];
  orderedOpponentTraits: [string, number][];
  setOrderedPlayerTraits: React.Dispatch<
    React.SetStateAction<[string, number][]>
  >;
  setOrderedOpponentTraits: React.Dispatch<
    React.SetStateAction<[string, number][]>
  >;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setBoardArray: React.Dispatch<React.SetStateAction<ChampionPosition[]>>;
  placeChampion: (cellId: string, championData: ChampionData) => void;
  removeChampion: (cellId: string) => void;
  moveChampion: (fromCellId: string, toCellId: string) => void;
  getChampion: (cellId: string) => ChampionData | null;
  setChampionStarLevel: (cellId: string, starLevel: number) => void;
};

export type TraitCountEntry = [string, number]