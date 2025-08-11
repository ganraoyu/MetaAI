import React, { createContext, useContext, useState } from "react";
import {
  useTraitCountingEffect,
  useTraitOrderingEffect,
} from "./useHexBoardEffects.ts";
import {
  ChampionData,
  BoardState,
  ChampionPosition,
  TraitCountMap,
  HexBoardContextType,
  TraitCountEntry,
} from "./types";

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

  const [playerTraitsObj, setPlayerTraitsArray] = useState<TraitCountMap>({});
  const [opponentTraitsObj, setOpponentTraitsArray] = useState<TraitCountMap>(
    {}
  );

  const [orderedPlayerTraits, setOrderedPlayerTraits] = useState<
    TraitCountEntry[]
  >([]);
  const [orderedOpponentTraits, setOrderedOpponentTraits] = useState<
    TraitCountEntry[]
  >([]);
  useTraitCountingEffect(
    boardArray,
    setPlayerTraitsArray,
    setOpponentTraitsArray
  );

  useTraitOrderingEffect(
    boardArray,
    playerTraitsObj,
    opponentTraitsObj,
    setOrderedPlayerTraits,
    setOrderedOpponentTraits
  );

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

  const setChampionStarLevel = (cellId: string, starLevel: number) => {
    setBoardState((prev) => {
      const cell = prev[cellId];
      if (!cell) return prev;

      const currentChampion = cell.champion;

      return {
        ...prev,
        [cellId]: {
          ...cell,
          starLevel,
          champion: {
            ...currentChampion,
            starLevel,
          } as ChampionData,
        },
      };
    });

    setBoardArray((prev) =>
      prev.map((entry) =>
        entry.cellId === cellId ? { ...entry, starLevel } : entry
      )
    );
  };

  const addItemToChampion = (cellId: string, itemName: string) => {
    setBoardState((prev) => {
      const cell = prev[cellId];
      if (!cell) return prev; // no champion here

      const champion = cell.champion;
      const existingItems = champion?.items || [];

      return {
        ...prev,
        [cellId]: {
          ...cell,
          champion: {
            ...champion,
            items: [...existingItems, itemName],
          } as ChampionData,
        },
      };
    });
  };

  const removeItemFromChampion = (cellId: string, itemName: string) => {
    setBoardState((prev) => {
      const cell = prev[cellId];
      if (!cell) return prev;

      const champion = cell?.champion;
      const itemList = champion?.items;

      const newItemList = itemList?.filter((item: any) => item.name === itemName);

      return {
        ...prev,
        [cellId]: {
          ...cell,
          champion: {
            ...champion,
            items: newItemList
          } as ChampionData,
        }
      }
    })
  }

  return (
    <HexBoardContext.Provider
      value={{
        boardState,
        boardArray,
        playerTraitsObj,
        opponentTraitsObj,
        orderedPlayerTraits,
        setOrderedPlayerTraits,
        orderedOpponentTraits,
        setOrderedOpponentTraits,
        setBoardState,
        setBoardArray,
        placeChampion,
        removeChampion,
        moveChampion,
        getChampion,
        setChampionStarLevel,
        addItemToChampion,
        removeItemFromChampion
      }}
    >
      {children}
    </HexBoardContext.Provider>
  );
};
