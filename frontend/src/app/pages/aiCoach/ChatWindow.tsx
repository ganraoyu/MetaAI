import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // allows HTML + formatting in Markdown
import { useChatContext } from "./ChatContext";

export const ChatWindow = () => {
  const { messages } = useChatContext();

  return (
    <div
      className="overflow-y-auto p-4 screenbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        return (
          <div key={index}>
            <div
              className={`flex mt-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl break-words whitespace-pre-line leading-snug ${
                  isUser
                    ? "bg-[#1e1e1e] py-2 px-4 text-[0.85rem] max-w-[30rem]"
                    : "py-3 px-5 max-w-full text-base"
                }`}
              >
                {isUser ? (
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-[1.1rem] font-bold mb-[-0.25rem]"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-[1rem] font-semibold mb-[-0.25rem]"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-[0.85rem] font-medium mb-[-0.25rem]"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-[0.85rem] leading-snug mb-[-0.25rem]"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc ml-5 mb-[-0.25rem] space-y-0.5 text-[0.85rem]"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          className="text-[0.85rem] leading-snug mb-[-0.25rem]"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
