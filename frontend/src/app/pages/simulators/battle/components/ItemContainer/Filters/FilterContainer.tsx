import { SearchBar } from "./SearchBar"
import { useItemContainerContext } from "../ItemContainerContext"

export const FilterContainer = () => {
  const {searchTerm, setSearchTerm} = useItemContainerContext()
  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
  )
}

