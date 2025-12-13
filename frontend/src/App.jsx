import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// paginas principales y layout
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DevelopPage } from "./pages/DevelopPage";
// paginas del dashboard
import { VentasPage } from "./pages/VentasPage";
import { InventarioPage } from "./pages/InventarioPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ConfigPage } from "./pages/ConfigPage";
import { ClientesPage } from "./pages/ClientesPage";
// paginas del config
import { CategorySection } from "./components/config/category/CategorySection";
import { SubCategorySection } from "./components/config/sub-category/SubCategorySection";
import { MeasureUnitSection } from "./components/config/measure-unit/MeasureUnitSection";
import { SupplierSection } from "./components/config/supplier/SupplierSection";
import { EmployeeSection } from "./components/config/employee/EmployeeSection";
import { PapeleraSection } from "./components/config/papelera/PapeleraSection";

// contextos
import { AuthProvider } from "./contexts/auth/AuthContext";
import { InventarioProvider } from "./contexts/inventario/InventarioContext";
import { ConfigProvider } from "./contexts/config/ConfigContext";
import { ClientProvider } from "./contexts/client/ClientContext";
import { VentasProvider } from "./contexts/ventas/VentasContext";

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
          {/* Contexto para las ventas */}
          <VentasProvider>
            {/* Contexto para los clientes */}
            <ClientProvider>
              {/* Contexto para la configuración */}
              <ConfigProvider>
                <Routes>
                  {/* autenticación */}
                  <Route path="/auth" element={<LoginPage />} />

                  {/* pruebas */}
                  <Route path="/dev" element={<DevelopPage />} />

                  {/* dashboard */}
                  <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="venta" element={<VentasPage />} />
                    <Route path="inventario" element={<InventarioPage />} />
                    <Route path="config" element={<ConfigPage />}>
                      <Route
                        index
                        element={<Navigate to="categorias" replace />}
                      />
                      <Route path="categorias" element={<CategorySection />} />
                      <Route
                        path="subcategorias"
                        element={<SubCategorySection />}
                      />
                      <Route
                        path="unidades-medida"
                        element={<MeasureUnitSection />}
                      />
                      <Route path="proveedores" element={<SupplierSection />} />
                      <Route path="empleados" element={<EmployeeSection />} />
                      <Route path="papelera" element={<PapeleraSection />} />
                    </Route>
                    {/* clientes */}
                    <Route path="clientes" element={<ClientesPage />} />
                  </Route>
                </Routes>
              </ConfigProvider>
            </ClientProvider>
          </VentasProvider>
        </InventarioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
