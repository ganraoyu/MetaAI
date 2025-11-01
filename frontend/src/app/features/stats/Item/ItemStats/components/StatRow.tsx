import { getPlacementChangeColor } from "../../../utilities/placementChangeColor";

interface StatRowProps {
  id: number;
  type: "holder" | "pair";
}

export const StatRow = ({ id, type }: StatRowProps) => (
  <div
    key={id}
    className={`grid ${
      type === "holder"
        ? "grid-cols-[0.5fr_1fr_1fr_1fr_1fr]"
        : "grid-cols-[1.5fr_1fr_1fr_1fr_1fr]"
    } items-center gap-3 rounded-md flex-1`}
  >
    <div className="flex items-center gap-1">
      {type === "pair" ? (
        <>
          <img className="h-8 w-8 rounded-md" src="" alt="" />
          <img className="h-8 w-8 rounded-md" src="" alt="" />
          <img className="h-8 w-8 rounded-md" src="" alt="" />
        </>
      ) : (
        <img className="h-8 w-8 rounded-md" src="" alt="" />
      )}
    </div>

    <div className="text-center text-[1rem]">
      <p>3.{id}</p>
      <p className="text-[0.6rem] text-[#b8b8b8]">Avg Place</p>
    </div>

    <div className="text-center">
      <p
        className={`transition-colors duration-300 font-medium ${getPlacementChangeColor(
          id % 2 === 0 ? -id : id
        )}`}
      >
        {id % 2 === 0 ? id * -1 : `+${id}`}
      </p>
      <p className="text-[0.6rem] text-[#b8b8b8]">Place Change</p>
    </div>

    <div className="text-center">
      <p>{id * 10}%</p>
      <p className="text-[0.6rem] text-[#b8b8b8]">Play Rate</p>
    </div>

    <div className="text-center">
      <p>{id * 10}%</p>
      <p className="text-[0.6rem] text-[#b8b8b8]">
        {type === "pair" ? "Rounds" : "Play Rate"}
      </p>
    </div>
  </div>
);
