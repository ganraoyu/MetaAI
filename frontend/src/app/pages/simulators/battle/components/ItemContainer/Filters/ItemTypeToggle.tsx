import { useItemContainerContext } from "../ItemContainerContext";

export const ItemTypeToggle = () => {
  const baseButtonClass =
    "bg-darkerHexCellComponents outline outline-lightGray outline-1 px-1 py-1 text-[0.54rem] rounded-[0.2rem] hover:bg-[#3a523a]";

  const {
    showBasicItems,
    setShowBasicItems,
    showCombinedItems,
    setShowCombinedItems,
    showRadiantItems,
    setShowRadiantItems,
    showArtifactItems,
    setShowArtifactItems,
    showSupportItems,
    setShowSupportItems,
    showEmblemItems,
    setShowEmblemItems,
  } = useItemContainerContext();

  return (
    <div className="flex gap-2 mt-3 justify-center">
      <button
        onClick={() => setShowBasicItems(!showBasicItems)}
        className={`${baseButtonClass} ${
          showBasicItems ? "text-white" : "text-[#D9CACA]"
        }`}
      >
        Basic
      </button>

      <button
        onClick={() => setShowCombinedItems(!showCombinedItems)}
        className={`${baseButtonClass} ${
          showCombinedItems ? "text-white" : "text-[#D9CACA]"
        }`}
      >
        Combined
      </button>

      <button
        onClick={() => setShowRadiantItems(!showRadiantItems)}
        className={`${baseButtonClass} ${
          showRadiantItems ? "text-white" : "text-[#D9CACA]"
        }`}
      >
        Radiant
      </button>

      <button
        onClick={() => setShowArtifactItems(!showArtifactItems)}
        className={`${baseButtonClass} ${
          showArtifactItems ? "text-white" : "text-[#D9CACA]"
        }`}
      >
        Artifact
      </button>

      <button
        onClick={() => setShowSupportItems(!showSupportItems)}
        className={`${baseButtonClass} ${
          showSupportItems ? "text-white" : "text-[#D9CACA]"
        }`}
      >
        Support
      </button>

      <button
        onClick={() => setShowEmblemItems(!showEmblemItems)}
        className={`${baseButtonClass} ${
          showEmblemItems ? "text-white" : "text-[#D9CACA]"
        }`}
      >
        Emblems
      </button>
    </div>
  );
};
