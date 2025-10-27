import { ItemDataProvider } from "../ItemDataContext"
import { ItemPageOverView } from "./ItemPageOverView"
import { ItemStats } from "./ItemStats"

const ItemPageContainer = () => {
  return (
    <>
      <ItemPageOverView />
      <ItemStats />
    </>
  )
}
export const ItemPage = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-mainBackground min-h-screen pt-[4.5rem] w-full">
      <ItemDataProvider>
        <ItemPageContainer />
      </ItemDataProvider>
    </div>
  )
}
