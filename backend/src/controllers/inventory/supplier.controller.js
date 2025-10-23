import Supplier from "../../models/supplier.model.js";

export const createSupplierController = async (req, res) => {
  try {
    const {
      name,
      address,
      telephone,
      email,
      webSite,
      bank,
      bankAccount,
      typeProduct,
      comment,
      userCreator,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "El nombre es requerido",
      });
    }

    const supplier = new Supplier({
      name,
      description,
      address,
      telephone,
      email,
      webSite,
      bank,
      bankAccount,
      typeProduct,
      comment,
      userCreator,
    });

    await supplier.save();

    return res.status(201).json({
      success: true,
      message: "Proveedor creado exitosamente",
      data: supplier,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al crear el proveedor",
      error: error.message,
    });
  }
};
