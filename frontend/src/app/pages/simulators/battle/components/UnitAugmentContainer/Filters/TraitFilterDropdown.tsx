import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Trait {
  name: string;
  image: string;
}

interface TraitFilterDropdownProps {
  traits: Trait[];
  filterByTrait: string;
  setFilterByTrait: (trait: string) => void;
  toggleUnitsOrAugments: boolean;
}

export const TraitFilterDropdown = ({
  traits,
  filterByTrait,
  setFilterByTrait,
  toggleUnitsOrAugments,
}: TraitFilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-32">
      <div
        className={`flex items-center justify-center bg-darkerHexCellComponents h-7 ${open ? "rounded-t-md" : "rounded-md"} hover:bg-lightGray cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-center gap-1">
          <img
            className="h-3 w-3 filter invert brightness-0"
            src="../assets/icons/synergies.svg"
            alt="Default"
          />
          <p className="text-[0.75rem]">
            {toggleUnitsOrAugments && (filterByTrait.length > 0 ? filterByTrait : "All Synergies")}
            {!toggleUnitsOrAugments && "All Augments"}
          </p>
          <FaChevronDown
            className={`h-2.5 w-2.5 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full overflow-auto bg-darkerHexCellComponents rounded-b-md shadow-md z-10 transition-all duration-300 ease-in-out ${
          open ? "max-h-48 py-1" : "max-h-0 py-0"
        }`}
      >
        {toggleUnitsOrAugments &&
          (traits || []).map((trait) => (
            <div
              key={trait.name}
              className="flex items-center gap-2 px-2 py-1 hover:bg-lightGray cursor-pointer"
              onClick={() => {
                setOpen(false);
                setFilterByTrait(trait.name);
              }}
            >
              <img src={trait.image} className="h-3 w-3" alt={trait.name} />
              <p className="text-[0.8rem]">{trait.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
