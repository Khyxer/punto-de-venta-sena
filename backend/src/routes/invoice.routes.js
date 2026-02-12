import express from "express";
import { getNextInvoiceNumber } from "../utils/invoiceCounter.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Obtener el siguiente número de factura
router.get("/next-invoice-number", authenticateToken, (req, res) => {
  try {
    const nextNumber = getNextInvoiceNumber();
    res.json({
      success: true,
      invoiceNumber: nextNumber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener número de factura",
    });
  }
});

export default router;
