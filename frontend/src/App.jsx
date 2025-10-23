import { BrowserRouter, Route, Routes } from "react-router-dom";
// paginas principales y layout
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
// paginas del dashboard
import { VentasPage } from "./pages/VentasPage";
import { InventarioPage } from "./pages/InventarioPage";
import { DashboardPage } from "./pages/DashboardPage";
import { InventarioProvider } from "./contexts/inventario/InventarioContext";

function App() {
  return (
    <BrowserRouter>
      {/* Contexto para el inventario */}
      <InventarioProvider>
        <Routes>
          {/* autenticación */}
          <Route path="/auth" element={<LoginPage />} />

          {/* dashboard */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="venta" element={<VentasPage />} />
            <Route path="inventario" element={<InventarioPage />} />
          </Route>
        </Routes>
      </InventarioProvider>
    </BrowserRouter>
  );
}

export default App;
