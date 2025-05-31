import { useState } from "react";
import { champions } from "../../data/SET13/champion-data"
import { ChampionHoverInfo } from "./ChampionHoverInfo";

export const UnitAugmentContainer = () => {
    const [hoveredChampionId, setHoveredChampionId] = useState<string | null>(null);
    const [clickedChampionId, setClickedChampionId] = useState<string | null>(null);

    return (
        <div className="select-none">
            <div className="flex flex-wrap items-center w-[40rem] gap-2">
              {champions.map(champion => (
                <div key={champion.name} className="flex flex-col items-center relative">
                        <img    
                            src={champion.image} 
                            alt={champion.name} 
                            className="w-10 h-10 border border-gray-600" 
                            onMouseEnter={() => setHoveredChampionId(champion.name)}
                            onMouseLeave={() => setHoveredChampionId(null)}
                            onClick={() => setClickedChampionId(
                                clickedChampionId === champion.name ? null : champion.name
                            )}
                        />
                       <p
                        className="text-[0.65rem] w-12 truncate overflow-hidden whitespace-nowrap text-center"
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