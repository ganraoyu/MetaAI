import { TypeWriterText} from "./TypewriterText";
import { SearchBar } from './SearchBar';
import { ScrollButtons } from './ScrollButtons';
import { FollowUpChatWindow } from "./FollowUpChatWindow/_FollowUpChatWindow";
import { useInitialChatContext } from "./InitialChatContext";

export const InitialChatWindow = () => {
  const { userData } = useInitialChatContext()

  return (
    <div className="text-[0.85rem] px-4">
      <TypeWriterText />
      <SearchBar />
      <ScrollButtons  />
      {userData && 
        <FollowUpChatWindow />
      }
    </div>
  );
};
