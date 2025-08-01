import React, { createContext, useContext, useState, useEffect } from "react";

interface ChampionData {
  name: string;
  traitsList: string[];
  image: string;
  cost: number;
  starLevel: number;
  [key: string]: any;
}

interface BoardState {
  [cellId: string]: {
    champion: ChampionData | null;
    starLevel: number;
  };
}

interface ChampionPosition {
  championName: string;
  cellId: string;
  traitsList: string[];
  starLevel: number | 1;
}

interface TraitCountMap {
  [trait: string]: number;
}

interface HexBoardContextType {
  boardState: BoardState;
  boardArray: ChampionPosition[];
  playerTraitsArray: TraitCountMap;
  opponentTraitsArray: TraitCountMap;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setBoardArray: React.Dispatch<React.SetStateAction<ChampionPosition[]>>;
  placeChampion: (cellId: string, championData: ChampionData) => void;
  removeChampion: (cellId: string) => void;
  moveChampion: (fromCellId: string, toCellId: string) => void;
  getChampion: (cellId: string) => ChampionData | null;
}

const HexBoardContext = createContext<HexBoardContextType | undefined>(
  undefined
);

export const useHexBoardContext = () => {
  const context = useContext(HexBoardContext);
  if (!context) {
    throw new Error(
      "useHexBoardContext must be used within a HexBoardProvider"
    );
  }
  return context;
};

export const HexBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [boardState, setBoardState] = useState<BoardState>({});
  const [boardArray, setBoardArray] = useState<ChampionPosition[]>([]);
  const [playerTraitsArray, setPlayerTraitsArray] = useState<TraitCountMap>({});
  const [opponentTraitsArray, setOpponentTraitsArray] = useState<TraitCountMap>({});

  useEffect(() => {
    const playerTraits: TraitCountMap = {};
    const opponentTraits: TraitCountMap = {};
    
    const filteredBoardArray: ChampionPosition[] = [];

    for (const champion of boardArray) {
      const row = parseInt(champion.cellId[1]); // e.g. 'r3c2' → '3'
      const isPlayer = row >= 4;

      if (!filteredBoardArray.some(c =>
        c.championName === champion.championName &&
        ((parseInt(c.cellId[1]) >= 4) === isPlayer) 
      )) {
        filteredBoardArray.push(champion);
      }
      
    }

    for (const champion of filteredBoardArray) {
      const row = parseInt(champion.cellId[1]); // e.g. "r3c2" → '3'
      if (row >= 4) {
        for (const trait of champion.traitsList) {
          playerTraits[trait] = (playerTraits[trait] || 0) + 1;
        }
      } else {
        for (const trait of champion.traitsList) {
          opponentTraits[trait] = (opponentTraits[trait] || 0) + 1;
        }
      }
    }

    setPlayerTraitsArray(playerTraits);
    setOpponentTraitsArray(opponentTraits);
  }, [boardArray]);

  const placeChampion = (cellId: string, championData: ChampionData) => {
    setBoardState((prev) => ({
      ...prev,
      [cellId]: {
        champion: championData,
        starLevel: championData.starLevel || 1,
      },
    }));

    setBoardArray((prev) => {
      const filtered = prev.filter((entry) => entry.cellId !== cellId);
      return [
        ...filtered,
        {
          championName: championData.name,
          cellId,
          traitsList: championData.traitsList,
          starLevel: championData.starLevel || 1,
        },
      ];
    });
  };

  const removeChampion = (cellId: string) => {
    setBoardState((prev) => {
      const newState = { ...prev };
      delete newState[cellId];
      return newState;
    });

    setBoardArray((prev) => prev.filter((entry) => entry.cellId !== cellId));
  };

  const moveChampion = (fromCellId: string, toCellId: string) => {
    setBoardState((prev) => {
      const championData = prev[fromCellId];
      if (!championData) return prev;

      const newState = { ...prev };
      newState[toCellId] = championData;
      delete newState[fromCellId];

      return newState;
    });

    setBoardArray((prev) => {
      const championEntry = prev.find((entry) => entry.cellId === fromCellId);
      if (!championEntry) return prev;

      const filtered = prev.filter((entry) => entry.cellId !== fromCellId);

      return [
        ...filtered,
        {
          championName: championEntry.championName,
          cellId: toCellId,
          traitsList: championEntry.traitsList,
          starLevel: championEntry.starLevel,
        },
      ];
    });
  };

  const getChampion = (cellId: string): ChampionData | null => {
    return boardState[cellId]?.champion || null;
  };

  return (
    <HexBoardContext.Provider
      value={{
        boardState,
        boardArray,
        playerTraitsArray,
        opponentTraitsArray,
        setBoardState,
        setBoardArray,
        placeChampion,
        removeChampion,
        moveChampion,
        getChampion,
      }}
    >
      {children}
    </HexBoardContext.Provider>
  );
};
