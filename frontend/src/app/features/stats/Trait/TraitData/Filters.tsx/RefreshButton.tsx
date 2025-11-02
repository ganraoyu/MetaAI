import { GrFormRefresh } from 'react-icons/gr'
import { useTraitContext } from '../../../contexts/TraitContext'
import { useState } from 'react'

export const RefreshButton = () => {
  const { updateTraitData } = useTraitContext();
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = async () => {
    setIsRotating(true);
    await updateTraitData();
    setTimeout(() => setIsRotating(false), 1000);
  };

  return (
    <div className='flex items-center justify-center'>
      <button 
        className="flex items-center justify-center outline outline-lightGray outline-1 bg-[#272525] rounded-md h-8 w-8 hover:bg-[#3a3838] transition-colors" 
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
