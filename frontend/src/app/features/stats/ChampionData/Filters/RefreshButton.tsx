import { GrFormRefresh } from 'react-icons/gr'
import { useChampionDataContext } from '../ChampionDataContext'
import { useState } from 'react'

export const RefreshButton = () => {
  const { updateChampionData } = useChampionDataContext();
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = async () => {
    setIsRotating(true);
    await updateChampionData();
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className='flex items-center justify-center'>
      <button 
        className="flex items-center justify-center bg-[#272525] rounded-md h-8 w-8 hover:bg-[#3a3838] transition-colors outline outline-lightGray outline-1 " 
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