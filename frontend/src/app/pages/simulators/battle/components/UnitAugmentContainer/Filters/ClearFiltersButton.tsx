interface ClearFiltersButtonProps {
  onClear: () => void;
}

export const ClearFiltersButton = ({ onClear }: ClearFiltersButtonProps) => (
  <button className="text-xs text-yellow-500" onClick={onClear}>
    Clear Filters
  </button>
);
