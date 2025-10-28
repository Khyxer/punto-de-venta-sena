import { InputModal } from "../../../UI/UiInputs";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { useEffect } from "react";

export const NewMeasureUnitForm = ({ onClose, isEdit, currentMeasureUnit }) => {
  const {
    createMeasureUnit,
    dataNewMeasureUnit,
    setDataNewMeasureUnit,
    updateMeasureUnit,
    loadingMeasureUnit,
  } = useConfigContext();

  useEffect(() => {
    if (isEdit && currentMeasureUnit) {
      setDataNewMeasureUnit({
        name: currentMeasureUnit.name || "",
        abbreviation: currentMeasureUnit.abbreviation || "",
        description: currentMeasureUnit.description || "",
      });
    }
  }, [isEdit, currentMeasureUnit]);

  return (
    <form className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          {isEdit ? "Editar Unidad de Medida" : "Nueva Unidad de Medida"}
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      {/* Nombre de la unidad de medida */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <InputModal
            label="Nombre"
            placeholder="Ej: Unidad"
            required
            value={dataNewMeasureUnit.name}
            onChange={(e) =>
              setDataNewMeasureUnit({
                ...dataNewMeasureUnit,
                name: e.target.value,
              })
            }
          />
          <InputModal
            label="Abreviatura"
            placeholder="Ej: u"
            required
            value={dataNewMeasureUnit.abbreviation}
            onChange={(e) =>
              setDataNewMeasureUnit({
                ...dataNewMeasureUnit,
                abbreviation: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            placeholder="Ej: Para medir la cantidad de collares"
            rows="3"
            className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150 resize-none"
            value={dataNewMeasureUnit.description}
            onChange={(e) =>
              setDataNewMeasureUnit({
                ...dataNewMeasureUnit,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>

      <footer className="flex items-center justify-between pt-2">
        <button
          onClick={onClose}
          className="border border-gray-500 hover:border-black text-gray-600 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            if (isEdit) {
              updateMeasureUnit(currentMeasureUnit.id, onClose);
            } else {
              createMeasureUnit(onClose);
            }
          }}
          disabled={loadingMeasureUnit}
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          {loadingMeasureUnit ? "Cargando..." : isEdit ? "Actualizar" : "Crear"}
        </button>
      </footer>
    </form>
  );
};
