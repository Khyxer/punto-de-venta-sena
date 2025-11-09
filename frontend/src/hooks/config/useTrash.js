import { useState } from "react";
import { toast } from "react-hot-toast";

export const useTrash = () => {
  const [loading, setLoading] = useState(false);
  const [trashItems, setTrashItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchAllTrashItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/trash`, {
        headers,
      });
      const data = await response.json();
      console.log(data);

      if (!data.success) {
        toast.error(data.message);
        return [];
      }

      setTrashItems(data.data);
      return data.data;
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar papelera");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Restaurar item
  const restoreItem = async (type, id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/trash/${type}/${id}/restore`, {
        method: "PATCH",
        headers,
      });
      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return false;
      }

      toast.success(data.message);
      setTrashItems((prev) => prev.filter((item) => item._id !== id));
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error al restaurar");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar permanentemente
  const permanentDelete = async (type, id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/trash/${type}/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return false;
      }

      toast.success(data.message);
      setTrashItems((prev) => prev.filter((item) => item._id !== id));
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar permanentemente");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    trashItems,
    fetchAllTrashItems,
    restoreItem,
    permanentDelete,
  };
};
