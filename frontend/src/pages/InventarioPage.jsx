import { useState } from "react";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
import { CardProducto } from "../components/inventario/CardProducto";
import { LayoutModal } from "../components/general/LayoutModal";
import { NewProductoForm } from "../components/inventario/NewProductoForm";

export const InventarioPage = () => {
  // Modal de nuevo producto
  const [showModal, setShowModal] = useState(false);

  const productExample = {
    productCode: "PROD-2024-001",
    name: "Aceite de Oliva Extra Virgen Premium",
    description:
      "Aceite de oliva de primera extracción en frío, importado de España. Ideal para ensaladas y cocina mediterránea.",
    image:
      "https://carulla.vtexassets.com/arquivos/ids/21680909/Arroz-Diana-5000-gr-814670_a.jpg?v=638864002325870000",
    category: "Alimentos",
    subCategory: "Aceites",
    active: true,
    stock: 45,
    measureUnit: "Lt",
    sellPrice: 28500,
    expirationDate: "12/10/2025",
  };

  return (
    <section className="p-4 flex flex-col gap-6">
      {/** Modal de nuevo producto */}
      <LayoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        className="!max-w-2xl !w-full"
      >
        <NewProductoForm onClose={() => setShowModal(false)} />
      </LayoutModal>

      {/** Header: Buscar y nuevo producto */}
      <header className="flex items-center justify-between w-full">
        {/** buscar */}
        <div className="flex items-center gap-2 w-full max-w-2xl">
          <div className="border rounded-md border-gray-500 flex items-center pl-2 w-full focus-within:ring-2 focus-within:ring-primary-color focus-within:ring-offset-2 duration-150">
            <Search />
            <input
              type="text"
              placeholder="Buscar producto por su codigo o nombre..."
              className="focus:outline-none p-2 w-full select-none"
            />
          </div>
          {/** filtros */}
          <button className="rounded-md border border-gray-500 hover:border-dark-color px-4 py-2 h-full w-fit cursor-pointer duration-150 flex items-center gap-2">
            <Filter />
            Filtros
            <ChevronDown />
          </button>
        </div>
        {/** nuevo producto */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-nowrap bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          <Plus />
          Nuevo Producto
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <CardProducto key={index} product={productExample} />
        ))}
      </div>
    </section>
  );
};
