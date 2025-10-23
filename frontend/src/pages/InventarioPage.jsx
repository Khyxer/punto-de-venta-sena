import { ChevronDown, Filter, Plus } from "lucide-react";
import { BuscarProducto } from "../components/inventario/BuscarProducto";
export const InventarioPage = () => {
  return (
    <section className="p-6">
      <header className="flex items-center gap-5 max-w-6xl mx-auto">
        <BuscarProducto />
        <button className="rounded-md border border-gray-500 hover:border-dark-color px-4 py-2 h-full w-fit cursor-pointer duration-150 flex items-center gap-2">
          <Filter />
          Filtros
          <ChevronDown />
        </button>
        <button className="flex items-center gap-2 text-nowrap bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150">
          <Plus />
          Nuevo Producto
        </button>
      </header>
    </section>
  );
};
