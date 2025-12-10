// Contexto para manejar el inventario
import { createContext } from "react";
// import { useInventory } from "../../hooks/useInventory";
import { useVenta } from "../../hooks/useVenta";
import { useClient } from "../../hooks/useClient";

const VentasContext = createContext();

export const VentasProvider = ({ children }) => {
  // const { products, getProducts } = useInventory();
  const { clients, getClients } = useClient();

  const {
    selectedProducts,
    setSelectedProducts,
    selectedClient,
    setSelectedClient,
    handleSaveSale,
    calculateTotal,
    ventaForm,
    setVentaForm,
    selectedMethod,
    setSelectedMethod,
    amountReceived,
    setAmountReceived,
    loading,
    lastSaleCreated,
  } = useVenta();

  // useEffect(() => {
  //   getProducts();
  //   getClients();
  // }, []);

  return (
    <VentasContext.Provider
      value={{
        // products,
        // getProducts,
        selectedProducts,
        setSelectedProducts,
        clients,
        getClients,
        selectedClient,
        setSelectedClient,
        handleSaveSale,
        calculateTotal,
        ventaForm,
        setVentaForm,
        selectedMethod,
        setSelectedMethod,
        amountReceived,
        setAmountReceived,
        loading,
        lastSaleCreated,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};

export default VentasContext;
