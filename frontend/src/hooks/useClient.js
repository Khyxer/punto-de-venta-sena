import { useState } from "react";
import toast from "react-hot-toast";

export const useClient = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);

  const [dataNewClient, setDataNewClient] = useState({
    name: "",
    lastName: "",
    typeDocument: "",
    documentNumber: "",
    telephone: "",
    email: "",
    address: "",
    birthDate: "",
    gender: "",
    notes: "",
    discountPercentage: "",
    loyaltyPoints: "",
    preferredPaymentMethod: "",
  });

  const createClient = async (e, onClose) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataNewClient),
      });
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      const updatedClients = [data.data, ...clients];
      setClients(updatedClients);
      toast.success(data.message);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener clientes
  const getClients = async () => {
    try {
      setLoadingGet(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return;
      }
      setClients(data.data);
      console.log(data.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoadingGet(false);
    }
  };

  const deleteClient = async (id, setShowModalDelete) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/client?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);

      // actualizar localmente
      const updatedClients = clients.filter((client) => client._id !== id);
      setClients(updatedClients);
      setShowModalDelete(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cliente
  const updateClient = async (e, onClose, id) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/client?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewClient),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);

      // actualizar localmente
      const updatedClients = clients.map((client) => {
        if (client._id === id) {
          return data.data;
        }
        return client;
      });
      setClients(updatedClients);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    setClients,
    loading,
    loadingGet,
    createClient,
    getClients,
    deleteClient,
    updateClient,
    dataNewClient,
    setDataNewClient,
  };
};
