import { useState } from "react";
import { toast } from "react-hot-toast";

export const useSubCategory = () => {
  const [dataNewSubCategory, setDataNewSubCategory] = useState({
    name: "",
    description: "",
    mainCategory: "",
  });

  const [availableCategories, setAvailableCategories] = useState([]);

  const [loadingGet, setLoadingGet] = useState(false);

  //obtener las categorias disponibles (es decir las ya creadas)
  const getCategories = async () => {
    try {
      setLoadingGet(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/category`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setAvailableCategories(data.data);
      // console.log(data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingGet(false);
    }
  };

  //crear subcategoria
  const createSubCategory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/subCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewSubCategory),
        }
      );

      const data = await response.json();

      // console.log("data", data);

      if (!response.ok) {
        toast.error(data.error);
        return;
      }

      toast.success(data.message);
      setDataNewSubCategory({
        name: "",
        description: "",
        mainCategory: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  //obtener subcategorias
  const getSubCategories = () => {};

  //actualizar subcategoria
  const updateSubCategory = () => {};

  //eliminar subcategoria
  const deleteSubCategory = () => {};

  return {
    dataNewSubCategory,
    setDataNewSubCategory,
    availableCategories,
    createSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    getCategories,
    loadingGet,
  };
};
