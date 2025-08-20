import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faPaypal } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 font-mono bg-gray-500 h-[65px] ">
      <div className="flex justify-between items-center h-full bg-mainBackground px-6 border-b border-gray-700">
        
        {/* Logo + Title */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => (window.location.href = '/Stratify/')}
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="w-8 h-8 invert brightness-0 drop-shadow-md"
          />
          <div className="text-white text-xl tracking-widest font-semibold hover:text-purple-300 transition-colors">
            TFTStratify
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {[
            { label: 'Guide' },
            { label: 'Builder' },
            { label: 'Tierlist', icon: faCaretDown },
            { label: 'Simulators', icon: faCaretDown },
            { label: 'About', icon: faCaretDown },
            { label: 'Info' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer transition-all duration-200
                         hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-[0_0_8px_#22d3ee]"
            >
              <div className="text-white text-sm tracking-widest">{item.label}</div>
              {item.icon && (
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className="text-gray-500 text-xs"
                />
              )}
            </div>
          ))}

          {/* External Links */}
          <div 
            onClick={() => window.open('https://paypal.com', '_blank')} 
            className="p-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-cyan-500/20 hover:shadow-[0_0_8px_#22d3ee]"
          >
            <FontAwesomeIcon icon={faPaypal} className="text-white text-lg" />
          </div>
          <div 
            onClick={() => window.open('https://github.com', '_blank')} 
            className="p-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-cyan-500/20 hover:shadow-[0_0_8px_#22d3ee]"
          >
            <FontAwesomeIcon icon={faGithub} className="text-white text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;