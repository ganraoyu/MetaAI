import React from 'react'

interface HexCellsProps {
  champion: any;
  row: number;
  col: number;
  occupied?: boolean;
}


export const HexCells: React.FC<HexCellsProps> = ({ champion, row, col, occupied }) => {
  return (
    <div className={`w-16 h-16 ${occupied ? 'bg-blue-600' : 'bg-hexCell'} m-[0.3rem] relative hover:bg-hexCellHover transition-colors duration-300 flex items-center justify-center text-white`}
    style={{
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
    }}>
      {champion}
    </div>
  )
}
