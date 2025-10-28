import { SubCategory } from "../../models/subCategory.model.js";
import Product from "../../models/product.model.js";

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

    const subCategoryBase = new SubCategory({
      name: name.toLowerCase().trim(),
      description,
      mainCategory,
      userCreator: req.user.id,
    });

    await subCategoryBase.save();

    const subCategory = await SubCategory.findById(subCategoryBase._id)
      .populate("userCreator mainCategory")
      .sort({ createdAt: -1 });

    // console.log("subCategory", subCategory);

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
    // const subCategoriesBase = await SubCategory.find();
    const subCategoriesBase = await SubCategory.find()
      .populate("userCreator mainCategory")
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments({
      subCategory: {
        $in: subCategoriesBase.map((subCategory) => subCategory._id),
      },
    });

    const subCategories = subCategoriesBase.map((subCategory) => ({
      ...subCategory._doc,
      totalProducts: totalProducts,
    }));

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
    const subCategoryBase = await SubCategory.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );

    if (!subCategoryBase) {
      return res.status(404).json({
        error: "Subcategoria no encontrada",
        success: false,
      });
    }

    //totalProducts
    const totalProducts = await Product.countDocuments({
      subCategory: {
        $in: subCategoryBase._id,
      },
    });

    const subCategoryFind = await SubCategory.findById(subCategoryBase._id)
      .populate("userCreator mainCategory")
      .sort({ createdAt: -1 });

    const subCategory = {
      ...subCategoryFind._doc,
      totalProducts: totalProducts,
    };

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
    const subCategory = await SubCategory.findByIdAndDelete(req.query.id);
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
