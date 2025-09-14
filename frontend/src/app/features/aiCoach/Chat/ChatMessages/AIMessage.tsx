import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { MarkdownComponents } from "../MarkdownComponents";

interface AIMessageProps {
  content: string;
  loading?: boolean;
}

export const AIMessage = ({ content, loading }: AIMessageProps) => (
  <div className="flex items-start w-full mt-3">
    <img
      src="./assets/TFT.png"
      alt="AI Avatar"
      className="w-11 h-11 mb-4 mt-3 animate-fade-slide-right"
    />
    <div className="ml-1 break-words whitespace-pre-line leading-snug py-3 px-5 max-w-[70%] flex items-center">
      {!content && loading && <div className="pulse-dot mr-2"></div>}
      {content && (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
          {content}
        </ReactMarkdown>
      )}
    </div>
  </div>
);
