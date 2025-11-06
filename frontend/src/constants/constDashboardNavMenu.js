import {
  Home,
  ShoppingCart,
  Box,
  User,
  File,
  Settings,
  LayoutDashboard,
  Layers2,
  Layers,
  PencilRuler,
  Truck,
  IdCardLanyard,
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
    name: "Reportes",
    icon: File,
    path: "/reportes",
  },
  {
    name: "Configuración",
    icon: Settings,
    path: "/config",
    dropMenu: [
      {
        name: "Categorias",
        icon: Layers2,
        path: "/config/categorias",
      },
      {
        name: "Subcategorias",
        icon: Layers,
        path: "/config/subcategorias",
      },
      {
        name: "Unidades Medida",
        icon: PencilRuler,
        path: "/config/unidades-medida",
      },
      {
        name: "Proveedores",
        icon: Truck,
        path: "/config/proveedores",
      },
      {
        name: "Empleados",
        icon: IdCardLanyard,
        path: "/config/empleados",
      },
    ],
  },
  //sub menus del config modo drop
  // {
  //   name: "Categorias",
  //   icon: Layers2,
  //   path: "/config/categorias",

  // },
  // {
  //   name: "Subcategorias",
  //   icon: Layers,
  //   path: "/config/subcategorias",
  // },
  // {
  //   name: "Unidades Medida",
  //   icon: PencilRuler,
  //   path: "/config/unidades-medida",
  // },
  // {
  //   name: "Proveedores",
  //   icon: Truck,
  //   path: "/config/proveedores",
  // },
  // {
  //   name: "Empleados",
  //   icon: IdCardLanyard,
  //   path: "/config/empleados",
  // },
];
