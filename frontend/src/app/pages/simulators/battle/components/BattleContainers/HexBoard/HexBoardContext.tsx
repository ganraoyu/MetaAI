import React, { createContext, useContext, useState } from "react"
import {
  useChampionMapEffect,
  useTraitCountingEffect,
  useTraitOrderingEffect,
} from "./useHexBoardEffects.ts"
import {
  ChampionData,
  BoardState,
  ChampionPosition,
  TraitCountMap,
  HexBoardContextType,
  TraitCountEntry,
  ChampionMap,
} from "./types.ts"

/**
 * Context for the HexBoard providing board state and operations
 * @typedef {Object} HexBoardContextType
 * @property {BoardState} boardState Current mapping of cellId to champion data and star level
 * @property {ChampionPosition[]} boardArray Array representation of champions on the board
 * @property {TraitCountMap} playerTraitsObj Count of player team traits
 * @property {TraitCountMap} opponentTraitsObj Count of opponent team traits
 * @property {TraitCountEntry[]} orderedPlayerTraits Ordered player traits for display
 * @property {TraitCountEntry[]} orderedOpponentTraits Ordered opponent traits for display
 * @property {Function} setOrderedPlayerTraits Setter for ordered player traits
 * @property {Function} setOrderedOpponentTraits Setter for ordered opponent traits
 * @property {Function} setBoardState Setter for board state
 * @property {Function} setBoardArray Setter for board array
 * @property {Function} placeChampion Place a champion in a specific cell
 * @property {Function} removeChampion Remove a champion from a specific cell
 * @property {Function} moveChampion Move a champion from one cell to another
 * @property {Function} getChampion Get the champion data at a specific cell
 * @property {Function} setChampionStarLevel Update a champion's star level
 * @property {Function} addItemToChampion Add an item to a champion
 * @property {Function} removeItemFromChampion Remove an item from a champion
*/

const HexBoardContext = createContext<HexBoardContextType | undefined>(undefined)

/**
 * Custom hook to access HexBoard context
 * Must be used within a HexBoardProvider
 * @throws Will throw an error if used outside HexBoardProvider
 * @returns {HexBoardContextType} HexBoard context values and operations
*/
export const useHexBoardContext = (): HexBoardContextType => {
  const context = useContext(HexBoardContext)
  if (!context) {
    throw new Error(
      "useHexBoardContext must be used within a HexBoardProvider"
    )
  }
  return context
}

/**
 * HexBoardProvider
 * Provides HexBoard state and operations to child components
 * Handles placing moving and removing champions updating star levels managing items and calculating trait counts for both player and opponent
 * @param {Object} props
 * @param {React.ReactNode} props.children Child components wrapped by this provider
 * @returns {JSX.Element} Provider component exposing HexBoard context
*/

export const HexBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [boardState, setBoardState] = useState<BoardState>({})
  const [boardArray, setBoardArray] = useState<ChampionPosition[]>([])

  const [playerChampionArray, setPlayerChampionArray] = useState<ChampionMap[]>([])
  const [opponentChampionArray, setOpponentChampionArray] = useState<ChampionMap[]>([])

  const [playerChampionCostCount, setPlayerChampionCostCount] = useState<number>(0);
  const [opponentChampionCostCount, setOpponentChampionCostCount] = useState<number>(0);
  
  const [playerTraitsObj, setPlayerTraitsArray] = useState<TraitCountMap>({})
  const [opponentTraitsObj, setOpponentTraitsArray] = useState<TraitCountMap>({})

  const [orderedPlayerTraits, setOrderedPlayerTraits] = useState<TraitCountEntry[]>([])
  const [orderedOpponentTraits, setOrderedOpponentTraits] = useState<TraitCountEntry[]>([])


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

  useChampionMapEffect(
    boardArray,
    setPlayerChampionCostCount,
    setOpponentChampionCostCount,
    setPlayerChampionArray,    
    setOpponentChampionArray,
  );

  const placeChampion = (cellId: string, championData: ChampionData) => {
    setBoardState((prev) => ({
      ...prev,
      [cellId]: {
        champion: championData,
        starLevel: championData.starLevel || 1,
      },
    }))

    setBoardArray((prev) => {
      const filtered = prev.filter((entry) => entry.cellId !== cellId)
      return [
        ...filtered,
        {
          championName: championData.name,
          cellId,
          cost: championData.cost,
          traitsList: championData.traitsList,
          starLevel: championData.starLevel || 1,
        },
      ]
    })
  };

  const removeChampion = (cellId: string) => {
    setBoardState((prev) => {
      const newState = { ...prev }
      delete newState[cellId]
      return newState
    })
    setBoardArray((prev) => prev.filter((entry) => entry.cellId !== cellId))
  };

  const moveChampion = (fromCellId: string, toCellId: string) => {
    setBoardState((prev) => {
      const championData = prev[fromCellId]
      if (!championData) return prev

      const newState = { ...prev }
      newState[toCellId] = championData
      delete newState[fromCellId]

      return newState
    });

    setBoardArray((prev) => {
      const championEntry = prev.find((entry) => entry.cellId === fromCellId)
      if (!championEntry) return prev

      const filtered = prev.filter((entry) => entry.cellId !== fromCellId)
      return [
        ...filtered,
        {
          championName: championEntry.championName,
          cellId: toCellId,
          cost: championEntry.cost,
          traitsList: championEntry.traitsList,
          starLevel: championEntry.starLevel,
        },
      ]
    });
  };

  const getChampion = (cellId: string): ChampionData | null => {
    return boardState[cellId]?.champion || null
  };

  const setChampionStarLevel = (cellId: string, starLevel: number) => {
    setBoardState((prev) => {
      const cell = prev[cellId]
      if (!cell) return prev

      const currentChampion = cell.champion
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
      const cell = prev[cellId]
      if (!cell) return prev

      const champion = cell.champion
      const existingItems = champion?.items || []

      return {
        ...prev,
        [cellId]: {
          ...cell,
          champion: {
            ...champion,
            items: [...existingItems, itemName],
          } as ChampionData,
        },
      }
    });
  };

  const removeItemFromChampion = (cellId: string, itemName: string) => {
    setBoardState((prev) => {
      const cell = prev[cellId]
      if (!cell) return prev

      const champion = cell?.champion
      const itemList = champion?.items
      const newItemList = itemList?.filter((item: any) => item !== itemName)

      return {
        ...prev,
        [cellId]: {
          ...cell,
          champion: {
            ...champion,
            items: newItemList,
          } as ChampionData,
        },
      }
    });
  };

  return (
    <HexBoardContext.Provider
      value={{
        boardState,
        boardArray,
        playerChampionArray, 
        setPlayerChampionArray,
        playerChampionCostCount, 
        setPlayerChampionCostCount,
        opponentChampionCostCount, 
        setOpponentChampionCostCount,
        opponentChampionArray, 
        setOpponentChampionArray,
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
        removeItemFromChampion,
      }}
    >
      {children}
    </HexBoardContext.Provider>
  );
};
