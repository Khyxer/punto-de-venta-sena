import { useState } from "react";
import toast from "react-hot-toast";

export const useSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);

  const [dataNewSupplier, setDataNewSupplier] = useState({
    name: "",
    address: "",
    telephone: "",
    email: "",
    webSite: "",
    bank: "",
    bankAccount: "",
    typeProduct: "",
    comment: "",
  });

  const [suppliers, setSuppliers] = useState([]);

  const createSupplier = async (onClose) => {
    if (!dataNewSupplier.name || !dataNewSupplier.telephone) {
      toast.error("Faltan campos obligatorios");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/supplier`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewSupplier),
        }
      );

      const data = await response.json();

      //   console.log("data", data);

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      // limpiar el formulario
      setDataNewSupplier({
        name: "",
        address: "",
        telephone: "",
        email: "",
        webSite: "",
        bank: "",
        bankAccount: "",
        typeProduct: "",
        comment: "",
      });

      // actualizar localmente
      const updatedSuppliers = [
        { ...data.data, totalProducts: 0 },
        ...suppliers,
      ];

      setSuppliers(updatedSuppliers);

      toast.success(data.message);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSuppliers = () => {
    setLoadingGet(true);
    fetch(`${import.meta.env.VITE_API_URL}/inventory/supplier`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSuppliers(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingGet(false));
  };

  const deleteSupplier = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/supplier?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      // actualizar localmente
      const updatedSuppliers = suppliers.filter(
        (supplier) => supplier._id !== id
      );
      setSuppliers(updatedSuppliers);

      toast.success(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSupplier = async (id, onClose) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/supplier?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewSupplier),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      console.log("data", data);

      // actualizar localmente
      const updatedSuppliers = suppliers.map((supplier) => {
        if (supplier._id === id) {
          return data.data;
        }
        return supplier;
      });

      setSuppliers(updatedSuppliers);

      toast.success(data.message);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSuppliers,
    loading,
    loadingGet,
    dataNewSupplier,
    setDataNewSupplier,
    suppliers,
    setSuppliers,
  };
};
