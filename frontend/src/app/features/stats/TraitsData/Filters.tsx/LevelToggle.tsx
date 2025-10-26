import { useTraitDataContext } from "../TraitDataContext";

export const LevelToggle = () => {
  const { levelType, setLevelType } = useTraitDataContext();

  const baseButtonClass =
    "h-[2rem] w-[7rem] outline outline-lightGray outline-1 px-1 py-1 text-[0.6rem] rounded-[0.1rem] hover:bg-[#3d3d3d] hover:text-white";

  return (
    <div className="flex mt-3 justify-center items-center">
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
