import { StatRow } from "./StatRow";

export const BestItemHolders = () => (
  <div className="flex flex-col flex-[0.9] rounded-md px-2 pb-2">
    <p className="text-[1rem] font-medium mb-1 text-[#e6e6e6]">
      Best Item Holders
    </p>
    <div className="flex flex-col gap-2 flex-[2]">
      {[1, 2, 3, 4, 5].map((id) => (
        <StatRow key={id} id={id} type="holder" />
      ))}
    </div>
  </div>
);
