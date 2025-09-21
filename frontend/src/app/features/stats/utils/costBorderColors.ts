export const getCostBorderColors = (cost: number) => {
  switch (cost) {
    case 1: return "gray-400";
    case 2: return "green-500";
    case 3: return "blue-500";
    case 4: return "purple-700";
    case 5: return "yellow-500";
    case 6: return "orange-500";
    default: return "red-500";
  }
};

