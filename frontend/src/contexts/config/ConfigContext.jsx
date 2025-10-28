import { createContext } from "react";
import { useCategory } from "../../hooks/config/useCategory";
import { useSubCategory } from "../../hooks/config/useSubCategory";
import { useMeasureUnit } from "../../hooks/config/useMeasureUnit";
import { useSupplier } from "../../hooks/config/useSupplier";
import { useEmployee } from "../../hooks/config/useEmployee";

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

  // proveedor
  const {
    suppliers,
    getSuppliers,
    deleteSupplier,
    loadingGet: loadingGetSupplier,
    createSupplier,
    updateSupplier,
    dataNewSupplier,
    setDataNewSupplier,
    loading: loadingSupplier,
  } = useSupplier();

  // empleado
  const {
    employees,
    getEmployees,
    deleteEmployee,
    loadingGet: loadingGetEmployee,
    createEmployee,
    updateEmployee,
    dataNewEmployee,
    setDataNewEmployee,
    loading: loadingEmployee,
  } = useEmployee();

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
        suppliers,
        getSuppliers,
        deleteSupplier,
        loadingGetSupplier,
        createSupplier,
        updateSupplier,
        dataNewSupplier,
        setDataNewSupplier,
        loadingSupplier,
        employees,
        getEmployees,
        deleteEmployee,
        loadingGetEmployee,
        createEmployee,
        updateEmployee,
        dataNewEmployee,
        setDataNewEmployee,
        loadingEmployee,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
