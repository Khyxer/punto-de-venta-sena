import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImg } from "./useUploadImage";

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

      // Subir imagen si existe
      let imageProductUrl = "";
      if (newFormDataInventory.imageProduct) {
        try {
          const loadingToast = toast.loading("Subiendo imagen...");
          imageProductUrl = await uploadImg(
            newFormDataInventory.imageProduct,
            "products" // álbum para productos
          );
          toast.dismiss(loadingToast);
        } catch (error) {
          toast.error("Error al subir la imagen");
          console.error(error);
          return;
        }
      }

      // Preparar datos para enviar
      const productDataToSend = { ...newFormDataInventory };

      // Agregar la URL de la imagen si se subió
      if (imageProductUrl) {
        productDataToSend.imageProduct = imageProductUrl;
      } else {
        delete productDataToSend.imageProduct; // Eliminar si está vacía
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(productDataToSend),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      // Limpiar formulario
      setNewFormDataInventory({
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
      console.log(products.data)
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
