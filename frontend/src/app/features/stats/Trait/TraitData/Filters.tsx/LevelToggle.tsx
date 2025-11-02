import { useTraitContext } from "../../../contexts/TraitContext";

export const LevelToggle = () => {
  const { levelType, setLevelType } = useTraitContext();

  const baseButtonClass =
    "h-[2rem] w-[7rem] outline outline-lightGray outline-1 px-1 py-1 text-[0.6rem] rounded-md hover:bg-[#3d3d3d] hover:text-white";

  return (
    <div className="flex justify-center items-center gap-2 text-[0.75rem]">
      <button
        onClick={() => setLevelType("Overall")}
        className={`${baseButtonClass} ${
          levelType === "Overall" ? "text-white bg-[#272525]" : "text-[#D9CACA]"
        }`}
      >
        Overall
      </button>

      <button
        onClick={() => setLevelType("byLevel")}
        className={`${baseButtonClass} ${
          levelType === "byLevel" ? "text-white bg-[#272525]" : "text-[#D9CACA]"
        }`}
      >
        By Level
      </button>
    </div>
  );
};
