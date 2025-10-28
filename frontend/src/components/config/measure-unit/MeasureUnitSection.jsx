import { HeaderConfig } from "../HeaderConfig";
import { NewMeasureUnitForm } from "./NewMeasureUnitForm";
import { LayoutModal } from "../../general/LayoutModal";
import { useState } from "react";
import { useEffect } from "react";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { SimpleTable } from "../../general/SimpleTable";
import { formatDate, formatText } from "../../../utils/utilFormatFunctions";
import { Loader2 } from "lucide-react";
import { DeleteModalContent } from "../../general/DeleteModalContent";
import { Pencil, Trash2 } from "lucide-react";

export const MeasureUnitSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentMeasureUnit, setCurrentMeasureUnit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const {
    setDataNewMeasureUnit,
    loadingGetMeasureUnit,
    getMeasureUnits,
    measureUnits,
    deleteMeasureUnit,
  } = useConfigContext();

  useEffect(() => {
    getMeasureUnits();
  }, []);

  // limpiar modal
  useEffect(() => {
    if (!showModal) {
      setDataNewMeasureUnit({ name: "", description: "" });
      setCurrentMeasureUnit(null);
      setIsEdit(false);
    }
  }, [showModal]);

  // columnas
  const columnas = [
    { key: "name", label: "Nombre" },
    {
      key: "abbreviation",
      label: "Abreviatura",
    },
    {
      key: "description",
      label: "Descripción",
      render: (valor) => (
        <p className="text-sm line-clamp-2 max-w-[320px] text-wrap">{valor}</p>
      ),
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
              setCurrentMeasureUnit(row);
              setIsEdit(true);
              setShowModal(true);
            }}
            className="bg-primary-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Pencil size={19} className="text-primary-color" />
          </button>
          <button
            onClick={() => {
              setCurrentMeasureUnit(row.id);
              console.log(row.id);
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

  // data
  const data = measureUnits.map((measureUnit) => ({
    id: measureUnit._id,
    name: formatText(measureUnit?.name),
    abbreviation: measureUnit?.abbreviation,
    description:
      measureUnit?.description === ""
        ? "Sin descripción"
        : formatText(measureUnit?.description),
    nameCreator:
      formatText(measureUnit?.userCreator?.name) +
      " " +
      formatText(measureUnit?.userCreator?.lastName),
    createdAt: formatDate(measureUnit?.createdAt),
  }));

  return (
    <section className="w-full flex flex-col h-full">
      <HeaderConfig
        placeholderInput="Buscar unidad de medida"
        buttonText="Nueva Unidad de Medida"
        onClickButton={() => setShowModal(true)}
        valueInput={searchTerm}
        onChangeInput={(e) => setSearchTerm(e.target.value)}
      />

      {/** Modal crear o editar unidad de medida */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <NewMeasureUnitForm
          onClose={() => setShowModal(false)}
          currentMeasureUnit={currentMeasureUnit}
          isEdit={isEdit}
        />
      </LayoutModal>

      {/** Modal confirmar eliminar */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        <DeleteModalContent
          title="Eliminar unidad de medida"
          message="¿Estas seguro de eliminar esta unidad de medida?"
          setShowModalDelete={setShowModalDelete}
          onDelete={() => deleteMeasureUnit(currentMeasureUnit)}
        />
      </LayoutModal>

      {/** tabla */}
      <div className="w-full pt-6 flex-1">
        {loadingGetMeasureUnit ? (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-14 h-14 animate-spin mx-auto text-primary-color" />
            <p className="text-primary-color">Cargando unidades de medida...</p>
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
