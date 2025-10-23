import { Link, useLocation } from "react-router-dom";
import { dashboardNavMenu } from "../constants/dashboardNavMenu";

export const AsideDashboard = () => {
  const { pathname } = useLocation();
  return (
    <aside className="max-w-54 w-full border-primary-color border-r">
      <header className="h-18 border-primary-color border-b p-1 flex items-center justify-center select-none">
        <img
          src="/LogoMain.png"
          alt="Logo"
          className="h-full"
          draggable={false}
        />
        <h1 className="text-2xl font-bold text-primary-color">AxisPOS</h1>
      </header>

      <nav>
        {dashboardNavMenu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={
              pathname === item.path
                ? "flex items-center gap-2 px-4 py-3 bg-primary-color text-light-color"
                : "flex items-center gap-2 px-4 py-3 hover:bg-primary-color hover:text-light-color"
            }
          >
            <item.icon />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
