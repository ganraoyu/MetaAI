import React, { createContext, useContext, useState } from "react";

interface ChampionData {
  name: string;
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
  champion: string;
  cellId: string;
}

interface HexBoardContextType {
  boardState: BoardState;
  boardArray: ChampionPosition[];
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

  const placeChampion = (cellId: string, championData: ChampionData) => {
    // Update boardState
    setBoardState((prev) => ({
      ...prev,
      [cellId]: {
        champion: championData,
        starLevel: championData.starLevel || 1,
      },
    }));

    // Update boardArray - remove old entry for this cell, then add new
    setBoardArray((prev) => {
      const filtered = prev.filter((entry) => entry.cellId !== cellId);
      filtered.push({ champion: championData.name, cellId });
      return filtered;
    });

    console.log(`Placed ${championData.name} in cell ${cellId}`);
     console.log(boardArray);
  };

  const removeChampion = (cellId: string) => {
    setBoardState((prev) => {
      const newState = { ...prev };
      delete newState[cellId];
      return newState;
    });

    // Remove from boardArray by cellId
    setBoardArray((prev) => prev.filter((entry) => entry.cellId !== cellId));

    console.log(`Removed champion from cell ${cellId}`);
    console.log(boardArray);
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
      filtered.push({ champion: championEntry.champion, cellId: toCellId });

      return filtered;
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
