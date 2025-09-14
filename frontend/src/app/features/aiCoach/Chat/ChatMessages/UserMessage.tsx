import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface UserMessageProps {
  content: string;
}

export const UserMessage = ({ content }: UserMessageProps) => (
  <div className="flex justify-end w-[45rem] mt-3">
    <div className="rounded-2xl break-words whitespace-pre-line leading-snug py-2 px-4 text-[0.85rem] max-w-[30rem] bg-[#1e1e1e]">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  </div>
);
