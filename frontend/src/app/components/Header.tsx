import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faPaypal } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black h-[65px] z-50 opacity-90">
      <div className="flex justify-between items-center bg-black h-full">
        <div className="flex items-center pl-3 ml-4 h-full hover:cursor-pointer " onClick={() => window.location.href = '/Stratify/'}>
          <img src={logo} alt="Logo" className='w-8 h-8 mr-2 mb-1 invert brightness-0'/>
          <h1 className="text-white text-[22px] tracking-widest font-bold">TFTStratify</h1>
        </div>
        <div className="flex items-center space-x-5 p-4 pr-10">
          <button className="text-white text-[14px] font-semibold CustomFont px-2 hover:bg-darkGray hover:rounded-full align-middle tracking-widest">Guide</button>
          <button className="text-white text-[14px] font-semibold CustomFont px-2 tracking-widest hover:bg-darkGray hover:rounded-full">Builder</button>
          <div className="flex items-center px-2 hover:bg-darkGray hover:rounded-full">
            <button className="text-white text-[14px] font-semibold CustomFont m-1 tracking-widest">Tierlist</button>
            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-[12px]"/>
          </div>
          <div className="flex items-center px-2 hover:bg-darkGray hover:rounded-full"> 
            <button className="text-white text-[14px] font-semibold CustomFont m-1 tracking-widest">Simulators</button>
            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-[12px]"/>
          </div>
          <div className="flex items-center px-2 hover:bg-darkGray hover:rounded-full">
            <button className="text-white text-[14px] font-semibold CustomFont m-1 tracking-widest">About</button>
            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-[12px]"/>
          </div>
          <button className="text-white text-l font-semibold CustomFont px-3 tracking-widest hover:bg-darkGray hover:rounded-full">Info</button>
          <a href='https://paypal.com' className='flex items-center'><FontAwesomeIcon icon={faPaypal} className="text-white text-xl px-3"/></a>
          <a href='https://github.com' className='flex items-center'><FontAwesomeIcon icon={faGithub} className="text-white text-xl px-3 pr-5"/></a>
        </div>
      </div>
    </div>
  );
};

export default Header;