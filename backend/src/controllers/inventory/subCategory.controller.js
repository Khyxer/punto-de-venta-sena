import { SubCategory } from "../../models/subCategory.model.js";

// Crear subcategoria
export const createSubCategoryController = async (req, res) => {
  try {
    const { name, description, mainCategory } = req.body;
    if (!name.toLowerCase().trim() || !mainCategory) {
      return res.status(400).json({ error: "Faltan datos", success: false });
    }

    //buscar subcategoria

    const subCategoryExist = await SubCategory.findOne({
      name: name.toLowerCase().trim(),
    });
    if (subCategoryExist) {
      return res.status(400).json({
        error: `La Subcategoria "${name}" ya existe`,
        success: false,
      });
    }

    const subCategory = await SubCategory.create({
      name: name.toLowerCase().trim(),
      description,
      mainCategory,
      userCreator: req.user.id,
    });
    return res.status(201).json({
      message: "Subcategoria creada exitosamente",
      success: true,
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener subcategorias
export const getSubCategoriesController = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    return res.status(200).json({
      message: "Subcategorias obtenidas exitosamente",
      success: true,
      subCategories,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar subcategoria
export const updateSubCategoryController = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!subCategory) {
      return res.status(404).json({
        error: "Subcategoria no encontrada",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Subcategoria actualizada exitosamente",
      success: true,
      subCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar subcategoria
export const deleteSubCategoryController = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      return res.status(404).json({
        error: "Subcategoria no encontrada",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Subcategoria eliminada exitosamente",
      success: true,
      subCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
