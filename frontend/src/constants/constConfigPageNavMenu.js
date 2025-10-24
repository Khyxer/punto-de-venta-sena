import { HardHat, IdCardLanyard, Layers, Layers2, PencilRuler, Truck, User } from "lucide-react";
import { CategorySection } from "../components/config/CategorySection";
import { MeasureUnitSection } from "../components/config/MeasureUnitSection";
import { SupplierSection } from "../components/config/SupplierSection";
import { ContactSupplierSection } from "../components/config/ContactSupplierSection";
import { SubCategorySection } from "../components/config/SubCategorySection";
import { EmployeeSection } from "../components/config/EmployeeSection";

export const configMenu = [
  {
    name: "Categorias",
    icon: Layers2,
    component: CategorySection,
  },
  {
    name: "Sub Categorias",
    icon: Layers,
    component: SubCategorySection,
  },
  {
    name: "Unidades Medida",
    icon: PencilRuler,
    component: MeasureUnitSection,
  },
  {
    name: "Proveedores",
    icon: Truck,
    component: SupplierSection,
  },
  {
    name: "Contactos Proveedores",
    icon: HardHat,
    component: ContactSupplierSection,
  },
  {
    name: "Empleados",
    icon: IdCardLanyard,
    component: EmployeeSection,
  }
];
