export const getBorderColor = (cost: number) => {
  switch (cost) {
    case 1:
      return "border-gray-400";
    case 2:
      return "border-green-500";
    case 3:
      return "border-blue-500";
    case 4:
      return "border-purple-700";
    case 5:
      return "border-yellow-500";
    case 6:
      return "border-orange-500";
    default:
      return "border-red-500";
  }
};

export const getCostGradient = (cost: number): string => {
  switch (cost) {
    case 1:
      return "from-gray-600 to-gray-400";
    case 2:
      return "from-green-700 to-green-500";
    case 3:
      return "from-blue-700 to-blue-500";
    case 4:
      return "from-purple-900 to-purple-400";
    case 5:
      return "from-yellow-600 to-yellow-400";
    default:
      return "from-red-700 to-red-500";
  }
};
