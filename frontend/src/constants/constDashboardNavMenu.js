import {
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
  Trash2,
  BadgeQuestionMark,
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
    name: "Ayuda",
    icon: BadgeQuestionMark,
    path: "/ayuda",
  },
  {
    name: "Ajustes",
    icon: Settings,
    path: "/config",
    dropMenu: [
      {
        name: "Categorías",
        icon: Layers2,
        path: "/config/categorias",
      },
      {
        name: "Subcategorías",
        icon: Layers,
        path: "/config/subcategorias",
      },
      {
        name: "Unidades",
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
      {
        name: "Papelera",
        icon: Trash2,
        path: "/config/papelera",
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
