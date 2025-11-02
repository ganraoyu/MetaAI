interface StatRowProps {
  id: number;
  type: "holder" | "pair";
}

export const StatRow = ({ id, type }: StatRowProps) => {
  const avgPlace = 3.17;
  const placeChange = 1; 
  const playRate = 52;
  const extraStat = 64;

  return (
    <div
      key={id}
      className={`grid ${
        type === "holder"
          ? "grid-cols-[0.5fr_1fr_1fr_1fr_1fr]"
          : "grid-cols-[1.5fr_1fr_1fr_1fr_1fr]"
      } items-center gap-3 rounded-md flex-1`}
    >
      {/* Images */}
      <div className="flex items-center gap-1">
        {type === "pair" ? (
          <>
            <img className="h-8 w-8 rounded-md" src={`${"../assets/items/artifact/Manazane.png"}`} alt="" />
            <img className="h-8 w-8 rounded-md" src={`${"../assets/items/artifact/Manazane.png"}`} alt="" />
            <img className="h-8 w-8 rounded-md" src={`${"../assets/items/artifact/Manazane.png"}`} alt="" />
          </>
        ) : (
          <img className="h-8 w-8 rounded-md" src={`${"../assets/items/artifact/Manazane.png"}`} alt="" />
        )}
      </div>

      {/* Avg Place */}
      <div className="text-center text-[1rem]">
        <p>{avgPlace}</p>
        <p className="text-[0.6rem] text-[#b8b8b8]">Avg Place</p>
      </div>

      {/* Place Change */}
      <div className="text-center">
        <p className={`transition-colors duration-300 font-medium ${placeChange > 0 ? "text-[#24d810]" : "text-[#f94e4e]"}`}>
          {placeChange > 0 ? `+${placeChange}` : placeChange}
        </p>
        <p className="text-[0.6rem] text-[#b8b8b8]">Place Change</p>
      </div>

      {/* Play Rate */}
      <div className="text-center">
        <p>{playRate}%</p>
        <p className="text-[0.6rem] text-[#b8b8b8]">Play Rate</p>
      </div>

      {/* Extra Stat */}
      <div className="text-center">
        <p>{extraStat}%</p>
        <p className="text-[0.6rem] text-[#b8b8b8]">
          {type === "pair" ? "Rounds" : "Play Rate"}
        </p>
      </div>
    </div>
  );
};
