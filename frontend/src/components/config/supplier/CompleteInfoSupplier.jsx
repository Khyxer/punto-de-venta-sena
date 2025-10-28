export const CompleteInfoSupplier = ({ onClose, currentSupplier }) => {
  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-900">
        {value === "N/A" ? (
          <span className="text-gray-400 italic">No especificado</span>
        ) : (
          value
        )}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          Información del proveedor
        </h1>
        <p className="text-lg font-semibold text-gray-800 mt-1">
          {currentSupplier?.name}
        </p>
      </header>

      <section className="flex flex-col gap-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-2 border-b">
            Información General
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InfoRow label="Nombre" value={currentSupplier?.name} />
            <InfoRow
              label="Tipo de producto"
              value={currentSupplier?.typeProduct}
            />
            <InfoRow label="Teléfono" value={currentSupplier?.telephone} />
            <InfoRow
              label="Correo electrónico"
              value={currentSupplier?.email}
            />
            <InfoRow label="Dirección" value={currentSupplier?.address} />
            <InfoRow label="Sitio web" value={currentSupplier?.webSite} />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-2 border-b">
            Información Bancaria
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InfoRow label="Banco" value={currentSupplier?.bank} />
            <InfoRow
              label="Cuenta bancaria"
              value={currentSupplier?.bankAccount}
            />
          </div>
        </div>

        {currentSupplier?.comment && (
          <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-2 border-b">
              Comentarios
            </h2>
            <p className="text-base text-gray-900 leading-relaxed">
              {currentSupplier.comment}
            </p>
          </div>
        )}
      </section>

      <footer className="flex justify-end pt-4 border-t">
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
