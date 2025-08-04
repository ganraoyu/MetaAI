import { useHexBoardContext } from "./HexBoardContext";

interface HexCellProps {
  champion: string | null;
  row: number;
  col: number;
  cellId: string;
  team: "player" | "opponent" | "";
  image: string | null;
}

export const HexCell: React.FC<HexCellProps> = ({ row, col, cellId }) => {
  const { placeChampion, removeChampion, getChampion } = useHexBoardContext();

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
        className="absolute inset-0 bg-[#0f131a] shadow-md"
        style={{
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
        />
      )}

      {/* Inner hexagon */}
      <div
        className={`
        absolute inset-[1.5px]
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
