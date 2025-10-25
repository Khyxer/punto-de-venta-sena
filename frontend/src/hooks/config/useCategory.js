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

      // console.log(data.data, "ORIGINAL");
      setCategories(data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingGet(false);
    }
  };

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

      // console.log(data, "DEBUG222");
      const updatedCategories = [
        { ...data.data, totalProducts: 0 },
        ...categories,
      ];
      // console.log(updatedCategories, "DEBUG");

      // Actualizar el estado local
      setCategories(updatedCategories);

      setDataNewCategory({
        name: "",
        description: "",
      });

      toast.success("Categoria creada exitosamente");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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

      const updatedCategories = categories.filter(
        (category) => category._id !== id
      );
      setCategories(updatedCategories);
      toast.success("Categoria eliminada exitosamente");
      // getCategories();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //actualizar categoria
  const updateCategory = async (id, onClose) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/category?id=${id}`,
        {
          method: "PUT",
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

      const updatedCategories = categories.map((category) => {
        if (category._id === id) {
          return data.data;
        }
        return category;
      });
      setCategories(updatedCategories);

      toast.success("Categoria actualizada exitosamente");
      onClose();
      // getCategories();
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
    updateCategory,
  };
};
