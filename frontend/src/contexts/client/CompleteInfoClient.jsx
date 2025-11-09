import { formatText, formatDate } from "../../utils/utilFormatFunctions";

export const CompleteInfoClient = ({ onClose, currentClient }) => {
  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-900">
        {value.toString() ? (
          value
        ) : (
          <span className="text-gray-400 italic">No especificado</span>
        )}
      </span>
    </div>
  );

  console.log(currentClient);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          Información del Cliente
        </h1>

        <div className="mt-3">
          <p className="text-2xl font-semibold text-gray-800">
            {formatText(currentClient?.name)}{" "}
            {formatText(currentClient?.lastName)}
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-5">
        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Información Personal
          </h2>
          <div className="grid grid-cols-4 gap-x-6 gap-y-4">
            <InfoRow label="Nombre" value={formatText(currentClient?.name)} />
            <InfoRow
              label="Apellido"
              value={formatText(currentClient?.lastName)}
            />
            <InfoRow
              label="Tipo de documento"
              value={currentClient?.typeDocument}
            />
            <InfoRow
              label="Número de documento"
              value={currentClient?.documentNumber}
            />
            <InfoRow label="Teléfono" value={currentClient?.telephone} />
            <InfoRow label="Correo electrónico" value={currentClient?.email} />
            <InfoRow label="Dirección" value={currentClient?.address} />
            <InfoRow
              label="Fecha de nacimiento"
              value={formatDate(currentClient?.birthDate)}
            />
            <InfoRow label="Género" value={currentClient?.gender} />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Preferencias y Estado
          </h2>
          <div className="grid grid-cols-4 gap-x-6 gap-y-4">
            <InfoRow
              label="Método de pago preferido"
              value={currentClient?.preferredPaymentMethod}
            />
            <InfoRow
              label="Descuento (%)"
              value={currentClient?.discountPercentage + "%"}
            />
            <InfoRow
              label="Puntos de fidelidad"
              value={currentClient?.loyaltyPoints}
            />
            <InfoRow
              label="Activo"
              value={currentClient?.active ? "Sí" : "No"}
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Historial de Compras
          </h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            <InfoRow
              label="Total gastado"
              value={`$ ${currentClient?.statistics?.totalPurchases}`}
            />
            <InfoRow
              label="Número de compras"
              value={currentClient?.statistics?.purchaseCount}
            />
            <InfoRow
              label="Última compra"
              value={formatDate(currentClient?.statistics?.lastPurchase)}
            />
          </div>
        </div>

        {currentClient?.userCreator && (
          <div>
            <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
              Datos de creación
            </h2>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <InfoRow
                label="Nombre del creador"
                value={`${formatText(
                  currentClient.userCreator.name
                )} ${formatText(currentClient.userCreator.lastName)}`}
              />
              <InfoRow
                label="Usuario del creador"
                value={currentClient.userCreator.userName}
              />
              <InfoRow
                label="Fecha de creación"
                value={formatDate(currentClient?.createdAt)}
              />
            </div>
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Notas
          </h2>
          <p className="text-gray-800 text-base">
            {currentClient?.notes ? (
              currentClient.notes
            ) : (
              <span className="text-gray-400 italic">
                Sin notas adicionales
              </span>
            )}
          </p>
        </div>
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
