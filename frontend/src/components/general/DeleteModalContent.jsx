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
          Solo los administradores pueden deshacer esta acción
        </strong>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModalDelete(false)}
          className="border border-gray-700 hover:border-black text-gray-700 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 select-none"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onDelete();
            setShowModalDelete(false);
          }}
          className="bg-error-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 select-none"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
