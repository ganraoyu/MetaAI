import { useState, useMemo, useRef, useEffect } from "react";
import { useUnitAugmentContext } from "./UnitAugmentContext";
import { getChampionBySet } from "../../data/loaders/championDataLoader";
import { ChampionHoverInfo } from "./ChampionHoverInfo/_ChampionHoverInfo";

export const ChampionCardList = ({ set }: { set: string }) => {
  const {
    toggleUnitsOrAugments = true,
    sortByCost = false,
    sortByAlphabet = false,
    searchTerm = ""
  } = useUnitAugmentContext();

  const { showBelow, setShowBelow } = useUnitAugmentContext();
  const [overExtend, setOverExtend] = useState<boolean>(false);
  const [champions, setChampions] = useState(() => getChampionBySet(set) || []);
  const [hoveredChampionId, setHoveredChampionId] = useState<string | null>(null);
  const [clickedChampionId, setClickedChampionId] = useState<string | null>(null);
  const championRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    setChampions(getChampionBySet(set) || []);
  }, [set]);

  const checkPosition = (championName: string) => {
    const element = championRefs.current[championName];
    if (element) {
      const rect = element.getBoundingClientRect();
      const isNearTop = rect.top < 425;
      setShowBelow(isNearTop);

      const isOverExtended = rect.bottom > window.innerHeight - 100;
      setOverExtend(isOverExtended);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, champion: any) => {
    const championData = {
      name: champion.name,
      image: champion.image,
      cost: champion.cost,
      starLevel: 1,
      type: champion.type,
      traitsList: champion.traitsList || [],
      stats: champion.statsByStarLevel?.[1] || {},
      abilityName: champion.abilityName,
      abilityDescription: champion.abilityDescription,
    };

    console.log('Dragging champion:', championData.name);
    e.dataTransfer.setData("application/json", JSON.stringify({ championData: championData, type: "champion" }));
    e.dataTransfer.effectAllowed = "copy";

    // Hide hover info during drag
    setHoveredChampionId(null);
    setClickedChampionId(null);
  };

  const sortedChampions = useMemo(() => {
    if (!toggleUnitsOrAugments) return [];

    let championList = [...(champions || [])];

    if (searchTerm.length > 0) {
      championList = championList.filter(champion =>
        (champion?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortByAlphabet) {
      championList.sort((a, b) =>
        (a?.name || "").localeCompare(b?.name || "")
      );
    }

    if (sortByCost) {
      championList.sort((a, b) =>
        (a?.name || "").localeCompare(b?.name || "")
      ).sort((a, b) =>
        (a?.cost || 0) - (b?.cost || 0)
      );
    }

    return championList;
  }, [champions, toggleUnitsOrAugments, sortByAlphabet, sortByCost, searchTerm]);

  return (
    <div className="flex flex-wrap items-center w-[45.6rem] gap-[0.3rem] bg-hexCellComponents p-6 rounded-b-lg hover:cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
    >
      {sortedChampions.map(champion => {
        const name = champion?.name || "Unknown";
        const cost = champion?.cost || 1;

        return (
          <div
            key={name}
            ref={el => championRefs.current[name] = el}
            className="flex flex-col items-center relative"
            onMouseEnter={() => {
              setHoveredChampionId(name);
              checkPosition(name);
              setOverExtend(false);
            }}
            onMouseLeave={() => setHoveredChampionId(null)}
            onClick={() => {
              setClickedChampionId(
                clickedChampionId === name ? null : name
              );
              if (clickedChampionId !== name) {
                checkPosition(name);
                setOverExtend(false);
              }
            }}
          >
            <img
              src={champion.image || "/placeholder.png"}
              alt={name}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, champion)}
              className={`w-10 h-10 outline outline-2 cursor-grab active:cursor-grabbing ${
                cost === 1 ? "outline-gray-400" :
                cost === 2 ? "outline-green-500" :
                cost === 3 ? "outline-blue-500" :
                cost === 4 ? "outline-purple-700" :
                cost === 5 ? "outline-yellow-500" :
                cost === 6 ? "outline-orange-500" :
                "outline-red-500"
              }`}
            />
            <p
              className="text-[0.7rem] w-12 truncate overflow-hidden whitespace-nowrap text-center"
              title={name}
            >
              {name}
            </p>

            {(hoveredChampionId === name || clickedChampionId === name) && (
              <ChampionHoverInfo
                champion={name}
                type={champion?.type || ''}
                cost={cost}
                traits={[
                  champion?.traitsList?.[0] ?? "",
                  champion?.traitsList?.[1] ?? "",
                  champion?.traitsList?.[2] ?? ""
                ]}
                items={[
                  champion?.items?.[0],
                  champion?.items?.[1],
                  champion?.items?.[2]
                ]}
                showBelow={showBelow}
                overExtend={overExtend}
                stats={{
                  abilityName: champion?.abilityName || "Unknown",
                  abilityDescription: champion?.abilityDescription || "No description available",
                  range: champion?.range ?? 0,
                  mana: champion?.mana ?? 0,
                  manaPerAttack: champion?.manaPerAttack ?? 0,
                  abilityManaCost: champion?.abilityManaCost ?? 0,
                  attackSpeed: champion?.attackSpeed ?? 0,
                  attackCritChance: champion?.attackCritChance ?? 0,
                  attackCritDamage: champion?.attackCritDamage ?? 0,
                  abilityCritChance: champion?.abilityCritChance ?? 0,
                  abilityCritDamage: champion?.abilityCritDamage ?? 0,
                  damageAmp: champion?.damageAmp ?? 0,
                  abilityPower: champion?.abilityPower ?? 0,
                  durability: champion?.durability ?? 0,
                  omnivamp: champion?.omnivamp ?? 0,
                  sunder: champion?.sunder ?? false,
                  shred: champion?.shred ?? false,
                  wound: champion?.wound ?? false,
                  burn: champion?.burn ?? false,
                  immunity: champion?.immunity ?? false,
                }}
                starLevelStats={{
                  oneStar: {
                    health: champion?.statsByStarLevel?.[1]?.hp ?? 0,
                    armor: champion?.statsByStarLevel?.[1]?.armor ?? 0,
                    magicResist: champion?.statsByStarLevel?.[1]?.magicResist ?? 0,
                    attackDamage: champion?.statsByStarLevel?.[1]?.attackDamage ?? 0,
                  },
                  twoStar: {
                    health: champion?.statsByStarLevel?.[2]?.hp ?? 0,
                    armor: champion?.statsByStarLevel?.[2]?.armor ?? 0,
                    magicResist: champion?.statsByStarLevel?.[2]?.magicResist ?? 0,
                    attackDamage: champion?.statsByStarLevel?.[2]?.attackDamage ?? 0,
                  },
                  threeStar: {
                    health: champion?.statsByStarLevel?.[3]?.hp ?? 0,
                    armor: champion?.statsByStarLevel?.[3]?.armor ?? 0,
                    magicResist: champion?.statsByStarLevel?.[3]?.magicResist ?? 0,
                    attackDamage: champion?.statsByStarLevel?.[3]?.attackDamage ?? 0,
                  },
                }}
                starLevel={1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};