import { champions as set13Champions } from "../SET13/champion-data.ts";

export const getChampionBySet = (set: string) => {
    switch (set){
        case 'SET13':
            return set13Champions;
        case 'SET14':
            return [];
    } 
}