import { useState, useEffect, useMemo } from "react";
import { UnitAugmentProvider, useUnitAugmentContext } from "./UnitAugmentContext";
import { useTFTSetContext } from "../../../../../utilities/TFTSetContext";
import { ChampionHoverInfo } from "./ChampionHoverInfo";
import { UnitFilter } from "./Filters/UnitFilter";
import { getChampionBySet } from "../../data/Loaders/championDataLoader";

export const UnitAugmentContainer = () => {
    return (
        <UnitAugmentProvider>
            <UnitAugmentContainerContent />
        </UnitAugmentProvider>
    );
};

const UnitAugmentContainerContent = () => {
    const { set } = useTFTSetContext();
    const { toggleUnitsOrAugments, sortByCost, sortByAlphabet } = useUnitAugmentContext();

    const [champions, setChampions] = useState(getChampionBySet(set));
    const [hoveredChampionId, setHoveredChampionId] = useState<string | null>(null);
    const [clickedChampionId, setClickedChampionId] = useState<string | null>(null);

    useEffect(() => {
        setChampions(getChampionBySet(set));
    }, [set]);

    // Sort champions based on the active sorting method
    const sortedChampions = useMemo(() => {
        if (!toggleUnitsOrAugments) return [];
        
        const championList = [...champions || []];
        
        if (sortByAlphabet) {
            return championList.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        if (sortByCost) {
            return championList.sort((a, b) => a.cost - b.cost);
        }
        
        return championList;
    }, [champions, toggleUnitsOrAugments, sortByAlphabet, sortByCost]);

    // Render a single champion card
    const renderChampionCard = (champion: any) => (
        <div key={champion.name} className="flex flex-col items-center relative">
            <img    
                src={champion.image} 
                alt={champion.name} 
                className={`w-9 h-9 rounded-[0.09rem] outline outline-2 ${
                    champion.cost === 1 ? "outline-gray-400" :
                    champion.cost === 2 ? "outline-blue-500" :
                    champion.cost === 3 ? "outline-blue-500" :
                    champion.cost === 4 ? "outline-purple-700" :
                    champion.cost === 5 ? "outline-orange-500" :
                    "outline-red-500"
                }`}
                onMouseEnter={() => setHoveredChampionId(champion.name)}
                onMouseLeave={() => setHoveredChampionId(null)}
                onClick={() => setClickedChampionId(
                    clickedChampionId === champion.name ? null : champion.name
                )}
            />
            <p
                className="text-[0.7rem] w-12 truncate overflow-hidden whitespace-nowrap text-center"
                title={champion.name}
            >
                {champion.name}
            </p>
            {(hoveredChampionId === champion.name || clickedChampionId === champion.name) && (
                <ChampionHoverInfo champion={champion} />
            )}
        </div>
    );

    return (
        <div className="select-none">
            <div>
                <UnitFilter />
            </div>

            {/* Champion List */}
            <div className="flex flex-wrap items-center w-[46rem] gap-[0.3rem] bg-hexCellComponents p-6 rounded-lg">
                {sortedChampions.map(renderChampionCard)}
            </div>
        </div>
    );
};