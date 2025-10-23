import Product from "../../models/product.model.js";

//crear producto
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      productCode,
      barCode,
      description,
      category,
      supplier,
      costPrice,
      sellPrice,
      stock,
      minStock,
      unitOfMeasure,
      expirationDate,
      userCreator,
    } = req.body;

    // Validación de campos requeridos
    if (
      !name ||
      !productCode ||
      !barCode ||
      !costPrice ||
      !sellPrice ||
      stock === undefined ||
      minStock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
        errors: {
          name: !name ? "El nombre es requerido" : null,
          productCode: !productCode
            ? "El código de producto es requerido"
            : null,
          barCode: !barCode ? "El código de barras es requerido" : null,
          costPrice: !costPrice ? "El precio de costo es requerido" : null,
          sellPrice: !sellPrice ? "El precio de venta es requerido" : null,
          stock: stock === undefined ? "El stock es requerido" : null,
          minStock:
            minStock === undefined ? "El stock mínimo es requerido" : null,
        },
      });
    }

    // Validación de tipos de datos numéricos
    if (isNaN(costPrice) || costPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "El precio de costo debe ser un número positivo",
      });
    }

    if (isNaN(sellPrice) || sellPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "El precio de venta debe ser un número positivo",
      });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "El stock debe ser un número mayor o igual a 0",
      });
    }

    if (isNaN(minStock) || minStock < 0) {
      return res.status(400).json({
        success: false,
        message: "El stock mínimo debe ser un número mayor o igual a 0",
      });
    }

    // Verificar duplicados antes de intentar guardar
    const existingProduct = await Product.findOne({
      $or: [{ productCode }, { barCode }],
    });

    if (existingProduct) {
      if (existingProduct.productCode === productCode) {
        return res.status(409).json({
          success: false,
          message: "Ya existe un producto con ese código de producto",
          field: "productCode",
        });
      }
      if (existingProduct.barCode === barCode) {
        return res.status(409).json({
          success: false,
          message: "Ya existe un producto con ese código de barras",
          field: "barCode",
        });
      }
    }

    // Crear el producto
    const product = new Product({
      name,
      image,
      productCode,
      barCode,
      description,
      category,
      supplier,
      costPrice,
      sellPrice,
      stock,
      minStock,
      unitOfMeasure,
      expirationDate,
      userCreator,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Producto creado exitosamente",
      data: product,
    });
  } catch (error) {
    console.error("Error en createProductController:", error);
    console.error("Código de error:", error.code);
    console.error("Nombre del error:", error.name);

    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors,
      });
    }

    // Manejo de errores de duplicados (índices únicos)
    if (error.code === 11000 || error.name === "MongoServerError") {
      const field = Object.keys(error.keyPattern || {})[0];
      const value = error.keyValue ? error.keyValue[field] : "";

      let message = "Ya existe un registro con ese valor";

      if (field === "productCode") {
        message = `Ya existe un producto con el código: ${value}`;
      } else if (field === "barCode") {
        message = `Ya existe un producto con el código de barras: ${value}`;
      }

      return res.status(409).json({
        success: false,
        message,
        field,
        duplicateValue: value,
      });
    }

    // Error genérico del servidor
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor al crear el producto",
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
        errorName: error.name,
        errorCode: error.code,
      }),
    });
  }
};
