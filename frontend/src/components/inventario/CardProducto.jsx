export const CardProducto = ({ product }) => {
  return (
    <main className="flex h-[130px] gap-3 p-3 border border-gray-400 rounded-lg overflow-hidden cursor-pointer hover:bg-primary-color/5 hover:border-primary-color/60 hover:scale-103 duration-150">
      {/** Imagen del producto */}
      <div className="w-[100px] h-full flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover select-none rounded-lg border border-gray-400"
        />
      </div>

      {/** Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/** Header: Nombre y estado */}
        <header className="flex items-start gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base line-clamp-1 text-gray-900">
              {product.name}
            </h1>
            <p className="text-xs text-gray-500">Cód: {product.productCode}</p>
          </div>

          {/** Indicador de estado */}
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
            title={product.active ? "Activo" : "Inactivo"}
            style={{
              backgroundColor: product.active ? "#22c55e" : "#ef4444",
            }}
          />
        </header>

        {/** Descripción (Mucho texto) */}
        {/* <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {product.description}
        </p> */}

        {/** Footer: información relevante */}
        <footer className="mt-auto space-y-2">
          {/** Categorías */}
          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary-color bg-primary-color/10 text-primary-color font-medium">
              {product.category}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary-color bg-primary-color/10 text-primary-color font-medium">
              {product.subCategory}
            </span>
          </div>

          {/** Información de stock, precio y vencimiento */}
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-700">Stock:</span>
              <span>
                {product.stock} {product.measureUnit}
              </span>
            </div>
            <div className="w-px h-3 bg-gray-300" />
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-700">Precio:</span>
              <span className="text-primary-color font-semibold">
                ${product.sellPrice}
              </span>
            </div>
            <div className="w-px h-3 bg-gray-300" />
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-700">Vence:</span>
              <span>{product.expirationDate}</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};
