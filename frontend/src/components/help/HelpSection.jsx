import ReactMarkdown from "react-markdown";

export const HelpSection = ({ content }) => {
  const generateId = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  return (
    <div className="markdown-content w-full">
      <ReactMarkdown
        components={{
          h1: ({ node, children, ...props }) => (
            <h1 id={generateId(children)} {...props}>
              {children}
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2 id={generateId(children)} {...props}>
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 id={generateId(children)} {...props}>
              {children}
            </h3>
          ),
          h4: ({ node, children, ...props }) => (
            <h4 id={generateId(children)} {...props}>
              {children}
            </h4>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
