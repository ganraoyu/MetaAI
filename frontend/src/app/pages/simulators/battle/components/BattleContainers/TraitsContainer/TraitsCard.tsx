import { getTraitByName } from "../../../data/dataUtils";
import { useTFTSetContext } from "../../../../../../utilities/TFTSetContext";

function mapTraitTierColor(tierLabel: string): string {
  switch (tierLabel) {
    case "Bronze":
      return "#8c5a2c";
    case "Silver":
      return "#a8aeb4";
    case "Gold":
      return "#e0b13d";
    case "Prismatic":
      return "#be40ff";
    default:
      return "#6c6c6c";
  }
}

export const TraitsCard = ({
  trait,
  count,
}: {
  trait: string;
  count: number;
}) => {
  const { set } = useTFTSetContext();
  const traitObj = getTraitByName(trait);

  if (!traitObj || !traitObj.tiers || traitObj.tiers.length === 0) return null;

  let activeTier = traitObj.tiers
    .slice()
    .reverse()
    .find((tier: { count: number }) => count >= tier.count);

  if (!activeTier) activeTier = traitObj.tiers[0];

  const isActive = count >= activeTier.count;

  const bgColor = mapTraitTierColor(activeTier.tierLabel || "");

  const backgroundColor = isActive ? bgColor : "#2f2828"; 

  const outerBorderColor = isActive ? "#000000" : "#555555";

  return (
    <div className="flex items-center gap-2 pt-3 pl-4 pr-4">

      {/* Outer border wrapper */}
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          padding: "2px",
          backgroundColor: outerBorderColor,
          display: "inline-flex",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            backgroundColor: backgroundColor,
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            boxShadow: `0 0 8px 2px ${bgColor}`,
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`../assets/${set}/traits/${trait}.png`}
            alt={`${trait} icon`}
            className="w-5 h- object-contain"
          />
        </div>
      </div>

      {/* Count */}
      <div className="h-5 w-5 bg-[#392d2d] rounded-sm flex items-center justify-center text-white font-semibold">
        {count}
      </div>

      {/* Trait Name/Tiers */}
      <div>
        <p>{trait}</p>
      </div>
    </div>
  );
};
