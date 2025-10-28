import {
  HardHat,
  IdCardLanyard,
  Layers,
  Layers2,
  PencilRuler,
  Truck,
} from "lucide-react";
import { CategorySection } from "../components/config/category/CategorySection";
import { SubCategorySection } from "../components/config/sub-category/SubCategorySection";
import { MeasureUnitSection } from "../components/config/MeasureUnitSection";
import { SupplierSection } from "../components/config/SupplierSection";
import { ContactSupplierSection } from "../components/config/ContactSupplierSection";
import { EmployeeSection } from "../components/config/EmployeeSection";

export const configMenu = [
  {
    name: "Categorias",
    icon: Layers2,
    // component: CategorySection,
    path: "categorias",
  },
  {
    name: "Sub Categorias",
    icon: Layers,
    // component: SubCategorySection,
    path: "subcategorias",
  },
  {
    name: "Unidades Medida",
    icon: PencilRuler,
    // component: MeasureUnitSection,
    path: "unidades-medida",
  },
  {
    name: "Proveedores",
    icon: Truck,
    // component: SupplierSection,
    path: "proveedores",
  },
  {
    name: "Contactos Proveedores",
    icon: HardHat,
    // component: ContactSupplierSection,
    path: "contactos-proveedores",
  },
  {
    name: "Empleados",
    icon: IdCardLanyard,
    // component: EmployeeSection,
    path: "/empleados",
  },
];
