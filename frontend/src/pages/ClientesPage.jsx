import { HeaderClientes } from "../components/clientes/HeaderClientes";
import { useEffect, useState } from "react";
import { LayoutModal } from "../components/general/LayoutModal";
import { NewClientForm } from "../components/clientes/NewClientForm";
import { useClientContext } from "../contexts/client/useClientContext";
import { formatText, formatDate } from "../utils/utilFormatFunctions";
import { Info, Loader2, Pencil, Trash2 } from "lucide-react";
import { SimpleTable } from "../components/general/SimpleTable";
import { CompleteInfoClient } from "../contexts/client/CompleteInfoClient";
import { DeleteModalContent } from "../components/general/DeleteModalContent";
import { ClientsPDF } from "../components/pdf/ClientsPDF";

export const ClientesPage = () => {
  // Estados para los modales
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalCompleteInfo, setShowModalCompleteInfo] = useState(false);

  const {
    getClients,
    clients,
    loadingGet: loadingGetClient,
    deleteClient,
    setDataNewClient,
  } = useClientContext();

  // buscar
  const [searchTerm, setSearchTerm] = useState("");

  // id actual
  const [currentClient, setCurrentClient] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  //limpiar modal
  useEffect(() => {
    if (!showModalCreate) {
      setDataNewClient({
        name: "",
        lastName: "",
        birthDate: "",
        typeDocument: "",
        documentNumber: "",
        gender: "",
        telephone: "",
        email: "",
        address: "",
        loyaltyPoints: 0,
        discountPercentage: 0,
        preferredPaymentMethod: "",
        notes: "",
      });
      setCurrentClient(null);
      setIsEdit(false);
    }
  }, [showModalCreate]);

  //columnas de la tabla
  const columnas = [
    { key: "name", label: "Nombre" },
    {
      key: "typeDocument",
      label: "Tipo de documento",
    },
    {
      key: "documentNumber",
      label: "Número de documento",
    },
    {
      key: "telephone",
      label: "Teléfono",
    },
    {
      key: "discountPercentage",
      label: "Descuento",
    },
    {
      key: "loyaltyPoints",
      label: "Puntos",
    },
    {
      key: "nameCreator",
      label: "Creador",
    },

    {
      key: "createdAt",
      label: "Fecha creación",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (valor, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentClient(row.information);
              setShowModalCompleteInfo(true);
            }}
            className="bg-green-500/20 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Info size={22} className="text-green-500" />
          </button>
          <button
            onClick={() => {
              setCurrentClient(row.information);
              setIsEdit(true);
              console.log(row.information);
              setShowModalCreate(true);
            }}
            className="bg-primary-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Pencil size={19} className="text-primary-color" />
          </button>
          <button
            onClick={() => {
              setCurrentClient(row.id);
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

  //datos de la tabla
  const data = clients.map((client) => ({
    id: client?._id,
    name: formatText(client?.name) + " " + formatText(client?.lastName),
    typeDocument: client?.typeDocument,
    information: client,
    documentNumber: client?.documentNumber,
    telephone: client?.telephone,
    discountPercentage: client?.discountPercentage + "%",
    loyaltyPoints: client?.loyaltyPoints,
    nameCreator:
      formatText(client?.userCreator?.name) +
      " " +
      formatText(client?.userCreator?.lastName),
    createdAt: formatDate(client?.createdAt),
  }));

  return (
    <section className="h-full flex p-4 flex-col">
      {/** Header con barra de busqueda, filtros, PDF y botón de nuevo cliente */}
      <HeaderClientes
        onClickButton={() => setShowModalCreate(true)}
        showModalCreate={showModalCreate}
        valueInput={searchTerm}
        onChangeInput={(e) => setSearchTerm(e.target.value)}
        documentToRender={<ClientsPDF clients={clients} />}
      />

      {/** Modal nuevo cliente */}
      <LayoutModal
        show={showModalCreate}
        onClose={() => setShowModalCreate(false)}
        className="!max-w-5xl !w-full"
      >
        <NewClientForm
          onClose={() => setShowModalCreate(false)}
          currentClient={currentClient}
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
          title="Eliminar cliente"
          message="¿Estas seguro de eliminar este cliente?"
          setShowModalDelete={setShowModalDelete}
          onDelete={() => deleteClient(currentClient, setShowModalDelete)}
        />
      </LayoutModal>

      {/* modal de la informacion completa del cliente */}
      <LayoutModal
        className="w-full !max-w-5xl"
        show={showModalCompleteInfo}
        onClose={() => setShowModalCompleteInfo(false)}
      >
        {/* formulario de nueva categoria */}
        <CompleteInfoClient
          onClose={() => setShowModalCompleteInfo(false)}
          currentClient={currentClient}
        />
      </LayoutModal>

      {/* tabla de clientes */}
      <div className="w-full pt-6 flex-1">
        {loadingGetClient ? (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-14 h-14 animate-spin mx-auto text-primary-color" />
            <p className="text-primary-color">Cargando clientes...</p>
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
