import { Banknote, CreditCard, Smartphone, Wallet } from "lucide-react";
import { useVentasContext } from "../../contexts/ventas/useVentasContext";

export const PayMethod = () => {
  const { selectedMethod, setSelectedMethod } = useVentasContext();

  const metodosPago = [
    { icon: Banknote, name: "Efectivo", value: "Efectivo" },
    { icon: CreditCard, name: "Tarjeta", value: "Tarjeta" },
    { icon: Smartphone, name: "Transferencia", value: "Transferencia" },
    { icon: Wallet, name: "Otro metodo", value: "Otro" },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-xl text-primary-color">Metodo de Pago</h2>

      <div className="grid grid-cols-2 gap-2">
        {metodosPago.map((metodo) => (
          <button
            key={metodo.name}
            className={`flex items-center border rounded p-2 flex-col ${
              selectedMethod === metodo.value
                ? "bg-primary-color/10 text-primary-color"
                : "cursor-pointer"
            }`}
            onClick={() => setSelectedMethod(metodo.value)}
          >
            <metodo.icon size={22} />
            {metodo.name}
          </button>
        ))}
      </div>
    </div>
  );
};
