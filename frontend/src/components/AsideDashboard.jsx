import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { dashboardNavMenu } from "../constants/constDashboardNavMenu";
import { useAuthContext } from "../contexts/auth/useAuthContext";

export const AsideDashboard = () => {
  const { pathname } = useLocation();
  const { currentUser } = useAuthContext();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const isActive = (itemPath) => {
    if (itemPath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(itemPath);
  };

  const configMenu = () => {
    if (currentUser.role === "admin") {
      return dashboardNavMenu;
    } else {
      return dashboardNavMenu.filter((item) => item.name !== "Configuración");
    }
  };

  const toggleDropdown = (itemName) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <aside className="max-w-54 w-full border-primary-color border-r select-none">
      <header className="h-12 border-primary-color border-b p-1 gap-2 flex items-center justify-center select-none">
        <img
          src="/LogoMain.png"
          alt="Logo"
          className="h-full object-contain p-1"
          draggable={false}
        />
        <h1 className="text-xl font-bold text-primary-color">NOVA POS</h1>
      </header>

      <nav className="p-2">
        {configMenu().map((item, index) => (
          <div key={index}>
            {item.dropMenu ? (
              <div className="relative">
                {/* Botón de Configuración colapsable */}
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 cursor-pointer text-sm
                    ${
                      isActive(item.path)
                        ? "bg-primary-color text-light-color rounded-lg"
                        : "hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={18} />
                    {item.name}
                  </div>
                  <ChevronRight
                    size={18}
                    style={{
                      rotate: openDropdowns[item.name] ? "90deg" : "0deg",
                    }}
                    className="transition-transform duration-200"
                  />
                </button>

                {/* Cuadrado para la animación de colapsar y expandir */}
                <div
                  className="absolute w-full -bottom-10  duration-100 bg-white"
                  style={{
                    height: openDropdowns[item.name] ? "0%" : "100%",
                  }}
                ></div>

                {/* Sub-items del dropdown */}
                {/* Ya no debe ser un renderizado condicional porque si no el cuadrado de la animación no se muestra correctamente */}
                {/* {openDropdowns[item.name] && ( */}
                <div className="mt-1">
                  {item.dropMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg  ml-4 text-sm
                          ${
                            isActive(subItem.path)
                              ? "bg-primary-color text-light-color"
                              : "hover:bg-gray-200 text-gray-600 hover:text-black"
                          }
                        `}
                    >
                      <subItem.icon size={18} />
                      {subItem.name}
                    </Link>
                  ))}
                </div>
                {/* )} */}
              </div>
            ) : (
              /* Items normales sin dropdown */
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg
                  ${
                    isActive(item.path)
                      ? "bg-primary-color text-light-color"
                      : "hover:bg-gray-200 text-gray-600 hover:text-black"
                  }
                `}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
