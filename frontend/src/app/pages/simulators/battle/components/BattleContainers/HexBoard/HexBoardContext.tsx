import React, { createContext, useContext, useState, useEffect } from "react";
import { getTraitByName } from "../../../data/dataUtils";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";
import { ChampionData, BoardState, ChampionPosition, TraitCountMap, HexBoardContextType, TraitCountEntry} from './types'

const HexBoardContext = createContext<HexBoardContextType | undefined>(undefined);

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
  const { set } = useTFTSetContext();

  const [boardState, setBoardState] = useState<BoardState>({});
  const [boardArray, setBoardArray] = useState<ChampionPosition[]>([]);

  const [playerTraitsObj, setPlayerTraitsArray] = useState<TraitCountMap>({});
  const [opponentTraitsObj, setOpponentTraitsArray] = useState<TraitCountMap>({});

  const [orderedPlayerTraits, setOrderedPlayerTraits] = useState<TraitCountEntry[]>([]);
  const [orderedOpponentTraits, setOrderedOpponentTraits] = useState<TraitCountEntry[]>([]);

  // Separate and deduplicate player and opponent champions, then count traits.
  useEffect(() => {
    const playerTraits: TraitCountMap = {};
    const opponentTraits: TraitCountMap = {};
    const filteredBoardArray: ChampionPosition[] = [];

    for (const champion of boardArray) {
      const row = parseInt(champion.cellId[1]); // e.g. 'r3c2' → '3'
      const isPlayer = row >= 4;

      if (
        !filteredBoardArray.some(
          (c) =>
            c.championName === champion.championName &&
            parseInt(c.cellId[1]) >= 4 === isPlayer
        )
      ) {
        filteredBoardArray.push(champion);
      }
    }

    for (const champion of filteredBoardArray) {
      const row = parseInt(champion.cellId[1]);
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
    console.log(boardArray);
  }, [boardArray]);

  // Order player traits by count descending.
  useEffect(() => {
    const fullTraitsData: object[] = [];

    for (const champion of boardArray) {
      champion.traitsList.forEach((traitName) => {
        const traitData = getTraitByName(traitName, set);
        if (traitData) {
          fullTraitsData.push(traitData);
          console.log(traitData);
          console.log(playerTraitsObj);
        }
      });
    }

    const orderedTraits = Object.entries(playerTraitsObj).sort(
      ([, countA], [, countB]) => countB - countA
    );
    setOrderedPlayerTraits(orderedTraits);
  }, [playerTraitsObj]);

  // Functions to update board state and array:
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
      }}
    >
      {children}
    </HexBoardContext.Provider>
  );
};
