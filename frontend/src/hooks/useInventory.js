import { useState } from "react";
import toast from "react-hot-toast";

export const useInventory = () => {
  const [newFormDataInventory, setNewFormDataInventory] = useState({
    imageProduct: "",
    name: "",
    productCode: "",
    description: "",
    category: "",
    subCategory: "",
    barCode: "",
    supplier: "",
    costPrice: "",
    sellPrice: "",
    stock: "",
    minStock: "",
    measureUnit: "",
    expirationDate: "",
  });

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const createProduct = async (e, onClose) => {
    e.preventDefault();

    if (
      !newFormDataInventory.name.trim() ||
      !newFormDataInventory.productCode.trim() ||
      !newFormDataInventory.costPrice.trim() ||
      !newFormDataInventory.sellPrice.trim() ||
      !newFormDataInventory.stock.trim() ||
      !newFormDataInventory.measureUnit.trim()
    ) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newFormDataInventory),
        }
      );
      if (!response.ok) {
        let errorMessage = `Error en la respuesta del servidor: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          try {
            const text = await response.text();
            errorMessage = text || errorMessage;
          } catch {
            // ignore parse error
          }
        }
        toast.error(errorMessage);
        return;
      }

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      const updatedProducts = [data.data, ...products];
      setProducts(updatedProducts);
      toast.success(data.message);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  // obtener productos
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/product`,
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
        toast.error(data.message);
        return;
      }
      setProducts(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener los productos");
    } finally {
      setLoading(false);
    }
  };

  // actualizar producto
  const updateProduct = async (e, onClose, id) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/product?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newFormDataInventory),
        }
      );
      // Si la respuesta no es OK, intentar leer JSON o texto para mostrar un error legible
      if (!response.ok) {
        let errorMessage = `Error en la respuesta del servidor: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Si no es JSON, leer como texto
          try {
            const text = await response.text();
            errorMessage = text || errorMessage;
          } catch {
            // dejar el mensaje por defecto
          }
        }
        toast.error(errorMessage);
        return;
      }

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message || "Error al actualizar el producto");
        return;
      }

      // actualizar localmente
      const updated = products.map((p) => (p._id === id ? data.data : p));
      setProducts(updated);
      toast.success(data.message || "Producto actualizado");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  return {
    newFormDataInventory,
    setNewFormDataInventory,
    createProduct,
    updateProduct,
    products,
    setProducts,
    loading,
    getProducts,
  };
};
