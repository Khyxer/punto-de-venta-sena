import Product from "../../models/product.model.js";

//crear producto
export const createProductController = async (req, res) => {
  try {
    const cleanBody = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [
        key,
        value === "" ? undefined : value,
      ])
    );

    // console.log("req.user", req.user);

    const {
      name,
      imageProduct,
      productCode,
      barCode,
      description,
      category,
      subCategory,
      supplier,
      costPrice,
      sellPrice,
      stock,
      minStock,
      measureUnit,
      expirationDate,
    } = cleanBody;

    // Validación de campos requeridos
    if (
      !name?.trim() ||
      !productCode?.trim() ||
      (!costPrice && costPrice !== 0) ||
      (!sellPrice && sellPrice !== 0) ||
      minStock == null ||
      stock == null ||
      !measureUnit
    ) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    // Validación de tipos de datos numéricos
    if (isNaN(costPrice) || costPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "El precio de costo debe ser mayor o igual a 0",
      });
    }

    if (isNaN(sellPrice) || sellPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "El precio de venta debe ser mayor o igual a 0",
      });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "El stock debe ser mayor o igual a 0",
      });
    }

    if (isNaN(minStock) || minStock < 0) {
      return res.status(400).json({
        success: false,
        message: "El stock mínimo debe ser mayor o igual a 0",
      });
    }

    // Verificar duplicados antes de intentar guardar
    const existingProduct = await Product.findOne({
      $or: [{ productCode }],
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Ya existe un producto con ese código de producto",
        field: "productCode",
      });
    }

    // Crear el producto
    const product = new Product({
      name,
      imageProduct,
      productCode,
      barCode,
      description,
      category,
      subCategory,
      supplier,
      costPrice,
      sellPrice,
      stock,
      minStock,
      measureUnit,
      expirationDate,
      userCreator: req.user._id,
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

// Obtener productos
export const getProductsController = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false }).populate(
      "category subCategory supplier measureUnit"
    );
    // console.log("hola backend", Date.now());
    return res.status(200).json({
      success: true,
      message: "Productos obtenidos exitosamente",
      data: products,
    });
  } catch (error) {
    console.error("Error en getProductsController:", error);
    console.error("Código de error:", error.code);
    console.error("Nombre del error:", error.name);

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor al obtener los productos",
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
        errorName: error.name,
        errorCode: error.code,
      }),
    });
  }
};

// Eliminar producto (soft delete)
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID del producto es requerido",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    // Soft delete: marcar como eliminado
    product.deleted = true;
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Producto eliminado exitosamente",
      data: product,
    });
  } catch (error) {
    console.error("Error en deleteProductController:", error);
    console.error("Código de error:", error.code);
    console.error("Nombre del error:", error.name);

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor al eliminar el producto",
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
        errorName: error.name,
        errorCode: error.code,
      }),
    });
  }
};

// Actualizar producto
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID del producto es requerido" });
    }

    const cleanBody = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [key, value === "" ? undefined : value])
    );

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    // actualizar campos permitidos
    const updatableFields = [
      "name",
      "imageProduct",
      "image",
      "productCode",
      "barCode",
      "description",
      "category",
      "subCategory",
      "supplier",
      "costPrice",
      "sellPrice",
      "stock",
      "minStock",
      "measureUnit",
      "expirationDate",
      "active",
    ];

    updatableFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(cleanBody, field) && cleanBody[field] !== undefined) {
        product[field] = cleanBody[field];
      }
    });

    await product.save();

    return res.status(200).json({ success: true, message: "Producto actualizado exitosamente", data: product });
  } catch (error) {
    console.error("Error en updateProductController:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor al actualizar el producto",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};
