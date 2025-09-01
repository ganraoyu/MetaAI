import { AbilitySlotHoverProps } from './types';

export const AbilitySlotHover = ({ ability, description }: AbilitySlotHoverProps) => {
  return (
    <div className="absolute w-60 bg-[#161616] border border-gray-700 rounded-md shadow-lg z-[999] p-3 mt-3">
      {/* Ability Header */}
      <div className="border-b border-gray-600 pb-2 mb-2">
        <h3 className="font-bold text-white text-base">{ability}</h3>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-[0.65rem] leading-snug">{description}</p>
    </div>
  );
};
