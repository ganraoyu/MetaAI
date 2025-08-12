import { useHexBoardContext } from "./HexBoardContext";
import { Star } from "../../../utils/Star";
import { itemMap } from "../../../utils/ItemMapping";

interface HexCellProps {
  cellId: string;
  team: "player" | "opponent" | "";
}

const getBorderColor = (cost: number): string => {
  switch (cost) {
    case 1:
      return "#9E9E9E"; 
    case 2:
      return "#4CAF50"; 
    case 3:
      return "#2196F3"; 
    case 4:
      return "#9C27B0"; 
    case 5:
      return "#FFC107";
    default:
      return "#000000"; 
  }
};

const itemPositionMapping = (index: number, total: number) => {
  if (total === 1) {
    return "left-6 bottom-[0.7px]";
  } else if (total === 2) {
    if (index === 0 ) {
      return "left-3.5 bottom-[0.7px]";
    } else {
      return "left-8 bottom-[0.7px]"
    }
  } else if (total === 3) {
    if (index === 0 ) {
      return "left-1.5 bottom-[0.7px]";
    } else if (index === 1) {
      return "left-6 bottom-[0.7px]"
    } else {
      return "left-[2.625rem] bottom-[0.7px]"
    }
  }
};

export const HexCell: React.FC<HexCellProps> = ({ cellId }) => {
  const {
    placeChampion,
    removeChampion,
    getChampion,
    moveChampion,
    setChampionStarLevel,
    addItemToChampion,
    removeItemFromChampion
  } = useHexBoardContext();

  const championData = getChampion(cellId);
  const champion = championData?.name || null;
  const image = championData?.image || null;
  const championItem = championData?.items || null;
  const itemImage = (itemName: string) => itemMap[itemName];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    try {
      const dataString = e.dataTransfer.getData("application/json");
      if (!dataString) return;

      const data = JSON.parse(dataString);

      if (data.type === "champion") {
        placeChampion(cellId, data.championData);
      } else if (data.type === "item") {
        const championHere = getChampion(cellId);
        if (championHere) {
          addItemToChampion(cellId, data.name);
          console.log("Placed: ", data.name, "to", championHere.name);
          console.log(championHere);
        } 
      }
    } catch (error) {
      console.error("Error parsing drop data:", error);
    }
  };

  const handleDoubleClick = () => {
    if (champion) {
      removeChampion(cellId);
    }
  };

  return (
    <div
      className="relative w-[4.1rem] h-[4.1rem] m-[0.2rem]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDoubleClick={handleDoubleClick}
      title={
        champion ? `${champion} (Double-click to remove)` : "Drop champion here"
      }
    >
      {/* Outer hexagon (border) */}
      <div
        className="absolute inset-0 shadow-md"
        style={{
          border: championData
            ? `1px solid ${getBorderColor(championData.cost)}`
            : "none",
          backgroundColor: championData ? "transparent" : "#0f131a",
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />

      {/* Champion image */}
      {image && (
        <img
          src={image}
          alt={champion || "Champion"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          draggable={true}
        />
      )}

      {/* Inner hexagon */}
      <div
        className={`
          absolute inset-[1px]
          ${!image ? "bg-[#222222]" : "bg-transparent"}
          flex
          items-center
          justify-center
          text-white
          text-xs
          font-bold
          text-center
        `}
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {/* Champion Name */}
        {image ? (
          <p
            role="button"
            tabIndex={0}
            onClick={() => console.log("Clicked!")}
            className="absolute inset-0 flex items-center justify-center text-white text-[0.6rem] z-10 cursor-pointer"
            style={{
              userSelect: "none",
              outline: "none",
              textShadow: `
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px  1px 0 #000,
                1px  1px 0 #000
              `,
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            {champion}
          </p>
        ) : (
          <p className="text-[0.5rem]">
            [{parseInt(cellId[1]) + 1},{parseInt(cellId[3]) + 1}]
          </p>
        )}
      </div>

      {/* Set Champion Star Level */}
      {image && championData && (
        <div
          className="absolute top-[-2px] left-1 right-1 flex justify-center items-center space-x-1 z-50"
          style={{ pointerEvents: "auto" }}
        >
          {[1, 2, 3].map((star) => (
            <div
              key={star}
              onClick={() => setChampionStarLevel(cellId, star)}
              className="cursor-pointer"
              title={`${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                textColor={"#FFFF00"}
                fillColor={
                  star <= (championData.starLevel || 1)
                    ? "#FFFF00"
                    : "transparent"
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Add Equiped Champion Item Images */}
      <div className="w-full absolute bottom-0 left-0">
        {championItem?.map((item, index) => {
          const positions = itemPositionMapping(index, championItem.length);
          return (
            <div key={item} className={`absolute ${positions} border border-yellow-300 z-[51] hover:cursor-pointer`} onMouseDown={() => removeItemFromChampion(cellId, item)}>
              <img src={itemImage(item).image} className="w-4 h-4"/>
            </div>
          );
        })}
      </div>
    </div>
  );
};
