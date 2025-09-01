import { useTFTSetContext } from '../../../../../../utilities/TFTSetContext';
import { getChampionBySet } from '../../../data/loaders/championDataLoader';
import { useChampionCardHoverContext } from './ChampionCardHoverContext';
import { AbilitySlotHover } from './SlotHover/AbilitySlotHover';
import { ChampionAbilityProps } from './types';

/**
 * ChampionAbilitySlot component
 *
 * Renders the ability icon for a given champion based on the current TFT set.
 * When hovered, it updates the ability hover context so other components can
 * display ability details (e.g., tooltip or side panel).
 *
 * @component
 * @param {ChampionAbilityProps} props - The props for the component.
 * @param {string} props.champion - The name of the champion whose ability should be displayed.
 *
 * @returns {JSX.Element} A slot containing either the champion's ability image
 *                        or a placeholder box if no champion is provided.
 */

export const ChampionAbilitySlot = ({ champion }: ChampionAbilityProps): JSX.Element => {
  const { set } = useTFTSetContext();
  const { setAbilityHover, abilityHover } = useChampionCardHoverContext();

  const champions = getChampionBySet(set);
  const championData = champions?.find((champ) => champ.name === champion);

  return (
    <div onMouseEnter={() => setAbilityHover(true)} onMouseLeave={() => setAbilityHover(false)}>
      <img
        src={championData?.abilityImage}
        alt={`${champion} ability`}
        className="h-8 w-8 border-2 border-gray-700"
      />

      {/* Ability Slot Hover */}
      {abilityHover && champion && championData && (
        <AbilitySlotHover
          ability={championData?.abilityName || ''}
          description={championData?.abilityDescription || ''}
        />
      )}
    </div>
  );
};
