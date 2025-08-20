import { ChampionProps } from "./types";

/**
 * ChampionBarHover
 * 
 * @returns {JSX.Element} A React component showing a detailed break down of damage, healing, and shielding
*/

export const ChampionBarHover = ({ champion }: ChampionProps): JSX.Element => {
  return (
    <div className="absolute bg-[#1e1e1e] w-40 h-36 z-50 pointer-events-none px-3 border border-[#464646]">

      {/* Champion name on the left */}
      <div className="font-semibold mb-1">{champion.name}</div>

      <div className="flex flex-col items-center gap-2">
        {/* Horizontal line filling the rest of the space */}
        <div className="w-36 border-t border-gray-600" />
      </div>
      
      {/* Other content can go below */}
    </div>
  )
};
