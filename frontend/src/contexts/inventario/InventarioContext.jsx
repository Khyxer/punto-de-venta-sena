// Contexto para manejar el inventario
import { useInventory } from "../../hooks/useInventory";
import { createContext, useMemo } from "react";

const InventarioContext = createContext();

export const InventarioProvider = ({ children }) => {
  const {
    newFormDataInventory,
    setNewFormDataInventory,
    createProduct,
    updateProduct,
    resetFormData,
    products,
    setProducts,
    loading,
    getProducts,
  } = useInventory();

  // Usar useMemo para evitar recrear el objeto value en cada render
  const value = useMemo(
    () => ({
      newFormDataInventory,
      setNewFormDataInventory,
      createProduct,
      updateProduct,
      resetFormData,
      products,
      setProducts,
      loading,
      getProducts,
    }),
    [newFormDataInventory, setNewFormDataInventory, createProduct, updateProduct, resetFormData, products, setProducts, loading, getProducts]
  );

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
};

export default InventarioContext;
