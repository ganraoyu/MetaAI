export const averagePlaceColors = (averagePlaceColors: number) => {
  if (averagePlaceColors <= 4) {
    return "text-[#6fc36f]"; // green
  } else if (averagePlaceColors <= 4.5) {
    return "text-[#f0e898]"; // yellow
  } else {
    return "text-[#df5b5b]"; // red
  }
};
