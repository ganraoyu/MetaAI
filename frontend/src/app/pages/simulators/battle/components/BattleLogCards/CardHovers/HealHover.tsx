import React from 'react';

interface HealBreakDownProps {
  healAmount: number;
  source: string;
}

export const HealHover: React.FC<HealBreakDownProps> = ({ healAmount, source }) => {
  return (
    <div className="absolute bg-gray-800 text-white rounded-md p-2 shadow-lg border border-gray-700 w-52 z-50 text-sm">
      {/* Header with heal icon and heal amount */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-1 mb-2">
        <div className="flex items-center gap-1.5">
          <img 
            src="../assets/icons/heal.png" 
            alt="heal icon" 
            className="h-4 w-4" 
          />
          <span className="font-medium">Heal</span>
        </div>
        <span className="font-bold text-green-400">{healAmount}</span>
      </div>

      {/* Heal source info */}
      <div className="text-xs text-gray-300">
        <div className="flex justify-between">
          <span>Source:</span>
          <span>{source}</span>
        </div>
      </div>
    </div>
  );
};
