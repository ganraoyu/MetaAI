import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { NavProps } from "./types";
import { Link } from "react-router-dom";

const navigationItems: NavProps[] = [
  { label: "Guide" },
  { label: "Builder" },
  { label: "AI Coach", endPoint: "/coach" },
  { label: "Stats", icon: faCaretDown },
  { label: "Simulators", icon: faCaretDown },
  { label: "About", icon: faCaretDown },
  { label: "Info" },
];

const Header = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 font-mono bg-gray-500 h-[65px] ">
      <div className="flex justify-between items-center h-full bg-mainBackground px-6">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
         
          <div className="text-white text-xl tracking-widest font-semibold hover:text-purple-300 transition-colors">
            <Link to="/">TFTStratify</Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {navigationItems.map((item, idx) => (
            <div
              key={idx}
              className="relative flex h-full items-center gap-1"
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <div
                className="flex items-center gap-1 px-3 py-1 rounded-md cursor-pointer transition-all
                "
              >
                <div className="text-white text-sm tracking-widest">
                  <Link to={String(item.endPoint)}>{item.label}</Link>
                </div>
                {item.icon && (
                  <FontAwesomeIcon icon={item.icon} className="text-gray-500 text-xs" />
                )}
              </div>

              {/* Dropdown */}
              {item.icon && (
                <div
                  className={`absolute top-full left-0 w-full bg-mainBackground *:shadow-lg z-20
                    
                    ${open === item.label ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
                  style={{ transformOrigin: "top" }}
                >
                  {item.label === "Stats" && (
                    <>
                      <div className="p-2 flex text-white text-sm hover:bg-gray-800 cursor-pointer justify-center items-center border-t border-[#313131]">
                        Composition
                      </div>
                      <div className="p-2 flex text-white text-sm hover:bg-gray-800 cursor-pointer justify-center items-center border-t  border-[#313131]">
                        Champion
                      </div>
                      <div className="p-2 flex text-white text-sm hover:bg-gray-800 cursor-pointer justify-center items-center border-t border-[#313131]">
                        Trait
                      </div>
                      <div className="p-2 flex text-white text-sm hover:bg-gray-800 cursor-pointer justify-center items-center border-t border-b border-[#313131]">
                        Item
                      </div>
                    </>
                  )}
                  {item.label === "Simulators" && (
                    <>
                      <div className="p-2 flex text-white text-sm hover:bg-gray-800 cursor-pointer justify-center items-center border-t border-[#313131]">
                        <Link to="/simulator/battle">Battle</Link>
                      </div>
                      <div className="p-2 flex text-white text-sm hover:bg-gray-800 cursor-pointer justify-center items-center border-t border-b border-[#313131]">
                        Roll
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* External Links */}
          <div
            onClick={() => window.open("https://paypal.com", "_blank")}
            className="p-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-cyan-500/20 hover:shadow-[0_0_8px_#22d3ee]"
          >
            <FontAwesomeIcon icon={faPaypal} className="text-white text-lg" />
          </div>
          <div
            onClick={() => window.open("https://github.com", "_blank")}
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
