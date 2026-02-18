import {
  formatText,
  formatDate,
  formatPrice,
} from "../../utils/utilFormatFunctions";
export const CompleteInfoProduct = ({ onClose, currentProduct }) => {
  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-900">
        {value !== undefined && value !== null && value.toString() ? (
          value
        ) : (
          <span className="text-gray-400 italic">No especificado</span>
        )}
      </span>
    </div>
  );

  if (!currentProduct) {
    return (
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-xl font-medium text-primary-color">
            Información del Producto
          </h1>
        </header>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="text-gray-300 text-5xl mb-4">📦</span>
          <p className="text-gray-500 text-base font-medium">
            No hay información disponible
          </p>
          <p className="text-gray-400 text-sm mt-1">
            No se encontró ningún producto seleccionado
          </p>
        </div>
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
  }

  const hasImage = currentProduct?.imageProduct || currentProduct?.image;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          Información del Producto
        </h1>
        <p className="text-2xl font-semibold text-gray-800 mt-3">
          {formatText(currentProduct?.name)}
        </p>
      </header>

      <section className="flex flex-col gap-5">
        {/* Bloque superior: imagen + info general lado a lado */}
        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Información General
          </h2>
          <div className="flex gap-6">
            {/* Imagen */}
            {hasImage && (
              <div className="flex-shrink-0 w-36 h-36 rounded-lg border border-gray-100 overflow-hidden bg-gray-50">
                <img
                  src={currentProduct.imageProduct || currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Info general */}
            <div
              className={`grid gap-x-6 gap-y-4 flex-1 ${hasImage ? "grid-cols-3" : "grid-cols-4"}`}
            >
              <InfoRow
                label="Nombre"
                value={formatText(currentProduct?.name)}
              />
              <InfoRow label="Código" value={currentProduct?.productCode} />
              <InfoRow
                label="Código de barras"
                value={currentProduct?.barCode}
              />
              <InfoRow
                label="Descripción"
                value={currentProduct?.description}
              />
              <InfoRow
                label="Categoría"
                value={currentProduct?.category?.name}
              />
              <InfoRow
                label="Subcategoría"
                value={currentProduct?.subCategory?.name}
              />
              <InfoRow
                label="Proveedor"
                value={currentProduct?.supplier?.name}
              />
              <InfoRow
                label="Unidad de medida"
                value={currentProduct?.measureUnit?.name}
              />
            </div>
          </div>
        </div>

        {/* Precios y Stock */}
        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Precios y Stock
          </h2>
          <div className="grid grid-cols-4 gap-x-6 gap-y-4">
            <InfoRow
              label="Precio de costo"
              value={
                typeof currentProduct?.costPrice === "number"
                  ? formatPrice(currentProduct.costPrice)
                  : currentProduct?.costPrice
              }
            />
            <InfoRow
              label="Precio de venta"
              value={
                currentProduct?.sellPrice != null
                  ? formatPrice(currentProduct.sellPrice)
                  : undefined
              }
            />
            <InfoRow
              label="Stock actual"
              value={
                currentProduct?.stock != null
                  ? `${currentProduct.stock} ${currentProduct.measureUnit?.name || ""}`.trim()
                  : undefined
              }
            />
            <InfoRow label="Stock mínimo" value={currentProduct?.minStock} />
          </div>
        </div>

        {/* Estado */}
        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Estado
          </h2>
          <div className="grid grid-cols-4 gap-x-6 gap-y-4">
            <InfoRow
              label="Fecha de vencimiento"
              value={
                currentProduct?.expirationDate
                  ? formatDate(currentProduct.expirationDate)
                  : undefined
              }
            />
            <InfoRow
              label="Activo"
              value={
                currentProduct?.active !== undefined
                  ? currentProduct.active
                    ? "Sí"
                    : "No"
                  : undefined
              }
            />
            <InfoRow
              label="Eliminado"
              value={
                currentProduct?.deleted !== undefined
                  ? currentProduct.deleted
                    ? "Sí"
                    : "No"
                  : undefined
              }
            />
          </div>
        </div>

        {/* Datos de creación */}
        <div>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide mb-3 pb-2 border-b">
            Datos de Creación
          </h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            <InfoRow
              label="Creado por"
              value={
                currentProduct?.userCreator?.name
                  ? `${formatText(currentProduct.userCreator.name)} ${formatText(currentProduct.userCreator.lastName || "")}`.trim()
                  : typeof currentProduct?.userCreator === "string"
                    ? currentProduct.userCreator
                    : undefined
              }
            />
            <InfoRow
              label="Fecha de creación"
              value={
                currentProduct?.createdAt
                  ? formatDate(currentProduct.createdAt)
                  : undefined
              }
            />
            <InfoRow
              label="Última actualización"
              value={
                currentProduct?.updatedAt
                  ? formatDate(currentProduct.updatedAt)
                  : undefined
              }
            />
          </div>
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
