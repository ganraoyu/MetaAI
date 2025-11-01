import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineShowChart } from 'react-icons/md';
import { useChampionDataContext } from '../ChampionDataContext';

export const TableChartToggle = () => {
  const { table, setTable, chart, setChart } = useChampionDataContext();

  return (
    <div className="flex flex-col">
      <div 
      className={`flex items-center justify-center w-6 h-6  cursor-pointer rounded-md ${table ? 'bg-[#272525]' : 'bg-transparent'}`}
        onClick={() => {setTable(true); setChart(false);}}
      >
        <FontAwesomeIcon icon={faTable} className='w-3 h-3'/>
      </div>
      <div className={`flex items-center justify-center w-6 h-6 cursor-pointer rounded-md ${chart ? 'bg-[#272525]' : 'bg-transparent'}`}
        onClick={() => {setTable(false); setChart(true);}}
      >
        <MdOutlineShowChart />
      </div>
    </div>
  )
};