import {
  HardHat,
  IdCardLanyard,
  Layers,
  Layers2,
  PencilRuler,
  Truck,
} from "lucide-react";

export const configMenu = [
  {
    name: "Categorias",
    icon: Layers2,
    path: "categorias",
  },
  {
    name: "Subcategorias",
    icon: Layers,
    path: "subcategorias",
  },
  {
    name: "Unidades Medida",
    icon: PencilRuler,
    path: "unidades-medida",
  },
  {
    name: "Proveedores",
    icon: Truck,
    path: "proveedores",
  },
  // {
  //   name: "Contactos Proveedores",
  //   icon: HardHat,
  //   path: "contactos-proveedores",
  // },
  {
    name: "Empleados",
    icon: IdCardLanyard,
    path: "/empleados",
  },
];
