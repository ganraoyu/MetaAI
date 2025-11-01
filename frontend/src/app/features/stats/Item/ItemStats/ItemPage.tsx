import { ItemDataProvider } from "../ItemContext";
import { ItemPageOverView } from "./ItemPageOverView";
import { ItemStats } from "./ItemStats";

const ItemPageContainer = () => {
  return (
    <>
      <ItemPageOverView />
      <ItemStats />
    </>
  );
};
export const ItemPage = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-[#111111] min-h-screen pt-[4.5rem] w-full">
      <div>
        <ItemDataProvider>
          <ItemPageContainer />
        </ItemDataProvider>
      </div>
    </div>
  );
};
