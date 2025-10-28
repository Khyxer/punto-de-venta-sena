// BORRAR ESTO SI NO LO TERMINO USANDP

import SupplierContact from "../../models/supplierContact.model.js";

export const createSupplierContactController = async (req, res) => {
  try {
    const { name, lastName, email, telephone, supplier } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "El nombre es requerido",
      });
    }

    const supplierContact = new SupplierContact({
      name,
      lastName,
      email,
      telephone,
      supplier,
    });

    await supplierContact.save();

    return res.status(201).json({
      success: true,
      message: "Contacto del proveedor creado exitosamente",
      data: supplierContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al crear el contacto del proveedor",
      error: error.message,
    });
  }
};
