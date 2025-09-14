import { TypeWriterText} from "./TypewriterText";
import { SearchBar } from './SearchBar';
import { ScrollButtons } from './ScrollButtons';
import { FollowUpChatWindow } from "./FollowUpChatWindow/_FollowUpChatWindow";

export const InitialChatWindow = () => {
  return (
    <div className="text-[0.85rem] px-4">
      <TypeWriterText />
      <SearchBar />
      <ScrollButtons  />
      <FollowUpChatWindow />
    </div>
  );
};
