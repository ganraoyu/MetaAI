import { getTraitByName } from "../../../../data/dataUtils";
import { useTFTSetContext } from "../../../../../../../utilities/TFTSetContext";
import { mapTraitTierBorderColor, mapTraitTierColor } from "./../utils";

export const TraitsCard = ({
  trait,
  count,
}: {
  trait: string;
  count: number;
}) => {
  const { set } = useTFTSetContext();
  const traitObj = getTraitByName(trait, set);

  if (!traitObj || !traitObj.tiers || traitObj.tiers.length === 0) return null;

  let activeTier = traitObj.tiers
    .slice()
    .reverse()
    .find((tier: { count: number }) => count >= tier.count);

  if (!activeTier) activeTier = traitObj.tiers[0];

  const isActive = count >= activeTier.count;

  const gradientBg = mapTraitTierColor(activeTier.tierLabel || "");
  const borderColor = mapTraitTierBorderColor(activeTier.tierLabel || "");
  const fillBackground = isActive ? gradientBg : "#2f2828";
  const outerBorderColor = isActive ? borderColor : "#555555";

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
            background: fillBackground,
            backgroundSize: "cover", // add this so gradient renders fully
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            boxShadow: `0 0 8px 2px ${isActive ? borderColor : "#000000"}`,
            width: "31px",
            height: "31px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`../assets/${set}/traits/${trait}.png`}
            alt={`${trait} icon`}
            className="w-5 h-5 object-contain"
          />
        </div>
      </div>

      {/* Count */}
      <div className="h-6 w-6 bg-[#392d2d] rounded-sm flex items-center justify-center text-white font-semibold">
        {count}
      </div>

      {/* Trait Name and Tier Counts */}
      <div>
        <p className="text-xs">{trait}</p>
        <div className="flex flex-row items-center gap-1">
          {traitObj.tiers.map((tier: any, index: number) => (
            <p key={index} className="m-0 text-[0.65rem]">
              <span
                className={`${
                  tier.count > count ? "text-[#7d7777]" : "text-white"
                }`}
              >
                {tier.count}
                {index < traitObj.tiers.length - 1 ? " / " : ""}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
