import { createContext } from "react";
import { useCategory } from "../../hooks/config/useCategory";
import { useSubCategory } from "../../hooks/config/useSubCategory";

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

  // subcategoria
  const {
    subCategories,
    getSubCategories,
    deleteSubCategory,
    loadingGetSubCategory,
    createSubCategory,
    updateSubCategory,
    dataNewSubCategory,
    setDataNewSubCategory,
    loading: loadingSubCategory,
  } = useSubCategory();

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
        subCategories,
        getSubCategories,
        deleteSubCategory,
        loadingGetSubCategory,
        createSubCategory,
        updateSubCategory,
        dataNewSubCategory,
        setDataNewSubCategory,
        loadingSubCategory,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
