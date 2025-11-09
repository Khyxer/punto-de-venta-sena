import { createContext } from "react";
import { useClient } from "../../hooks/useClient";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const {
    clients,
    setClients,
    loading,
    loadingGet,
    createClient,
    getClients,
    deleteClient,
    updateClient,
    dataNewClient,
    setDataNewClient,
  } = useClient();
  return (
    <ClientContext.Provider
      value={{
        clients,
        setClients,
        loading,
        loadingGet,
        createClient,
        getClients,
        deleteClient,
        updateClient,
        dataNewClient,
        setDataNewClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
