import { useItemContainerContext } from '../ItemContainerContext';

type ItemType = 'basic' | 'combined' | 'radiant' | 'artifact' | 'support' | 'emblem';

export const ItemTypeToggle = () => {
  const baseButtonClass =
    'outline outline-lightGray outline-1 px-1 py-1 text-[0.54rem] rounded-[0.1rem] hover:bg-[#3d3d3d] hover:text-white';

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

  const handleItemType = (type: ItemType) => {
    setShowBasicItems(type === 'basic');
    setShowCombinedItems(type === 'combined');
    setShowRadiantItems(type === 'radiant');
    setShowArtifactItems(type === 'artifact');
    setShowSupportItems(type === 'support');
    setShowEmblemItems(type === 'emblem');
  };

  return (
    <div className="flex gap-2 mt-3 justify-center items-center">
      <button
        onClick={() => handleItemType('basic')}
        className={`${baseButtonClass} ${
          showBasicItems ? 'text-white bg-[#3d3d3d]' : 'text-[#D9CACA]'
        }`}
      >
        Basic
      </button>

      <button
        onClick={() => handleItemType('combined')}
        className={`${baseButtonClass} ${
          showCombinedItems ? 'text-white bg-[#3d3d3d]' : 'text-[#D9CACA]'
        }`}
      >
        Combined
      </button>

      <button
        onClick={() => handleItemType('radiant')}
        className={`${baseButtonClass} ${
          showRadiantItems ? 'text-white bg-[#3d3d3d]' : 'text-[#D9CACA]'
        }`}
      >
        Radiant
      </button>

      <button
        onClick={() => handleItemType('artifact')}
        className={`${baseButtonClass} ${
          showArtifactItems ? 'text-white bg-[#3d3d3d]' : 'text-[#D9CACA]'
        }`}
      >
        Artifact
      </button>

      <button
        onClick={() => handleItemType('support')}
        className={`${baseButtonClass} ${
          showSupportItems ? 'text-white bg-[#3d3d3d]' : 'text-[#D9CACA]'
        }`}
      >
        Support
      </button>

      <button
        onClick={() => handleItemType('emblem')}
        className={`${baseButtonClass} ${
          showEmblemItems ? 'text-white bg-[#3d3d3d]' : 'text-[#D9CACA]'
        }`}
      >
        Emblems
      </button>
    </div>
  );
};
