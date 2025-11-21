import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";

//crear venta
export const createSaleController = async (req, res) => {
  try {
    const baseSale = { ...req.body };

    //aregar id del empleado desde la request
    const formSale = {
      ...baseSale,
      employee: req.user.id,
    };

    //validacion de campos
    const requiredFields = {
      invoiceNumber: "Número de factura",
      products: "Productos",
      subTotal: "Subtotal",
      total: "Total",
      amountReceived: "Monto recibido",
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formSale[key])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Faltan los siguientes campos: ${missingFields.join(", ")}`,
        missingFields,
      });
    }

    //crear la venta
    const sale = await Sale.create(formSale);

    //actualizar stock
    await Promise.all(
      formSale.products.map(async (product) => {
        const updatedProduct = await Product.findByIdAndUpdate(
          product.product,
          { $inc: { stock: -product.quantity } },
          { new: true }
        );

        if (!updatedProduct) {
          throw new Error(`Producto con ID ${product.product} no encontrado`);
        }

        return updatedProduct;
      })
    );

    res.status(201).json({
      success: true,
      message: "Venta creada exitosamente",
      data: sale,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear la venta",
      error: error.message,
    });
  }
};

//obtener todas las ventas
export const getAllSalesController = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json({
      success: true,
      message: "Ventas obtenidas exitosamente",
      data: sales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las ventas",
      error: error.message,
    });
  }
};
