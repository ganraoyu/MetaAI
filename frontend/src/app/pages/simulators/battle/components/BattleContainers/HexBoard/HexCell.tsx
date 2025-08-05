import { useHexBoardContext } from "./HexBoardContext";

interface HexCellProps {
  row: number;
  col: number;
  cellId: string;
  team: "player" | "opponent" | "";
}

function getBorderColor(cost: number): string {
  switch (cost) {
    case 1:
      return "#9E9E9E"; // Gray
    case 2:
      return "#4CAF50"; // Green
    case 3:
      return "#2196F3"; // Blue
    case 4:
      return "#9C27B0"; // Purple
    case 5:
      return "#FFC107"; // Amber
    default:
      return "#000000"; // Black fallback
  }
}

export const HexCell: React.FC<HexCellProps> = ({ row, col, cellId }) => {
  const { placeChampion, removeChampion, getChampion, moveChampion } =
    useHexBoardContext();

  const championData = getChampion(cellId);
  const champion = championData?.name || null;
  const image = championData?.image || null;
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    try {
      const championDataString = e.dataTransfer.getData("application/json");
      if (championDataString) {
        const championData = JSON.parse(championDataString);
        console.log(`Dropping ${championData.name} on cell ${cellId}`);
        placeChampion(cellId, championData);
      }
    } catch (error) {
      console.error("Error parsing champion data:", error);
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
            ? `20px solid ${getBorderColor(championData.cost)}`
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
          absolute inset-[3px]
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
        {!image && champion && <span className="text-shadow">{champion}</span>}
      </div>
    </div>
  );
};
