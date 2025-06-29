import { HexCells } from "./HexCells"

export const HexBoard = () => {
  return (
    <div className="flex-1 flex items-center justify-center mt-[2.6rem]">
      <div className="grid grid-cols-1 justify-items-center">
        <div className='flex justify-center items-center gap-0 mr-8 mb-[-1.1rem]'>
          <HexCells champion={null} row={0} col={0} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={0} col={1} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={0} col={2} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={0} col={3} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={0} col={4} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={0} col={5} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={0} col={6} occupied={false} team={'opponent'} />
        </div>
        <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
          <HexCells champion={null} row={1} col={0} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={1} col={1} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={1} col={2} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={1} col={3} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={1} col={4} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={1} col={5} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={1} col={6} occupied={false} team={'opponent'} />
        </div>
        <div className='flex justify-center items-center gap-0 mr-8 mb-[-1.1rem]'>
          <HexCells champion={null} row={2} col={0} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={2} col={1} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={2} col={2} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={2} col={3} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={2} col={4} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={2} col={5} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={2} col={6} occupied={false} team={'opponent'} />
        </div>
        <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
          <HexCells champion={null} row={3} col={0} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={3} col={1} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={3} col={2} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={3} col={3} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={3} col={4} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={3} col={5} occupied={false} team={'opponent'} />
          <HexCells champion={null} row={3} col={6} occupied={false} team={'opponent'} />
        </div>
        <div className='flex justify-center items-center gap-0 mt-[0.5rem] mr-8 mb-[-1.1rem]'>
          <HexCells champion={null} row={0} col={0} occupied={false} team={'player'} />
          <HexCells champion={null} row={0} col={1} occupied={false} team={'player'} />
          <HexCells champion={null} row={0} col={2} occupied={false} team={'player'} />
          <HexCells champion={null} row={0} col={3} occupied={false} team={'player'} />
          <HexCells champion={null} row={0} col={4} occupied={false} team={'player'} />
          <HexCells champion={null} row={0} col={5} occupied={false} team={'player'} />
          <HexCells champion={null} row={0} col={6} occupied={false} team={'player'} />
        </div>
        <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
          <HexCells champion={null} row={1} col={0} occupied={false} team={'player'} />
          <HexCells champion={null} row={1} col={1} occupied={false} team={'player'} />
          <HexCells champion={null} row={1} col={2} occupied={false} team={'player'} />
          <HexCells champion={null} row={1} col={3} occupied={false} team={'player'} />
          <HexCells champion={null} row={1} col={4} occupied={false} team={'player'} />
          <HexCells champion={null} row={1} col={5} occupied={false} team={'player'} />
          <HexCells champion={null} row={1} col={6} occupied={false} team={'player'} />
        </div>
        <div className='flex justify-center items-center gap-0 mr-8 mb-[-1.1rem]'>
          <HexCells champion={null} row={2} col={0} occupied={false} team={'player'} />
          <HexCells champion={null} row={2} col={1} occupied={false} team={'player'} />
          <HexCells champion={null} row={2} col={2} occupied={false} team={'player'} />
          <HexCells champion={null} row={2} col={3} occupied={false} team={'player'} />
          <HexCells champion={null} row={2} col={4} occupied={false} team={'player'} />
          <HexCells champion={null} row={2} col={5} occupied={false} team={'player'} />
          <HexCells champion={null} row={2} col={6} occupied={false} team={'player'} />
        </div>
        <div className='flex justify-center items-center gap-0 ml-10 mb-[-1.1rem]'>
          <HexCells champion={null} row={3} col={0} occupied={false} team={'player'} />
          <HexCells champion={null} row={3} col={1} occupied={false} team={'player'} />
          <HexCells champion={null} row={3} col={2} occupied={false} team={'player'} />
          <HexCells champion={null} row={3} col={3} occupied={false} team={'player'} />
          <HexCells champion={null} row={3} col={4} occupied={false} team={'player'} />
          <HexCells champion={null} row={3} col={5} occupied={false} team={'player'} />
          <HexCells champion={null} row={3} col={6} occupied={false} team={'player'} />
        </div>
      </div>
    </div>
  )
}


