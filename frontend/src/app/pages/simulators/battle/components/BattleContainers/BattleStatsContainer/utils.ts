export const mapTraitTierColor = (tierLabel: string): string => {
  switch (tierLabel) {
    case "Bronze": {
      const dark = "#583a26"; // darker color
      const light = "#b07c4a"; // original lighter color
      return `linear-gradient(to bottom, ${dark} 0%, ${light} 30%, ${light} 30%, ${dark} 100%)`;
    }
    case "Silver": {
      const dark = "#34435a";
      const light = "#c3cbd2";
      return `linear-gradient(to bottom, ${dark} 0%, ${light} 30%, ${light} 30%, ${dark} 100%)`;
    }
    case "Gold": {
      const dark = "#7a6e39";
      const light = "#f4d77a";
      return `linear-gradient(to bottom, ${dark} 0%, ${light} 30%, ${light} 30%, ${dark} 100%)`;
    }
    case "Prismatic": {
      const dark = "#6800cc";
      const light = "#d088ff";
      return `linear-gradient(to bottom, ${dark} 0%, ${light} 30%, ${light} 30%, ${dark} 100%)`;
    }
    default: {
      const dark = "#444444";
      const light = "#888888";
      return `linear-gradient(to bottom, ${dark} 0%, ${light} 30%, ${light} 30%, ${dark} 100%)`;
    }
  }
};

export const mapTraitTierBorderColor = (tierLabel: string): string => {
  switch (tierLabel) {
    case "Bronze":
      return "#7a5c3d";
    case "Silver":
      return "#b0b6bc";
    case "Gold":
      return "#d1a83d";
    case "Prismatic":
      return "#a84fff";
    default:
      return "#666666";
  }
};
