import { useContext } from "react";
import VentasContext from "./VentasContext";

export const useVentasContext = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error("useVentasContext debe usarse dentro de VentasProvider");
  }
  return context;
};
