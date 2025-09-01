import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';

interface SortButtonsProps {
  sortByCost: boolean;
  setSortByCost: () => void;
  sortByAlphabet: boolean;
  setSortByAlphabet: () => void;
}

export const SortButtons = ({
  sortByCost,
  setSortByCost,
  sortByAlphabet,
  setSortByAlphabet,
}: SortButtonsProps) => (
  <div className="flex items-center">
    <button
      onClick={setSortByCost}
      className={`h-7 w-8 bg-lightGray flex items-center justify-center rounded-l-md outline outline-1 ${
        sortByCost ? 'outline-yellow-300' : 'outline-purple-600'
      }`}
    >
      <img
        src="../assets/icons/coin.png"
        alt="Coin"
        className="filter invert brightness-0 h-4 w-4"
      />
    </button>

    <button
      onClick={setSortByAlphabet}
      className={`ml-[0.1rem] h-7 w-8 bg-lightGray flex items-center justify-center rounded-r-md outline outline-1 outline-lightGray hover:outline-yellow-300 ${
        sortByAlphabet ? 'outline-yellow-300' : 'outline-purple-600'
      }`}
    >
      <FontAwesomeIcon icon={faSortAlphaDown} className="text-white w-4 h-4" />
    </button>
  </div>
);
