import { createContext } from "react";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  return <ConfigContext.Provider value={{}}>{children}</ConfigContext.Provider>;
};

export default ConfigContext;
