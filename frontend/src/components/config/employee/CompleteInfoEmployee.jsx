import { formatText, formatDate } from "../../../utils/utilFormatFunctions";
import { BagdeRole } from "../../../UI/BagdeRole";

export const CompleteInfoEmployee = ({ onClose, currentEmployee }) => {
  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-900">
        {value ? (
          value
        ) : (
          <span className="text-gray-400 italic">No especificado</span>
        )}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          Información del Usuario
        </h1>

        <div className="flex items-center gap-4 mt-3">
          {currentEmployee?.profilePicture && (
            <img
              src={currentEmployee.profilePicture}
              alt="perfil"
              className="w-24 h-24 rounded-full object-cover ring-2 ring-primary-color select-none"
              draggable={false}
            />
          )}
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {formatText(currentEmployee?.name)}{" "}
              {formatText(currentEmployee?.lastName)}
            </p>
            <BagdeRole role={currentEmployee?.role} />
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-5">
        {/* Información General */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-2 border-b">
            Información General
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InfoRow label="Nombre" value={formatText(currentEmployee?.name)} />
            <InfoRow
              label="Apellido"
              value={formatText(currentEmployee?.lastName)}
            />
            <InfoRow
              label="Nombre de usuario"
              value={currentEmployee?.userName}
            />
            <InfoRow
              label="Correo electrónico"
              value={currentEmployee?.email}
            />
            <InfoRow label="Teléfono" value={currentEmployee?.telephone} />
            <InfoRow label="Rol" value={currentEmployee?.role} />
          </div>
        </div>

        {/* Fechas */}
        {/* <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-2 border-b">
            Fechas
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InfoRow
              label="Usuario de acceso"
              value={currentEmployee?.userName}
            />
            <InfoRow
              label="Fecha de creación"
              value={formatDate(currentEmployee?.createdAt)}
            />
          </div>
        </div> */}

        {/* Creador */}
        {currentEmployee?.userCreator && (
          <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-2 border-b">
              Datos de creación
            </h2>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <InfoRow
                label="Nombre del creador"
                value={`${formatText(
                  currentEmployee.userCreator.name
                )} ${formatText(currentEmployee.userCreator.lastName)}`}
              />
              <InfoRow
                label="Usuario del creador"
                value={currentEmployee.userCreator.userName}
              />
              <InfoRow
                label="Fecha de creación"
                value={formatDate(currentEmployee?.createdAt)}
              />
            </div>
          </div>
        )}
      </section>

      <footer className="flex justify-end pt-4">
        <button
          onClick={onClose}
          className="bg-primary-color text-light-color rounded-md px-6 py-2 cursor-pointer duration-150 hover:opacity-90"
        >
          Cerrar
        </button>
      </footer>
    </div>
  );
};
