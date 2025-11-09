// Papelera
import Client from "../models/client.model.js";
import Category from "../models/category.model.js";
import SubCategory from "../models/subCategory.model.js";
import MeasureUnit from "../models/measureUnit.model.js";
import Supplier from "../models/supplier.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const MODELS = {
  client: Client,
  category: Category,
  subCategory: SubCategory,
  measureUnit: MeasureUnit,
  supplier: Supplier,
  user: User,
  product: Product,
};

// Obtener todos los items eliminados
export const getAllTrashItems = async (req, res) => {
  try {
    const allTrashItems = [];

    // Recorrer todos los modelos
    for (const [type, Model] of Object.entries(MODELS)) {
      const items = await Model.find({ deleted: true })
        .sort({ createdAt: -1 })
        .lean();

      const itemsWithType = items.map((item) => ({
        ...item,
        resourceType: type,
      }));

      allTrashItems.push(...itemsWithType);
    }

    res.status(200).json({
      success: true,
      data: allTrashItems,
      count: allTrashItems.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener elementos eliminados",
    });
  }
};

// Restaurar item
export const restoreItem = async (req, res) => {
  try {
    const { type, id } = req.params;

    const Model = MODELS[type];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: "Tipo de recurso no válido",
      });
    }

    const item = await Model.findByIdAndUpdate(
      id,
      { deleted: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Elemento no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Elemento restaurado exitosamente",
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al restaurar el elemento",
    });
  }
};

// Eliminar permanentemente
export const permanentDelete = async (req, res) => {
  try {
    const { type, id } = req.params;

    const Model = MODELS[type];
    if (!Model) {
      return res.status(400).json({
        success: false,
        message: "Tipo de recurso no válido",
      });
    }

    // Verificar que esté marcado como eliminado antes de borrar permanentemente
    const item = await Model.findOne({ _id: id, deleted: true });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Elemento no encontrado o no está en papelera",
      });
    }

    await Model.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Elemento eliminado permanentemente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar permanentemente",
    });
  }
};
