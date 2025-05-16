import React from 'react';

interface DamageBreakdownProps {
  rawDamage: number;
  finalDamage: number;
  armorReduction?: {
    percentage: number;
    value: number;
  };
  magicResistReduction?: {
    percentage: number;
    value: number;
  };
  otherModifiers?: {
    name: string;
    percentage: number;
  }[];
  damageType: 'physical' | 'magical' | 'true';
}

export const ChampionCardDamageHover: React.FC<DamageBreakdownProps> = ({
  rawDamage,
  finalDamage,
  armorReduction,
  magicResistReduction,
  otherModifiers,
  damageType
}) => {
  return (
    <div className="absolute bg-gray-800 text-white rounded-md p-2 shadow-lg border border-gray-700 w-52 z-50 text-sm">
      {/* Header with damage type and final value */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-1 mb-2">
        <div className="flex items-center gap-1.5">
          <img 
            src={`../assets/icons/${damageType === 'physical' ? 'attack' : damageType === 'magical' ? 'abilitypower' : 'true-damage'}.png`} 
            className="h-4 w-4" 
            alt={`${damageType} damage`} 
          />
          <span className="font-medium">
            {damageType.charAt(0).toUpperCase() + damageType.slice(1)} Damage
          </span>
        </div>
        <span className={`font-bold ${
          damageType === 'physical' ? 'text-orange-400' : 
          damageType === 'magical' ? 'text-blue-400' : 
          'text-white'
        }`}>
          {finalDamage}
        </span>
      </div>
      
      {/* Damage breakdown */}
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Raw Damage:</span>
          <span className="text-gray-300">{rawDamage}</span>
        </div>
        
        {armorReduction && (
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <img src="../assets/icons/armor.png" className="h-3.5 w-3.5" alt="armor" />
              <span>Armor ({armorReduction.value}):</span>
            </div>
            <span className="text-red-400">-{armorReduction.percentage}%</span>
          </div>
        )}
        
        {magicResistReduction && (
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <img src="../assets/icons/magicresist.png" className="h-3.5 w-3.5" alt="magic resist" />
              <span>Magic Resist ({magicResistReduction.value}):</span>
            </div>
            <span className="text-red-400">-{magicResistReduction.percentage}%</span>
          </div>
        )}
        
        {otherModifiers && otherModifiers.map((modifier, index) => (
          <div key={index} className="flex justify-between">
            <span>{modifier.name}:</span>
            <span className={modifier.percentage > 0 ? "text-green-400" : "text-red-400"}>
              {modifier.percentage > 0 ? '+' : ''}{modifier.percentage}%
            </span>
          </div>
        ))}
        
        <div className="border-t border-gray-600 mt-2 pt-1 flex justify-between font-medium">
          <span>Final Damage:</span>
          <span>{finalDamage}</span>
        </div>
      </div>
    </div>
  );
}
