import { ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const NavigateButton = ({ section, type }) => {
  console.log(section.id === null);

  if (section.id === null) {
    return (
      <div
        className={`flex items-end gap-2 py-1 px-3 opacity-50 cursor-not-allowed ${type === "prev" ? "" : "flex-row-reverse"}`}
      >
        <ChevronRight
          className={`text-gray-400 ${type === "prev" ? "rotate-180" : ""}`}
        />
        <div className={`flex flex-col`}>
          <p className="text-start text-sm text-gray-400 select-none">
            {type === "prev" ? "Anterior" : "Siguiente"}
          </p>
          <p>{section.name}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/ayuda/${section.id}`}
      className={`flex items-end gap-2 group py-1 px-3 cursor-pointer ${type === "prev" ? "" : "flex-row-reverse"}`}
    >
      <ChevronRight
        className={`text-gray-400 group-hover:text-gray-700 duration-150 ${type === "prev" ? "rotate-180" : ""}`}
      />
      <div className={`flex flex-col`}>
        <p className="text-start text-sm text-gray-400 group-hover:text-gray-700 duration-150 select-none">
          {type === "prev" ? "Anterior" : "Siguiente"}
        </p>
        <p>{section.name}</p>
      </div>
    </Link>
  );
};

export const HelpSection = ({ content, navSection }) => {
  const generateId = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  return (
    <section className="w-full">
      <div className="markdown-content">
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

      <footer className="flex justify-between px-12 pb-3 mt-4">
        <div className=" border-t-2 border-gray-200 pt-8 w-full flex justify-between">
          <NavigateButton section={navSection.prev} type="prev" />
          <NavigateButton section={navSection.next} type="next" />
        </div>
      </footer>
    </section>
  );
};
