import { useState } from "react";
import { toast } from "react-hot-toast";

export const useCategory = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);

  const [dataNewCategory, setDataNewCategory] = useState({
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  // Crear categoria
  const createCategory = async (onClose) => {
    try {
      setLoading(true);
      if (dataNewCategory.name.trim() === "") {
        toast.error("El nombre es obligatorio");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewCategory),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setDataNewCategory({
        name: "",
        description: "",
      });
      // console.log(data);
      toast.success("Categoria creada exitosamente");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener categorias
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

      setCategories(data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingGet(false);
    }
  };

  // eliminar categoria
  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/category?id=${id}`,
        {
          method: "DELETE",
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

      toast.success("Categoria eliminada exitosamente");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    dataNewCategory,
    setDataNewCategory,
    loading,
    createCategory,
    categories,
    getCategories,
    loadingGet,
    deleteCategory,
  };
};
