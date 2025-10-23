import { HeaderDashboard } from "../components/HeaderDashboard";
import { Outlet } from "react-router-dom";
import { AsideDashboard } from "../components/AsideDashboard";

export const DashboardLayout = () => {
  return (
    <main className="h-screen flex">
      <AsideDashboard />
      <section className="flex flex-col w-full">
        <HeaderDashboard />
        <div className="p-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
};
