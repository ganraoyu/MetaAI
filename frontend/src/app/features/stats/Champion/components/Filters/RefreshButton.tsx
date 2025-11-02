import { GrFormRefresh } from 'react-icons/gr'
import { useChampionContext } from '../../../contexts/ChampionContext';
import { useState } from 'react'

export const RefreshButton = () => {
  const { updateChampionData } = useChampionContext();
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = async () => {
    setIsRotating(true);
    await updateChampionData();
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className='flex items-center justify-center'>
      <button 
        className="flex items-center justify-center bg-[#1c1a1a] rounded-md h-8 w-8 hover:bg-[#3a3838] transition-colors outline outline-lightGray outline-1 " 
        onClick={handleRefresh}
      >
        <GrFormRefresh 
          className={`h-5 w-5 transition-transform duration-1000 ${
            isRotating ? 'rotate-[360deg]' : ''
          }`} 
        />
      </button>
    </div>
  )
};  