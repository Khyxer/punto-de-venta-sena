// Contexto para manejar el inventario

import { createContext } from "react";

const InventarioContext = createContext();

export const InventarioProvider = ({ children }) => {
    
    return (
        <InventarioContext.Provider value={{}}>
            {children}
        </InventarioContext.Provider>
    );
};

export default InventarioContext;
