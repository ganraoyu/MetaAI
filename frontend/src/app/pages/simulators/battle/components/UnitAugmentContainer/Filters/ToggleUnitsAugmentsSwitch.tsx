interface ToggleUnitsAugmentsSwitchProps {
  toggleUnitsOrAugments: boolean;
  setToggleUnitsOrAugments: (val: boolean) => void;
}

export const ToggleUnitsAugmentsSwitch = ({ toggleUnitsOrAugments, setToggleUnitsOrAugments }: ToggleUnitsAugmentsSwitchProps) => (
  <div className="flex items-center ml-12 gap-2">
    <p className={`text-xs ${!toggleUnitsOrAugments ? "text-gray-400" : ""}`}>
      Units
    </p>
    <div
      onClick={() => setToggleUnitsOrAugments(!toggleUnitsOrAugments)}
      className={`w-9 h-3 flex items-center rounded-full outline outline-2 outline-lightGray cursor-pointer transition-colors duration-300 bg-darkerHexCellComponents`}
    >
      <div
        className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
          toggleUnitsOrAugments ? "translate-x-0" : "translate-x-6"
        }`}
      ></div>
    </div>
    <p className={`text-xs ${toggleUnitsOrAugments ? "text-gray-400" : ""}`}>
      Augments
    </p>
  </div>
);
