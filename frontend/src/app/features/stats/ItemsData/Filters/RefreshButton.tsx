import { GrFormRefresh } from 'react-icons/gr'
import { useItemDataContext } from '../ItemDataContext'
import { useState } from 'react'

export const RefreshButton = () => {
  const { updateItemData } = useItemDataContext();
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = async () => {
    setIsRotating(true);
    await updateItemData();
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className='flex items-center justify-center'>
      <button 
        className="flex items-center justify-center bg-[#272525] rounded-md h-8 w-8 hover:bg-[#3a3838] transition-colors" 
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
}
