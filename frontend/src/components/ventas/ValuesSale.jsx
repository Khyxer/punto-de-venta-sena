//BORRAR ESTO

import { InputModal } from "../../UI/UiInputs";

export const ValuesSale = () => {
  return (
    <div>
      <h2 className="text-xl text-primary-color">Valores de la Venta</h2>

      <div className="grid grid-cols-2 gap-2">
        <InputModal label="Monto recibido" type="number" />
        <InputModal label="Descuento" type="number" />
      </div>
    </div>
  );
};
