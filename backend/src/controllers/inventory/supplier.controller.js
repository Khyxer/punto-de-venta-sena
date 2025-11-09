import Supplier from "../../models/supplier.model.js";

//crear proveedor
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
    } = req.body;

    if (!name || !telephone) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    // en uso
    const supplierExist = await Supplier.findOne({ name });
    if (supplierExist) {
      return res.status(400).json({
        success: false,
        message: "El proveedor ya existe",
      });
    }

    const supplier = new Supplier({
      name,
      address,
      telephone,
      email,
      webSite,
      bank,
      bankAccount,
      typeProduct,
      comment,
      userCreator: req.user.id,
    });

    await supplier.save();

    const supplierPopulate = await Supplier.findById(supplier._id).populate(
      "userCreator"
    );

    return res.status(201).json({
      success: true,
      message: "Proveedor creado exitosamente",
      data: supplierPopulate,
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

// buscar proveedores
export const getSuppliersController = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ deleted: false }).populate(
      "userCreator"
    );
    return res.status(200).json({
      success: true,
      message: "Proveedores obtenidos exitosamente",
      data: suppliers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener los proveedores",
      error: error.message,
    });
  }
};

// eliminar proveedor
export const deleteSupplierController = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.query.id,
      {
        deleted: true,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Proveedor eliminado exitosamente",
      data: supplier,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el proveedor",
      error: error.message,
    });
  }
};

// actualizar proveedor
export const updateSupplierController = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    }).populate("userCreator");

    return res.status(200).json({
      success: true,
      message: "Proveedor actualizado exitosamente",
      data: supplier,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el proveedor",
      error: error.message,
    });
  }
};
