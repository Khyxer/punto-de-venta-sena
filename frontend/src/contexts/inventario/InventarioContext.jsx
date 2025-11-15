// Contexto para manejar el inventario
import { useInventory } from "../../hooks/useInventory";
import { createContext } from "react";

const InventarioContext = createContext();

export const InventarioProvider = ({ children }) => {
  const {
    newFormDataInventory,
    setNewFormDataInventory,
    createProduct,
    products,
    setProducts,
    loading,
  } = useInventory();

  return (
    <InventarioContext.Provider
      value={{
        newFormDataInventory,
        setNewFormDataInventory,
        createProduct,
        products,
        setProducts,
        loading,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
};

export default InventarioContext;
