import { HeaderDashboard } from "../components/HeaderDashboard";
import { Outlet } from "react-router-dom";
import { AsideDashboard } from "../components/AsideDashboard";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth/useAuthContext";
import { BasicLoader } from "../components/loaders/BasicLoader";

export const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuthContext();

  // Espera mientras valida el token
  if (loading) {
    return <BasicLoader />;
  }

  // Si ya terminó de validar y NO está autenticado, redirige
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Si está autenticado, muestra el dashboard
  return (
    <main className="h-screen flex">
      <AsideDashboard />
      <section className="flex flex-col w-full overflow-hidden">
        <HeaderDashboard />
        <Outlet />
      </section>
    </main>
  );
};
