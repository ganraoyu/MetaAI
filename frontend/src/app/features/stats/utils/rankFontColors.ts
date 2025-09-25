export const getRankColor = (index: number) => {
  switch (index) {
    case 0:
      return "text-[#FFD700]";
    case 1:
      return "text-[#C0C0C0]";
    case 2:
      return "text-[#CD7F32]";
    default:
      return "";
  }
};
