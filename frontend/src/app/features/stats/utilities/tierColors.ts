export const getTierBackgroundColors = (tier: string) => {
switch (tier) {
  case "S":
    return "bg-[#df5b5b]"; // darkest gold
  case "A":
    return "bg-[#d8d15a]"; // darkest gold
  case "B":
    return "bg-[#e0d86f]"; // slightly lighter
  case "C":
    return "bg-[#e8e083]"; // mid-light
  case "D":
    return "bg-[#f0e898]"; // light pastel yellow
  case "F":
    return "bg-[#f8f0ad]"; // lightest / softest
  default:
    return "bg-gray-200";
}

};