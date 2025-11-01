export const getPlacementChangeColor = (placementChange: number) => {
  if (placementChange > 0) return "text-[#ff4d4d]"; // red = worse
  if (placementChange < 0) return "text-[#5dff5d]"; // green = better
  return "text-[#b8b8b8]"; // neutral
};