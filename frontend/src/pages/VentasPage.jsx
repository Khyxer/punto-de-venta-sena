import { AddProducts } from "../components/ventas/AddProducts";
import { ViewProducts } from "../components/ventas/ViewProducts";
import { AddClient } from "../components/ventas/AddClient";
import { PayMethod } from "../components/ventas/PayMethod";
// import { ValuesSale } from "../components/ventas/ValuesSale";
import { ResumenVenta } from "../components/ventas/ResumenVenta";

export const VentasPage = () => {
  return (
    <main className="p-4 grid grid-cols-3 gap-4 h-full">
      <section className="flex flex-col col-span-2 gap-4 h-full">
        {/* Productos */}
        <AddProducts />
        <ViewProducts />
        {/* Clientes y Metodos de pago */}
        <div className="flex gap-4 ">
          <AddClient />
          <PayMethod />
        </div>
        {/* Valores de la venta
        <ValuesSale /> */}
      </section>
      <section>
        <ResumenVenta />
      </section>
    </main>
  );
};
