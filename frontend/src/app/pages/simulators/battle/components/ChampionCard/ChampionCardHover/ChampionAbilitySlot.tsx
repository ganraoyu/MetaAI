export const ChampionAbilitySlot = () => {
  return (
        <div
          onMouseEnter={() => setAbilityHover(true)}
          onMouseLeave={() => setAbilityHover(false)}
        >
          {champion ? (
            <img
              // Use the abilityData to find the champion's ability image
              src={
                abilityData.find((ability) => ability.name === champion)?.image
              }
              alt={`${champion} ability`}
              className="h-8 w-8 border-2 border-gray-700"
            />
          ) : (
            <div className="border-2 h-8 w-8 border-gray-700"></div>
          )}
        </div>
  )
}

