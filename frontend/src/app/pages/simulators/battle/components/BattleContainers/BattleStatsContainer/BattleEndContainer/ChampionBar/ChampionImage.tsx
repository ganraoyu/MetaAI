import { ChampionProps } from "./types"

/**
 * @param
 * 
 * @returns {JSX.Element} 
 * 
*/

export const ChampionImage = ({champion }: ChampionProps): JSX.Element => {
  return (
    <div>
      <p>{champion.name}</p>
    </div>
  )
};
