import { StatRow } from "./StatRow";

export const BestItemPairing = () => (
  <div className="flex flex-col flex-1 rounded-md pb-2">
    <p className="text-[1rem] font-medium mb-1 text-[#e6e6e6]">
      Best Item Pairing
    </p>
    <div className="flex flex-col gap-2 flex-1">
      {[1, 2, 3, 4, 5].map((id) => (
        <StatRow key={id} id={id} type="pair" />
      ))}
    </div>
  </div>
);
