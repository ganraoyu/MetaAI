export const MarkdownComponents = {
  h1: ({ node, ...props }: any) => (
    <h1 className="text-[1.1rem] font-bold mb-[-0.25rem]" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-[1rem] font-semibold mb-[-0.25rem]" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-[0.85rem] font-medium mb-[-0.25rem]" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="text-[0.85rem] leading-snug mb-[-0.25rem]" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="list-disc ml-5 mb-[-0.25rem] space-y-0.5 text-[0.85rem]" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="text-[0.85rem] leading-snug mb-[-0.25rem]" {...props} />
  ),
};
