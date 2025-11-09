import { useContext } from "react";
import InventarioContext from "./InventarioContext";

export const useInventarioContext = () => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error(
      "useInventarioContext debe usarse dentro de InventarioProvider"
    );
  }
  return context;
};
