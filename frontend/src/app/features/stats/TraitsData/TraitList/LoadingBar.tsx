import React from "react";
import "./_TraitList.css";

interface LoadingBarProps {
  width?: string;   
  height?: string;  
  className?: string;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  width = "w-full",
  height = "h-4",
  className = "",
}) => {
  return <div className={`loading-bar ${width} ${height} ${className}`}></div>;
};
