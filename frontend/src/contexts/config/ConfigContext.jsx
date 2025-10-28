import { createContext } from "react";
import { useCategory } from "../../hooks/config/useCategory";
import { useSubCategory } from "../../hooks/config/useSubCategory";
import { useMeasureUnit } from "../../hooks/config/useMeasureUnit";

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

  // unidad de medida
  const {
    measureUnits,
    createMeasureUnit,
    getMeasureUnits,
    updateMeasureUnit,
    deleteMeasureUnit,
    dataNewMeasureUnit,
    setDataNewMeasureUnit,
    loading: loadingMeasureUnit,
    loadingGet: loadingGetMeasureUnit,
  } = useMeasureUnit();

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
        measureUnits,
        createMeasureUnit,
        getMeasureUnits,
        updateMeasureUnit,
        deleteMeasureUnit,
        dataNewMeasureUnit,
        setDataNewMeasureUnit,
        loadingMeasureUnit,
        loadingGetMeasureUnit,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
