export const getTier = (averagePlacement: number) => {
  if (averagePlacement <= 4.20) return "S";
  if (averagePlacement <= 4.40) return "A";
  if (averagePlacement <= 4.60) return "B";
  if (averagePlacement <= 4.80) return "C";
  return "D";
}; 