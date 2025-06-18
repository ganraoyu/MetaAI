import { useState, useEffect, useMemo } from "react";
import { UnitAugmentProvider, useUnitAugmentContext } from "./UnitAugmentContext";
import { useTFTSetContext } from "../../../../../utilities/TFTSetContext";
import { ChampionHoverInfo } from "./ChampionHoverInfo/_ChampionHoverInfo";
import { FilterContainer } from "./Filters/_FilterContainer";
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
    const { toggleUnitsOrAugments, sortByCost, sortByAlphabet, searchTerm } = useUnitAugmentContext();

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
        
        if(searchTerm.length > 0){
            return championList.filter(champion => 
                champion.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortByAlphabet) {
            return championList.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        if (sortByCost) {

            return championList
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => a.cost - b.cost);
        }

        return championList;
    }, [champions, toggleUnitsOrAugments, sortByAlphabet, sortByCost, searchTerm]);

    // Render a single champion card
    const renderChampionCard = (champion: any) => (
        <div 
            key={champion.name}
            className="flex flex-col items-center relative"                
            onMouseEnter={() => setHoveredChampionId(champion.name)}
            onMouseLeave={() => setHoveredChampionId(null)}
            onClick={() => setClickedChampionId(clickedChampionId === champion.name ? null : champion.name)}
        >
            <img    
                src={champion.image} 
                alt={champion.name} 
                className={`w-10 h-10 rounded-[0.09rem] outline outline-2 ${
                    champion.cost === 1 ? "outline-gray-400" :
                    champion.cost === 2 ? "outline-green-500" :
                    champion.cost === 3 ? "outline-blue-500" :
                    champion.cost === 4 ? "outline-purple-700" :
                    champion.cost === 5 ? "outline-yellow-500" :
                    champion.cost === 6 ? "outline-orange-500" :
                    "outline-red-500"
                }`}
            />
            <p
                className="text-[0.7rem] w-12 truncate overflow-hidden whitespace-nowrap text-center"
                title={champion.name}
            >
                {champion.name}
            </p>
            {(hoveredChampionId === champion.name || clickedChampionId === champion.name) && (
                <ChampionHoverInfo 
                champion={champion.name}
                cost={champion.cost}
                traits={[
                    champion.traitsList[0] || '',
                    champion.traitsList[1] || '',
                    champion.traitsList[2] || '',
                ]}
                items={champion.items}
                stats={{
                    abilityName: champion.abilityName,
                    abilityDescription: champion.abilityDescription,
                    range: champion.range,
                    mana: champion.mana,
                    manaPerAttack: champion.manaPerAttack,
                    abilityManaCost: champion.abilityManaCost,
                    attackSpeed: champion.attackSpeed,
                    attackCritChance: champion.attackCritChance,
                    attackCritDamage: champion.attackCritDamage,
                    abilityCritChance: champion.abilityCritChance,
                    abilityCritDamage: champion.abilityCritDamage,
                    damageAmp: champion.damageAmp,
                    abilityPower: champion.abilityPower,
                    durability: champion.durability,
                    omnivamp: champion.omnivamp,
                    sunder: champion.sunder,
                    shred: champion.shred,
                    wound: champion.wound,
                    burn: champion.burn,
                    immunity: champion.immunity,
                }}
                starLevelStats={{
                    oneStar: {
                    health: champion.statsByStarLevel[1].hp,
                    armor: champion.statsByStarLevel[1].armor,
                    magicResist: champion.statsByStarLevel[1].magicResist,
                    attackDamage: champion.statsByStarLevel[1].attackDamage,
                    abilityName: champion.abilityName,
                    abilityDescription: champion.abilityDescription,
                    },
                    twoStar: {
                    health: champion.statsByStarLevel[2].hp,
                    armor: champion.statsByStarLevel[2].armor,
                    magicResist: champion.statsByStarLevel[2].magicResist,
                    attackDamage: champion.statsByStarLevel[2].attackDamage,
                    abilityName: champion.abilityName,
                    abilityDescription: champion.abilityDescription,
                    },
                    threeStar: {
                    health: champion.statsByStarLevel[3].hp,
                    armor: champion.statsByStarLevel[3].armor,
                    magicResist: champion.statsByStarLevel[3].magicResist,
                    attackDamage: champion.statsByStarLevel[3].attackDamage,
                    abilityName: champion.abilityName,
                    abilityDescription: champion.abilityDescription,
                    },
                }}
                starLevel={champion.starLevel || 1}
                />

            )}
        </div>
    );

    return (
        <div className="select-none">
            <div>
                <FilterContainer />
            </div>

            {/* Champion List */}
            <div className="flex flex-wrap items-center w-[49rem] gap-[0.3rem] bg-hexCellComponents p-6 rounded-lg">
                {sortedChampions.map(renderChampionCard)}
            </div>

            
        </div>
    );
};