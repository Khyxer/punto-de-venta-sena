import { Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { helpSections } from "../../constants/constAsideHelpNavMenu";
import { useMarkdownHeadings } from "../../hooks/useMarkdownHeadings";
import { useState } from "react";

export const AsideHelp = ({ content }) => {
  const { section } = useParams();
  const headings = useMarkdownHeadings(content);
  const [searchTerm, setSearchTerm] = useState("");

  // Agrupar por categoría
  const groupedSections = helpSections.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Filtrar secciones por búsqueda
  const filteredSections = Object.entries(groupedSections).reduce(
    (acc, [category, items]) => {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {},
  );

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="p-4 w-72 border-r border-primary-color h-full overflow-y-auto sticky top-0 custom-scroll">
      {/* Buscador */}
      <div className="border rounded-md border-gray-500 flex items-center pl-2 w-full focus-within:ring-1 focus-within:ring-primary-color focus-within:ring-offset-2 duration-150 mb-6">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus:outline-none p-2 py-1 w-full select-none"
        />
      </div>

      {/* Navegación de secciones */}
      <nav className="mb-8">
        <p className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
          Secciones
        </p>
        {Object.entries(filteredSections).map(([category, items]) => (
          <div key={category} className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              {category}
            </p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/ayuda/${item.id}`}
                    className={`text-sm block py-1.5 px-3 rounded hover:bg-gray-100 duration-150 ${
                      section === item.id
                        ? "bg-primary-color/10 text-primary-color font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {Object.keys(filteredSections).length === 0 && searchTerm && (
          <p className="text-sm text-gray-500 italic">
            No se encontraron resultados
          </p>
        )}
      </nav>

      {/* TOC de la página actual */}
      {headings.length > 0 && !searchTerm && (
        <nav className="border-t pt-4">
          <p className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
            En esta página
          </p>
          <ul className="space-y-1">
            {headings.map((heading, index) => (
              <li
                key={index}
                style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className="text-sm text-gray-600 hover:text-primary-color duration-150 text-left w-full py-1 hover:translate-x-1 transition-transform"
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
};
