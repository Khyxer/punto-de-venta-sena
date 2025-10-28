import { toast } from "react-hot-toast";
import { useState } from "react";

export const useMeasureUnit = () => {
  const [measureUnits, setMeasureUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);

  const [dataNewMeasureUnit, setDataNewMeasureUnit] = useState({
    name: "",
    abbreviation: "",
    description: "",
  });

  // Crear unidad de medida
  const createMeasureUnit = async (onClose) => {
    try {
      if (
        dataNewMeasureUnit.name.trim() === "" ||
        dataNewMeasureUnit.abbreviation.trim() === ""
      ) {
        toast.error("Complete todos los campos obligatorios");
        return;
      }
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/measureUnit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewMeasureUnit),
        }
      );

      const data = await response.json();

      console.log("data", data);

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      // limpiar el formulario
      setDataNewMeasureUnit({
        name: "",
        abbreviation: "",
        description: "",
      });

      // actualizar localmente
      const updatedMeasureUnits = [{ ...data.data }, ...measureUnits];

      setMeasureUnits(updatedMeasureUnits);

      toast.success(data.message);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener unidades de medida
  const getMeasureUnits = () => {
    setLoadingGet(true);
    fetch(`${import.meta.env.VITE_API_URL}/inventory/measureUnit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data.data);
        setMeasureUnits(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingGet(false);
      });
  };

  // Eliminar unidad de medida
  const deleteMeasureUnit = async (id, onClose) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/measureUnit?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      console.log("data", data);

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      // actualizar localmente
      const updatedMeasureUnits = measureUnits.filter(
        (measureUnit) => measureUnit._id !== id
      );

      setMeasureUnits(updatedMeasureUnits);

      toast.success(data.message);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar unidad de medida
  const updateMeasureUnit = async (id, onClose) => {
    try {
      if (!id) {
        toast.error("No se proporciono un id");
        return;
      }
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/measureUnit?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataNewMeasureUnit),
        }
      );

      const data = await response.json();

      console.log("data", data);

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      // actualizar localmente
      const updatedMeasureUnits = measureUnits.map((measureUnit) => {
        if (measureUnit._id === id) {
          return { ...measureUnit, ...dataNewMeasureUnit };
        }
        return measureUnit;
      });

      setMeasureUnits(updatedMeasureUnits);

      toast.success(data.message);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    measureUnits,
    dataNewMeasureUnit,
    setDataNewMeasureUnit,
    createMeasureUnit,
    getMeasureUnits,
    updateMeasureUnit,
    deleteMeasureUnit,
    loadingGet,
  };
};
