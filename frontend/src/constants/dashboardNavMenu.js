import {
  Home,
  ShoppingCart,
  Box,
  User,
  File,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export const dashboardNavMenu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Venta",
    icon: ShoppingCart,
    path: "/venta",
  },
  {
    name: "Inventario",
    icon: Box,
    path: "/inventario",
  },
  {
    name: "Clientes",
    icon: User,
    path: "/clientes",
  },
  {
    name: "Empleados",
    icon: User,
    path: "/empleados",
  },
  {
    name: "Reportes",
    icon: File,
    path: "/reportes",
  },
  {
    name: "Configuración",
    icon: Settings,
    path: "/config",
  },
];
