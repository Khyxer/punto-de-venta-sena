import { useState } from "react";
import { toast } from "react-hot-toast";

export const useSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGetSubCategory, setLoadingGetSubCategory] = useState(false);

  const [dataNewSubCategory, setDataNewSubCategory] = useState({
    name: "",
    description: "",
    mainCategory: "",
  });

  const [subCategories, setSubCategories] = useState([]);

  //crear subcategoria
  const createSubCategory = async (onClose) => {
    try {
      if (
        dataNewSubCategory.name.trim() === "" ||
        dataNewSubCategory.mainCategory.trim() === ""
      ) {
        toast.error("Completa los campos obligatorios");
        return;
      }

      setLoading(true);
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
        toast.error(data.message);
        return;
      }

      // limpiar el formulario
      setDataNewSubCategory({
        name: "",
        description: "",
        mainCategory: "",
      });

      // actualizar localmente
      const updatedSubCategories = [
        { ...data.data, totalProducts: 0 },
        ...subCategories,
      ];

      setSubCategories(updatedSubCategories);

      toast.success(data.message);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //obtener subcategorias
  const getSubCategories = async () => {
    try {
      setLoadingGetSubCategory(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/subCategory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      // console.log("data get SubCategory", data);

      if (!response.ok) {
        toast.error(data.error);
        return;
      }

      setSubCategories(data.subCategories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGetSubCategory(false);
    }
  };

  //eliminar subcategoria
  const deleteSubCategory = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/subCategory?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      // console.log("data delete SubCategory", data);

      if (!response.ok) {
        toast.error(data.error);
        return;
      }

      // actualizar localmente
      const updatedSubCategories = subCategories.filter(
        (subCategory) => subCategory._id !== id
      );

      setSubCategories(updatedSubCategories);

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //actualizar subcategoria
  const updateSubCategory = async (id, onClose) => {
    try {
      if (!dataNewSubCategory.name || !dataNewSubCategory.mainCategory) {
        toast.error("Completa los campos obligatorios");
        return;
      }
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/subCategory?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewSubCategory),
        }
      );

      const data = await response.json();

      // console.log("data update SubCategory", data.subCategory);

      if (!response.ok) {
        toast.error(data.error);
        return;
      }

      // actualizar localmente
      const updatedSubCategories = subCategories.map((subCategory) => {
        if (subCategory._id === id) {
          return data.subCategory;
        }
        return subCategory;
      });

      // console.log("updatedSubCategories", updatedSubCategories);

      setSubCategories(updatedSubCategories);

      toast.success("Subcategoria actualizada exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    dataNewSubCategory,
    setDataNewSubCategory,
    createSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    loading,
    loadingGetSubCategory,
    subCategories,
  };
};
