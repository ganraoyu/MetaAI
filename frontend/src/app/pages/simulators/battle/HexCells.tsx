import React from 'react'

interface HexCellsProps {
  champion: any;
  row: number;
  col: number;
  occupied?: boolean;
}


export const HexCells: React.FC<HexCellsProps> = ({ champion, row, col, occupied }) => {
  return (
    <div className="relative w-[4rem] h-[4rem] m-[0.2rem]">
      {/* Outer hexagon (border) */}
      <div 
        className="absolute inset-0 bg-black shadow-md"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}
      />
      {/* Inner hexagon (content) */}
      <div 
        className={`absolute inset-[1px] ${occupied ? 'bg-blue-600' : 'bg-hexCell'} hover:bg-hexCellHover transition-colors duration-300 flex items-center justify-center text-white`}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}    
      >
        {champion}
      </div>
    </div>
  );
};
