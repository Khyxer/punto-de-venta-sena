import { InputModal } from "../../../UI/UiInputs";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { useEffect } from "react";

export const NewSupplierForm = ({ onClose, currentSupplier, isEdit }) => {
  const {
    dataNewSupplier,
    setDataNewSupplier,
    loadingSupplier,
    createSupplier,
    updateSupplier,
  } = useConfigContext();

  useEffect(() => {
    if (isEdit && currentSupplier) {
      setDataNewSupplier({
        name: currentSupplier.name || "",
        address: currentSupplier.address || "",
        telephone: currentSupplier.telephone || "",
        email: currentSupplier.email || "",
        webSite: currentSupplier.webSite || "",
        bank: currentSupplier.bank || "",
        bankAccount: currentSupplier.bankAccount || "",
        typeProduct: currentSupplier.typeProduct || "",
        comment: currentSupplier.comment || "",
      });
    }
  }, [isEdit, currentSupplier]);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          {isEdit ? "Editar Proveedor" : "Nuevo Proveedor"}
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      <section className="flex flex-col gap-4 ">
        <div className="grid grid-cols-2 gap-4">
          <InputModal
            required
            label="Nombre"
            placeholder="Ej: Surti MAX"
            value={dataNewSupplier.name}
            onChange={(e) =>
              setDataNewSupplier({ ...dataNewSupplier, name: e.target.value })
            }
          />

          <InputModal
            label="Dirección"
            placeholder="Ej: Calle 123"
            value={dataNewSupplier.address}
            onChange={(e) =>
              setDataNewSupplier({
                ...dataNewSupplier,
                address: e.target.value,
              })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputModal
            label="Telefono"
            placeholder="Ej: 123456789"
            type="number"
            required
            value={dataNewSupplier.telephone}
            onChange={(e) =>
              setDataNewSupplier({
                ...dataNewSupplier,
                telephone: e.target.value,
              })
            }
          />

          <InputModal
            label="Correo"
            placeholder="Ej: correo@correo.com"
            value={dataNewSupplier.email}
            onChange={(e) =>
              setDataNewSupplier({ ...dataNewSupplier, email: e.target.value })
            }
          />
        </div>

        <InputModal
          label="Sitio web"
          placeholder="Ej: www.surtimax.com"
          value={dataNewSupplier.webSite}
          onChange={(e) =>
            setDataNewSupplier({ ...dataNewSupplier, webSite: e.target.value })
          }
        />
        <div className="grid grid-cols-2 gap-4">
          <InputModal
            label="Banco"
            placeholder="Ej: Banco de la Nacion"
            value={dataNewSupplier.bank}
            onChange={(e) =>
              setDataNewSupplier({ ...dataNewSupplier, bank: e.target.value })
            }
          />

          <InputModal
            label="Cuenta bancaria"
            placeholder="Ej: 123456789"
            value={dataNewSupplier.bankAccount}
            onChange={(e) =>
              setDataNewSupplier({
                ...dataNewSupplier,
                bankAccount: e.target.value,
              })
            }
          />
        </div>
        <InputModal
          label="Tipo de producto"
          placeholder="Ej: Electrodomésticos"
          value={dataNewSupplier.typeProduct}
          onChange={(e) =>
            setDataNewSupplier({
              ...dataNewSupplier,
              typeProduct: e.target.value,
            })
          }
        />

        <div className="flex flex-col gap-0.5">
          <label htmlFor="comment">Comentario</label>
          <textarea
            id="comment"
            rows="3"
            placeholder="Ej: No comprarle a este proveedor por que es un proveedor de mala calidad"
            className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150 select-none resize-none"
            value={dataNewSupplier.comment}
            onChange={(e) =>
              setDataNewSupplier({
                ...dataNewSupplier,
                comment: e.target.value,
              })
            }
          ></textarea>
        </div>
      </section>

      <footer className="flex justify-between">
        <button
          onClick={onClose}
          className="border border-gray-500 hover:border-black text-gray-600 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            if (isEdit) {
              updateSupplier(currentSupplier.id, onClose);
            } else {
              createSupplier(onClose);
            }
          }}
          disabled={loadingSupplier}
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          {loadingSupplier ? "Cargando..." : isEdit ? "Editar" : "Crear"}
        </button>
      </footer>
    </div>
  );
};
