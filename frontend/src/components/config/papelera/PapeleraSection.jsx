import { LayoutModal } from "../../general/LayoutModal";
import { Loader2, RotateCcw, Trash2 } from "lucide-react";
import { useTrash } from "../../../hooks/config/useTrash";
import { useEffect, useState } from "react";
import { formatText } from "../../../utils/utilFormatFunctions";
import { ModalConfirmacion } from "./ModalConfirmacion";

export const PapeleraSection = () => {
  const {
    trashItems,
    fetchAllTrashItems,
    restoreItem,
    permanentDelete,
    loading,
  } = useTrash();

  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchAllTrashItems();
  }, []);

  const translate = {
    client: "Cliente",
    category: "Categoria",
    subCategory: "Subcategoria",
    measureUnit: "Unidad de medida",
    supplier: "Proveedor",
    user: "Usuario",
    product: "Producto",
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-2">
        <Loader2 className="w-14 h-14 animate-spin mx-auto text-primary-color" />
        <p className="text-primary-color">Cargando papelera...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full  flex flex-col gap-5">
      {/** Modal confirmación */}
      <LayoutModal
        className={"max-w-2xl"}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <ModalConfirmacion
          onClose={() => setShowModal(false)}
          loading={loading}
          onClick={() => {
            permanentDelete(currentItem?.resourceType, currentItem?._id);
            setShowModal(false);
          }}
        />
      </LayoutModal>

      <header>
        <h2 className="text-2xl font-medium text-primary-color mb-2">
          Papelera de reciclaje
        </h2>
        <p>
          Lista de elementos eliminados, puedes restaurarlos o eliminarlos
          permanentemente{" "}
          <span className="text-red-500">
            (Una vez eliminados no se pueden recuperar)
          </span>
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trashItems.map((item) => (
          <div
            key={item._id}
            className="border border-gray-600 rounded-lg py-2 px-5 w-full flex justify-between items-center gap-5"
          >
            <div className="flex flex-col">
              <h3 className="font-medium text-lg">{formatText(item?.name)}</h3>
              <h5 className="text-gray-700">
                {formatText(translate[item?.resourceType])}
              </h5>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => restoreItem(item?.resourceType, item?._id)}
                className="bg-primary-color text-light-color rounded-lg p-2 cursor-pointer group relative"
              >
                <RotateCcw className="group-hover:-rotate-360 duration-300" />
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  setCurrentItem(item);
                }}
                className="bg-red-500 text-light-color rounded-lg p-2 cursor-pointer group relative"
              >
                <Trash2 className="group-hover:animate-[shake_0.3s_ease-in-out]" />
              </button>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
};
