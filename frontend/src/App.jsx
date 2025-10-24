import { BrowserRouter, Route, Routes } from "react-router-dom";
// paginas principales y layout
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
// paginas del dashboard
import { VentasPage } from "./pages/VentasPage";
import { InventarioPage } from "./pages/InventarioPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ConfigPage } from "./pages/ConfigPage";
// contextos
import { AuthProvider } from "./contexts/auth/AuthContext";
import { InventarioProvider } from "./contexts/inventario/InventarioContext";
import { ConfigProvider } from "./contexts/config/ConfigContext";

// toast
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      {/* Contexto para la autenticación */}
      <AuthProvider>
        {/* Contexto para el inventario */}
        <InventarioProvider>
          {/* Contexto para la configuración */}
          <ConfigProvider>
            <Routes>
              {/* autenticación */}
              <Route path="/auth" element={<LoginPage />} />

              {/* dashboard */}
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="venta" element={<VentasPage />} />
                <Route path="inventario" element={<InventarioPage />} />
                <Route path="config" element={<ConfigPage />} />
              </Route>
            </Routes>
          </ConfigProvider>
        </InventarioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
