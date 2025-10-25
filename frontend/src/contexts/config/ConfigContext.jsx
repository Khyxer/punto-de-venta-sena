import { createContext } from "react";
import { useCategory } from "../../hooks/config/useCategory";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  // categoria
  const {
    categories,
    getCategories,
    deleteCategory,
    loadingGet: loadingGetCategory,
    createCategory,
    updateCategory,
    dataNewCategory,
    setDataNewCategory,
    loading,
  } = useCategory();

  return (
    <ConfigContext.Provider
      value={{
        categories,
        getCategories,
        deleteCategory,
        loadingGetCategory,
        createCategory,
        updateCategory,
        dataNewCategory,
        setDataNewCategory,
        loading,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
