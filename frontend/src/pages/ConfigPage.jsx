import { configMenu } from "../constants/constConfigPageNavMenu";
import { Link, Outlet, useLocation } from "react-router-dom";

export const ConfigPage = () => {
  const { pathname } = useLocation();

  const isActiveConfigItem = (itemPath) => {
    // Construye la ruta completa
    const fullPath = `/config/${itemPath}`;
    // Verifica si el pathname actual comienza con esta ruta
    return pathname.startsWith(fullPath);
  };

  return (
    <section className="h-full flex">
      {/* menu de navegación */}
      <aside className="border-primary-color border-r h-full p-4 select-none">
        <nav>
          {configMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 duration-100 rounded-lg
                ${
                  isActiveConfigItem(item.path)
                    ? "bg-primary-color text-light-color"
                    : "hover:bg-gray-200 text-gray-600 hover:text-black"
                }
              `}
            >
              <item.icon className="w-5" />
              <p className="text-sm">{item.name}</p>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="p-4 flex-1">
        <Outlet />
      </main>
    </section>
  );
};
