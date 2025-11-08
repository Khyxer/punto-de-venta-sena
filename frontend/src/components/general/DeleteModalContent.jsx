export const DeleteModalContent = ({
  title,
  message,
  setShowModalDelete,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* formulario de nueva categoria */}
      <h2 className="text-xl font-medium text-red-500">{title}</h2>
      <div className="mb-3">
        <p>{message}</p>
        <strong className="font-medium">
          Esta acción <span className="text-red-500">NO</span> se puede deshacer
        </strong>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModalDelete(false)}
          className="bg-gray-200 text-gray-600 rounded-md px-4 py-2 cursor-pointer select-none"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onDelete();
            setShowModalDelete(false);
          }}
          className="bg-error-color text-light-color rounded-md px-4 py-2 cursor-pointer select-none"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
