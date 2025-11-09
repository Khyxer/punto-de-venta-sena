import { InputModal } from "../../UI/UiInputs";
import { useClientContext } from "../../contexts/client/useClientContext";
import { useEffect } from "react";

export const NewClientForm = ({ onClose, currentClient, isEdit }) => {
  const { createClient, dataNewClient, setDataNewClient, updateClient } =
    useClientContext();

  useEffect(() => {
    if (isEdit && currentClient?.birthDate) {
      const formatDateForInput = (isoDate) => {
        if (!isoDate) return "";
        return isoDate.split("T")[0];
      };

      setDataNewClient({
        name: currentClient.name || "",
        lastName: currentClient.lastName || "",
        birthDate: formatDateForInput(currentClient.birthDate),
        typeDocument: currentClient.typeDocument || "",
        documentNumber: currentClient.documentNumber || "",
        gender: currentClient.gender || "",
        telephone: currentClient.telephone || "",
        email: currentClient.email || "",
        address: currentClient.address || "",
        loyaltyPoints: currentClient.loyaltyPoints || 0,
        discountPercentage: currentClient.discountPercentage || 0,
        preferredPaymentMethod: currentClient.preferredPaymentMethod || "",
        notes: currentClient.notes || "",
      });
    }
  }, [isEdit, currentClient]);

  return (
    <form
      onSubmit={(e) =>
        isEdit
          ? updateClient(e, onClose, currentClient._id)
          : createClient(e, onClose)
      }
      className="flex flex-col gap-4"
    >
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          {isEdit ? "Editar Cliente" : "Nuevo Cliente"}
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      <div>
        <h3 className="text-lg font-medium text-primary-color">
          Información personal
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <InputModal
            label="Nombre"
            placeholder="John"
            required
            autoFocus
            value={dataNewClient.name}
            onChange={(e) =>
              setDataNewClient({ ...dataNewClient, name: e.target.value })
            }
          />
          <InputModal
            label="Apellido"
            placeholder="Doe"
            required
            value={dataNewClient.lastName}
            onChange={(e) =>
              setDataNewClient({ ...dataNewClient, lastName: e.target.value })
            }
          />
          <InputModal
            label="Fecha de nacimiento"
            type="date"
            required
            value={dataNewClient.birthDate}
            onChange={(e) =>
              setDataNewClient({ ...dataNewClient, birthDate: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-3">
          {/* Tipo de documento */}
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="typeDocument">
              Tipo de documento <span className="text-primary-color">*</span>
            </label>
            <select
              id="typeDocument"
              value={dataNewClient.typeDocument}
              className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
              onChange={(e) =>
                setDataNewClient({
                  ...dataNewClient,
                  typeDocument: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Seleccionar tipo de documento
              </option>
              {[
                "C.C",
                "T.I",
                "C.E",
                "Pasaporte",
                "Registro Civil",
                "Residencia Temporal",
              ].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <InputModal
            label="Numero de documento"
            placeholder="Sin puntos, guiones o espacios"
            type="number"
            required
            value={dataNewClient.documentNumber}
            onChange={(e) =>
              setDataNewClient({
                ...dataNewClient,
                documentNumber: e.target.value,
              })
            }
          />

          {/* Genero */}
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="gender">
              Genero <span className="text-primary-color">*</span>
            </label>
            <select
              id="gender"
              value={dataNewClient.gender}
              className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
              onChange={(e) =>
                setDataNewClient({
                  ...dataNewClient,
                  gender: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Seleccionar genero
              </option>
              {["F", "M", "Otro", "Prefiere no decir"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-primary-color">
          Información de contacto
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <InputModal
            label="Telefono"
            placeholder="123456789"
            required
            value={dataNewClient.telephone}
            onChange={(e) =>
              setDataNewClient({ ...dataNewClient, telephone: e.target.value })
            }
          />
          <InputModal
            label="Email"
            placeholder="email@example.com"
            type="email"
            value={dataNewClient.email}
            onChange={(e) =>
              setDataNewClient({ ...dataNewClient, email: e.target.value })
            }
          />
          <InputModal
            label="Dirección"
            placeholder="Calle 123 # 2 - 3"
            value={dataNewClient.address}
            onChange={(e) =>
              setDataNewClient({ ...dataNewClient, address: e.target.value })
            }
          />
        </div>
        {/* <div className="grid grid-cols-2 gap-4 mb-3">
          <InputModal label="Ciudad" />
        </div> */}
      </div>

      <div>
        <h3 className="text-lg font-medium text-primary-color">
          Información adicional
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <InputModal
            label="Puntos"
            placeholder="0"
            type="number"
            value={dataNewClient.loyaltyPoints}
            onChange={(e) =>
              setDataNewClient({
                ...dataNewClient,
                loyaltyPoints: e.target.value,
              })
            }
          />
          <InputModal
            label="Porcentaje de descuento"
            placeholder="Entre 0 y 100"
            type="number"
            value={dataNewClient.discountPercentage}
            onChange={(e) =>
              setDataNewClient({
                ...dataNewClient,
                discountPercentage: e.target.value,
              })
            }
          />
          {/* Metodo de pago preferido */}
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="preferredPaymentMethod">
              Metodo de pago preferido{" "}
              <span className="text-primary-color">*</span>
            </label>
            <select
              id="preferredPaymentMethod"
              value={dataNewClient.preferredPaymentMethod}
              className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
              onChange={(e) =>
                setDataNewClient({
                  ...dataNewClient,
                  preferredPaymentMethod: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Seleccionar metodo de pago
              </option>
              {["Efectivo", "Tarjeta", "Transferencia", "Otro"].map(
                (item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="notes">Notas</label>
        <textarea
          id="notes"
          placeholder="Notas adicionales acerca del cliente"
          rows="2"
          className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150 resize-none"
          value={dataNewClient.notes}
          onChange={(e) =>
            setDataNewClient({
              ...dataNewClient,
              notes: e.target.value,
            })
          }
        ></textarea>
      </div>

      <footer className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="border border-gray-500 hover:border-black text-gray-600 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          Guardar
        </button>
      </footer>
    </form>
  );
};
