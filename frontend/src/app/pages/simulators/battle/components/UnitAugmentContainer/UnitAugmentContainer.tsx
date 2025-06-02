import { useState, useEffect } from "react";
import { useTFTSetContext } from "../../../../../utilities/TFTSetContext";
import { ChampionHoverInfo } from "./ChampionHoverInfo";
import { UnitFilter } from "./Filters/UnitFilter";
import { getChampionBySet } from "../../data/championDataLoader";

export const UnitAugmentContainer = () => {
    const { set } = useTFTSetContext();
    const [champions, setChampions] = useState(getChampionBySet(set));
    const [hoveredChampionId, setHoveredChampionId] = useState<string | null>(null);
    const [clickedChampionId, setClickedChampionId] = useState<string | null>(null);

    // Update champions when set changes
    useEffect(() => {
        setChampions(getChampionBySet(set));
    }, [set]);

    return (
        <div className="select-none">
            <div className=''>
                <UnitFilter />
            </div>
            <div className="flex flex-wrap items-center w-[46rem] gap-[0.3rem] bg-hexCellComponents p-6 rounded-lg">
              {(champions || []).map((champion) => (
                <div key={champion.name} className="flex flex-col items-center relative ">
                        <img    
                            src={champion.image} 
                            alt={champion.name} 
                            className={`w-10 h-10 rounded-[0.09rem] outline outline-2 ${
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
                            <ChampionHoverInfo />
                        )}
                </div>
              ))}  
            </div>
        </div>
    )
};