import { useState } from "react";
import toast from "react-hot-toast";

export const useInventory = () => {

  console.log("PRUEBA BIENN 1 ");
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
      const data = await response.json();
      console.log(data);
      console.log(newFormDataInventory);

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
      console.log(data);
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

  return {
    newFormDataInventory,
    setNewFormDataInventory,
    createProduct,
    products,
    setProducts,
    loading,
    getProducts,
  };
};
