import React from "react";

interface StarProps {
  textColor?: string; // stroke color
  fillColor?: string; // fill color (optional)
  className?: string;
}

export const Star: React.FC<StarProps> = ({ textColor, fillColor, className = "w-4 h-4" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fillColor ?? "none"}
      stroke={textColor}
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9" />
    </svg>
  );
};
