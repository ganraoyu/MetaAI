import { traits as Set13Traits } from "../SET13/trait-data";

export const getTraitBySet = (set: string) => {
    switch (set) {
        case 'SET13':
            return Set13Traits;
        case 'SET14':
            return [];
    }
}