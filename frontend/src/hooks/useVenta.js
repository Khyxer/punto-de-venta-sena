import { useState } from "react";
import toast from "react-hot-toast";

export const useVenta = () => {
  const [loading, setLoading] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("Efectivo");
  const [amountReceived, setAmountReceived] = useState("");

  const [lastSaleCreated, setLastSaleCreated] = useState(null);

  function generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000);
    return `${year}${month}${day}${hour}${minute}${second}${
      selectedClient?.documentNumber || ""
    }${random}`;
  }

  const formatProducts = () => {
    return selectedProducts.map((product) => {
      return {
        product: product.product._id,
        productName: product.productName,
        productCode: product.productCode,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
      };
    });
  };

  const calculateTotal = () => {
    const subTotal = selectedProducts.reduce(
      (total, product) => total + product.quantity * product.unitPrice,
      0
    );
    const taxIva = subTotal * 0.19;
    const discount =
      (subTotal * (selectedClient?.discountPercentage || 0)) / 100;
    const total = subTotal + taxIva - discount;
    return { subTotal, taxIva, discount, total };
  };

  const limpiarVenta = () => {
    setSelectedProducts([]);
    setSelectedClient(null);
    setSelectedMethod("Efectivo");
    setAmountReceived("");
    // setLastSaleCreated(null);
  };

  const handleSaveSale = async (setShowModal) => {
    const receivedAmount = parseFloat(amountReceived) || 0;
    const newVentaForm = {
      invoiceNumber: generateInvoiceNumber(), // Listo
      client: selectedClient?._id, // Listo
      products: formatProducts(), // Listo
      subTotal: calculateTotal().subTotal, // Listo
      taxIva: calculateTotal().taxIva, // Listo
      discount: calculateTotal().discount, // Listo
      total: calculateTotal().total, // Listo
      paymentMethod: selectedMethod, // Listo
      amountReceived: receivedAmount,
      change: receivedAmount - calculateTotal().total,
    };

    if (receivedAmount < calculateTotal().total) {
      toast.error("El monto recibido es menor al total a pagar");
      return;
    }

    if (selectedProducts.length === 0) {
      toast.error("Debe agregar al menos un producto");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newVentaForm),
      });

      const data = await response.json();
      if (!data.success) {
        return toast.error(data.message);
      }
      // console.log("data", data);

      console.log("data", data);

      toast.success(data.message);
      setLastSaleCreated(data.data);

      // mostrar el modal de venta completa con info relevante
      setShowModal(true);
      // limpiar los datos de la venta l finalizar
      limpiarVenta();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedProducts,
    setSelectedProducts,
    selectedClient,
    setSelectedClient,
    selectedMethod,
    setSelectedMethod,
    amountReceived,
    setAmountReceived,
    handleSaveSale,
    calculateTotal,
    loading,
    lastSaleCreated,
  };
};
