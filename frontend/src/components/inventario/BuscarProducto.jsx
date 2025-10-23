import { Search } from "lucide-react";

export const BuscarProducto = () => {
  return (
    <div className="border rounded-md  border-gray-500 flex items-center pl-2 w-full focus-within:ring-2 focus-within:ring-primary-color focus-within:ring-offset-2 duration-150">
      <Search />
      <input
        type="text"
        placeholder="Buscar producto por su codigo o nombre..."
        className="focus:outline-none p-2 w-full select-none"
      />
    </div>
  );
};
