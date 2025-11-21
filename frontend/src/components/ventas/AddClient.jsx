import { useState } from "react";
import { useRef } from "react";
import { Search, Trash2 } from "lucide-react";
import { useVentasContext } from "../../contexts/ventas/useVentasContext";

export const AddClient = () => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { clients, selectedClient, setSelectedClient } = useVentasContext();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(value.trim() !== "");
  };

  const filteredClients = clients?.filter(
    (client) =>
      client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.documentNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (client) => {
    setSelectedClient(client);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-3 flex-1">
      <h2 className="text-xl text-primary-color">Agregar Cliente</h2>

      {/* Buscador */}
      <div className="relative" ref={containerRef}>
        <div className="border rounded-md border-gray-500 flex items-center pl-2 w-full focus-within:ring-2 focus-within:ring-primary-color focus-within:ring-offset-2 duration-150">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar cliente por nombre o numero de documento..."
            className="focus:outline-none p-2 w-full select-none"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.trim() && setIsOpen(true)}
          />
        </div>

        {/* Dropdown de resultados */}
        {isOpen &&
          (selectedClient ? (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-sm p-4 text-center text-gray-500">
              Solo puedes agregar un cliente por venta
            </div>
          ) : (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-sm max-h-64 overflow-y-auto custom-scroll">
              {filteredClients?.length > 0 ? (
                filteredClients.map((client) => (
                  <div
                    key={client._id}
                    onClick={() => handleAddClient(client)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {client?.name} {client?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {client?.typeDocument} {client?.documentNumber}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No se encontraron clientes
                </div>
              )}
            </div>
          ))}
      </div>

      {selectedClient ? (
        <div>
          <div className="flex items-center justify-between px-4 py-2 bg-white">
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                {selectedClient.name} {selectedClient.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {selectedClient.typeDocument} {selectedClient.documentNumber} •
                Descuento: {selectedClient.discountPercentage}%
              </p>
            </div>

            <button
              onClick={() => setSelectedClient(null)}
              className="bg-error-color/10 hover:bg-error-color/20 duration-150 text-light-color rounded-md w-7 aspect-square flex items-center justify-center cursor-pointer"
            >
              <Trash2 className="text-error-color" size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <p className="p-4 text-center text-gray-500">
            No se selecciono ningun cliente
          </p>
        </div>
      )}
    </div>
  );
};
