import { useEffect } from "react";
import { ChampionPosition, TraitCountMap, TraitCountEntry, ChampionMap } from "./types";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";

export function useChampionMapEffect(
  boardArray: ChampionPosition[],
  setPlayerChampionsCostCount: React.Dispatch<React.SetStateAction<number>>,
  setOpponentChampionsCostCount: React.Dispatch<React.SetStateAction<number>>,
  setPlayerChampionArray: React.Dispatch<React.SetStateAction<ChampionMap[]>>,
  setOpponentChampionArray: React.Dispatch<React.SetStateAction<ChampionMap[]>>
) {

  useEffect(() => { 
    let playerChampionsCostCount: number = 0;
    const playerChampions: ChampionMap[] = [];

    let opponentChampionsCostCount: number = 0;
    const opponentChampions: ChampionMap[] = [];

    for (const champion of boardArray) {
      const row = parseInt(champion.cellId[1]);
      if (row >= 4) {
        playerChampions.push(champion);
        playerChampionsCostCount += champion.cost;
        
      } else {
        opponentChampions.push(champion);
        opponentChampionsCostCount += champion.cost;
      }
    }

    setPlayerChampionArray(playerChampions);
    setPlayerChampionsCostCount(playerChampionsCostCount);
    setOpponentChampionArray(opponentChampions);
    setOpponentChampionsCostCount(opponentChampionsCostCount);
  }, [boardArray, setPlayerChampionArray, setOpponentChampionArray]);
};



export function useTraitCountingEffect(
  boardArray: ChampionPosition[],
  setPlayerTraitsArray: React.Dispatch<React.SetStateAction<TraitCountMap>>,
  setOpponentTraitsArray: React.Dispatch<React.SetStateAction<TraitCountMap>>
) {
  useEffect(() => {
    const playerTraits: TraitCountMap = {};
    const opponentTraits: TraitCountMap = {};
    const filteredBoardArray: ChampionPosition[] = [];

    for (const champion of boardArray) {
      const row = parseInt(champion.cellId[1]);
      const isPlayer = row >= 4;

      if (
        !filteredBoardArray.some(
          (c) =>
            c.championName === champion.championName &&
            (parseInt(c.cellId[1]) >= 4) === isPlayer
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
  }, [boardArray, setPlayerTraitsArray, setOpponentTraitsArray]);
};

export function useTraitOrderingEffect(
  boardArray: ChampionPosition[],
  playerTraitsObj: TraitCountMap,
  opponentTraitsObj: TraitCountMap,
  setOrderedPlayerTraits: React.Dispatch<React.SetStateAction<TraitCountEntry[]>>,
  setOrderedOpponentTraits: React.Dispatch<React.SetStateAction<TraitCountEntry[]>>
) {
  const { set } = useTFTSetContext();

  useEffect(() => {
    const orderedPlayerTraits = Object.entries(playerTraitsObj).sort(
      ([, countA], [, countB]) => countB - countA
    );
    const orderedOpponentTraits = Object.entries(opponentTraitsObj).sort(
      ([, countA], [, countB]) => countB - countA
    );

    setOrderedPlayerTraits(orderedPlayerTraits);
    setOrderedOpponentTraits(orderedOpponentTraits);

  }, [boardArray, playerTraitsObj, opponentTraitsObj, setOrderedPlayerTraits, setOrderedOpponentTraits, set]);
}
