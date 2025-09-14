import { TypeWriterText} from "./TypewriterText";
import { SearchBar } from './SearchBar';
import { ScrollButtons } from './ScrollButtons';

export const InitialChatWindow = () => {
  return (
    <div className="text-[0.85rem] px-4 h-56">
      <TypeWriterText />
      <SearchBar />
      <ScrollButtons  />
    </div>
  );
};
