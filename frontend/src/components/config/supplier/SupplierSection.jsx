import { HeaderConfig } from "../HeaderConfig";
import { useState } from "react";
import { useEffect } from "react";
import { LayoutModal } from "../../general/LayoutModal";
import { NewSupplierForm } from "./NewSupplierForm";
import { DeleteModalContent } from "../../general/DeleteModalContent";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { formatText, formatDate } from "../../../utils/utilFormatFunctions";
import { SimpleTable } from "../../general/SimpleTable";
import { Info, Loader2, Pencil, Trash2 } from "lucide-react";
import { CompleteInfoSupplier } from "./CompleteInfoSupplier";
import { SuppliersPDF } from "../../pdf/SuppliersPDF";

export const SupplierSection = () => {
  // manejar el estado de la modal
  const [showModal, setShowModal] = useState(false);

  // manejar el estado de la modal de eliminar
  const [showModalDelete, setShowModalDelete] = useState(false);

  // manejar el estado de la modal de informacion completa
  const [showModalCompleteInfo, setShowModalCompleteInfo] = useState(false);

  // id actual
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // context
  const {
    deleteSupplier,
    loadingGetSupplier,
    suppliers,
    setDataNewSupplier,
    getSuppliers,
  } = useConfigContext();

  // buscar
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getSuppliers();
  }, []);

  // limpiar modal
  useEffect(() => {
    if (!showModal) {
      setDataNewSupplier({
        name: "",
        address: "",
        telephone: "",
        email: "",
        webSite: "",
        bank: "",
        bankAccount: "",
        typeProduct: "",
        comment: "",
      });
      setCurrentSupplier(null);
      setIsEdit(false);
    }
  }, [showModal]);

  // columnas
  const columnas = [
    { key: "name", label: "Nombre" },
    {
      key: "telephone",
      label: "Telefono",
    },
    {
      key: "typeProduct",
      label: "Producto",
    },
    {
      key: "comment",
      label: "Comentario",
      render: (valor) => (
        <p className="text-sm line-clamp-2 max-w-[290px] text-wrap">{valor}</p>
      ),
    },
    {
      key: "nameCreator",
      label: "Creador",
    },

    {
      key: "createdAt",
      label: "Fecha de creación",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (valor, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentSupplier(row);
              setShowModalCompleteInfo(true);
            }}
            className="bg-green-500/20 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Info size={22} className="text-green-500" />
          </button>
          <button
            onClick={() => {
              setCurrentSupplier(row);
              // console.log("ROW", row.mainCategory._id);
              setIsEdit(true);
              setShowModal(true);
            }}
            className="bg-primary-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Pencil size={19} className="text-primary-color" />
          </button>
          <button
            onClick={() => {
              setCurrentSupplier(row.id);
              setShowModalDelete(true);
            }}
            className="bg-error-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Trash2 size={19} className="text-error-color" />
          </button>
        </div>
      ),
    },
  ];

  //data
  const data = suppliers.map((supplier) => ({
    id: supplier?._id,
    name: formatText(supplier?.name),
    address: supplier?.address || "N/A",
    telephone: supplier?.telephone,
    email: supplier?.email || "N/A",
    webSite: supplier?.webSite || "N/A",
    bank: supplier?.bank || "N/A",
    bankAccount: supplier?.bankAccount || "N/A",
    typeProduct: supplier?.typeProduct || "N/A",
    comment: supplier?.comment || "N/A",
    nameCreator:
      formatText(supplier?.userCreator?.name) +
      " " +
      formatText(supplier?.userCreator?.lastName),
    createdAt: formatDate(supplier?.createdAt),
  }));

  return (
    <section className="w-full flex flex-col h-full">
      {/* header con el buscador y el boton de nueva categoria */}
      <HeaderConfig
        placeholderInput="Buscar proveedor"
        buttonText="Nuevo Proveedor"
        onClickButton={() => setShowModal(true)}
        valueInput={searchTerm}
        onChangeInput={(e) => setSearchTerm(e.target.value)}
        documentToRender={<SuppliersPDF suppliers={suppliers} />}
      />

      {/* modal con el formulario de nueva categoria */}
      <LayoutModal
        className="w-full !max-w-2xl"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        {/* formulario de nueva categoria */}
        <NewSupplierForm
          onClose={() => setShowModal(false)}
          currentSupplier={currentSupplier}
          isEdit={isEdit}
        />
      </LayoutModal>

      {/* modal confirmar eliminar */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        <DeleteModalContent
          title="Eliminar proveedor"
          message="¿Estas seguro de eliminar este proveedor?"
          setShowModalDelete={setShowModalDelete}
          onDelete={() => deleteSupplier(currentSupplier, setShowModalDelete)}
        />
      </LayoutModal>

      {/* modal de la informacion completa del proveedor */}
      <LayoutModal
        className="w-full !max-w-3xl"
        show={showModalCompleteInfo}
        onClose={() => setShowModalCompleteInfo(false)}
      >
        {/* formulario de nueva categoria */}
        <CompleteInfoSupplier
          onClose={() => setShowModalCompleteInfo(false)}
          currentSupplier={currentSupplier}
        />
      </LayoutModal>

      {/** tabla */}
      <div className="w-full pt-6 flex-1">
        {loadingGetSupplier ? (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-14 h-14 animate-spin mx-auto text-primary-color" />
            <p className="text-primary-color">Cargando proveedores...</p>
          </div>
        ) : (
          <SimpleTable
            columns={columnas}
            data={data}
            itemsPerPage={9}
            sortable={true}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </section>
  );
};
