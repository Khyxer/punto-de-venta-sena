import { Link, useLocation } from "react-router-dom";
import { dashboardNavMenu } from "../constants/constDashboardNavMenu";

export const AsideDashboard = () => {
  /* el pathname devuelve el / que se encuentra en la url
   * por ejemplo si la url es http://localhost:5173/dashboard el pathname sera "/dashboard" */
  const { pathname } = useLocation();
  return (
    <aside className="max-w-54 w-full border-primary-color border-r select-none">
      {/* logo y nombre */}
      <header className="h-16 border-primary-color border-b p-1 gap-2 flex items-center justify-center select-none">
        <img
          src="/LogoMain.png"
          alt="Logo"
          className="h-full object-contain p-1"
          draggable={false}
        />
        <h1 className="text-xl font-bold text-primary-color">NOVA POS</h1>
      </header>

      <nav className="p-2">
        {dashboardNavMenu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            /* si el pathname es igual al path de la opcion se le agrega un color de fondo pq esta seleccionado */
            className={`flex items-center gap-3 px-4 py-3 duration-100
              ${
                pathname === item.path
                  ? " bg-primary-color text-light-color rounded-lg "
                  : " hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg "
              }
            `}
          >
            <item.icon />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
