import { SearchBar } from "./SearchBar"
import { ItemTypeToggle } from "./ItemTypeToggle"

export const FilterContainer = () => {
  return (
    <div className="pt-1">
      <SearchBar/>
      <ItemTypeToggle />
    </div>
  )
}

