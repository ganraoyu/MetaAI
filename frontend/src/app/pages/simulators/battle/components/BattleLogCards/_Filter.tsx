import { useState } from "react";
import { ItemDropDown } from "./Item/_ItemDropDown";

interface FilterProps {
  toggleMovement: boolean;
  toggleAttack: boolean;
  toggleAbility: boolean;
  toggleHeal: boolean;
  toggleItem: boolean;
  setToggleMovement: (value: booelan) => void;
  setToggleAttack: (value: boolean) => void;
  setToggleAbility: (value: boolean) => void;
  setToggleHeal: (value: boolean) => void;
  setToggleItem: (value: boolean) => void;
}

export const Filter = ({
  toggleMovement,
  toggleAttack,
  toggleAbility,
  toggleHeal,
  toggleItem,
  setToggleMovement,
  setToggleAttack,
  setToggleAbility,
  setToggleHeal,
  setToggleItem,
}: FilterProps) => {
  const [showToggle, setShowToggle] = useState<boolean>(false);

  return (
    <div className="mb-4 bg-hexCellComponents rounded-2xl p-[0.1rem] select-none">
      <div className="flex justify-center items-center h-17 w-[18rem] bg-hexCellComponents rounded-2xl pt-5 select-none"></div>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">

        {/* Movement */}
        <button
          className={`relative h-11 w-11 rounded-md transition-all duration-300 ${
            toggleMovement
              ? "bg-gradient-to-br from-teal-700 to-teal-900 border-2 border-teal-500 shadow-lg shadow-teal-900/50"
              : "bg-gray-800 border-2 border-gray-700 opacity-60"
          }`}
          onClick={() => setToggleMovement(!toggleMovement)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="../assets/icons/movementspeed.png" className="w-5 h-5" />
          </div>
          {toggleMovement && (
            <div className="absolute inset-0 rounded-md bg-teal-400/20 animate-pulse"></div>
          )}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500/0 via-teal-500/80 to-teal-500/0 opacity-70"></div>
          <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-teal-300">
            Movement
          </p>
        </button>

        {/* Auto Attacks */}
        <button
          className={`relative h-11 w-11 rounded-md transition-all duration-300 ${
            toggleAttack
              ? "bg-gradient-to-br from-red-700 to-red-900 border-2 border-red-500 shadow-lg shadow-red-900/50"
              : "bg-gray-800 border-2 border-gray-700 opacity-60"
          }`}
          onClick={() => setToggleAttack(!toggleAttack)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="../assets/icons/attack.png" className="w-5 l-5" />
          </div>
          {toggleAttack && (
            <div className="absolute inset-0 rounded-md bg-red-400/20 animate-pulse"></div>
          )}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0 opacity-70"></div>
          <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-red-300">
            Attack
          </p>
        </button>

        {/* Abilities */}
        <button
          className={`relative  h-11 w-11 rounded-md transition-all duration-300 ${
            toggleAbility
              ? "bg-gradient-to-br from-blue-700 to-blue-900 border-2 border-blue-500 shadow-lg shadow-blue-900/50"
              : "bg-gray-800 border-2 border-gray-700 opacity-60"
          }`}
          onClick={() => setToggleAbility(!toggleAbility)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="../assets/icons/abilitypower.png" className="w-5 l-5" />
          </div>
          {toggleAbility && (
            <div className="absolute inset-0 rounded-md bg-blue-400/20 animate-pulse"></div>
          )}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/80 to-blue-500/0 opacity-70"></div>
          <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-300">
            Ability
          </p>
        </button>

        {/* Healing */}
        <button
          className={`relative  h-11 w-11 rounded-md transition-all duration-300 ${
            toggleHeal
              ? "bg-gradient-to-br from-green-700 to-green-900 border-2 border-green-500 shadow-lg shadow-green-900/50"
              : "bg-gray-800 border-2 border-gray-700 opacity-60"
          }`}
          onClick={() => setToggleHeal(!toggleHeal)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="../assets/icons/health.png" className="w-8 l-8" />
          </div>
          {toggleHeal && (
            <div className="absolute inset-0 rounded-md bg-green-400/20 animate-pulse"></div>
          )}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500/80 to-green-500/0 opacity-70"></div>
          <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-300">
            Heal
          </p>
        </button>

        {/* Item */}
        <button
          className={`relative h-11 w-11 rounded-md transition-all duration-300 ${
            toggleItem
              ? "bg-gradient-to-br from-purple-700 to-purple-900 border-2 border-purple-500 shadow-lg shadow-purple-900/50"
              : "bg-gray-800 border-2 border-gray-700 opacity-60"
          }`}
          onClick={() => setToggleItem(!toggleItem)}
          onMouseEnter={() => setShowToggle(!toggleItem)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="../assets/icons/synergies.svg" className="w-5 l-5" />
          </div>
          {toggleItem && (
            <div className="absolute inset-0 rounded-md bg-purple-400/20 animate-pulse"></div>
          )}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-purple-500/0 opacity-70"></div>

          {showToggle && (
            <div>
              <ItemDropDown />
            </div>
          )}

          <p className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-purple-400">
            Items
          </p>
        </button>

      </div>
    </div>
  );
};
