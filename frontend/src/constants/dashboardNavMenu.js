import { Home, ShoppingCart, Box, User, File } from "lucide-react";

export const dashboardNavMenu = [
  {
    name: "Dashboard",
    icon: Home,
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
];
