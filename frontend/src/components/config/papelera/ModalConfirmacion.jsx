export const ModalConfirmacion = ({ onClose, loading, onClick }) => {
  return (
    <div>
      <h3 className="text-red-500 font-semibold text-3xl uppercase">
        ¡Espera!
      </h3>
      <h5 className="text-lg mb-2">
        ¿Estas seguro de eliminar{" "}
        <span className="text-red-500 font-medium">permanentemente</span> este
        elemento?
      </h5>

      <p>
        Antes de hacerlo asegurate de que no hayan registros que dependan de
        este elemento ya que podria causar problemas y generar perdida de datos,
        si no estas seguro mejor no lo elimines.
      </p>
      <footer className="flex justify-between mt-6">
        <button
          onClick={onClose}
          className="border border-gray-500 hover:border-black text-gray-600 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          Cancelar
        </button>
        <button
          disabled={loading}
          onClick={onClick}
          className="bg-red-500 text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          {loading ? "Cargando..." : "Eliminar"}
        </button>
      </footer>
    </div>
  );
};
