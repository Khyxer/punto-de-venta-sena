import Category from "../../models/category.model.js";
import Product from "../../models/product.model.js";

// Crear una categoría
export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría es requerido",
      });
    }

    const categoryBase = new Category({
      name: name.toLowerCase(),
      description,
      userCreator: req.user._id,
    });

    await categoryBase.save();

    const category = await Category.findById(categoryBase._id)
      .populate("userCreator")
      .sort({ createdAt: -1 });

    return res.status(201).json({
      success: true,
      message: "Categoría creada exitosamente",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al crear la categoría",
      error: error.message,
    });
  }
};

// Buscar categorias

export const searchCategoriesController = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: { $regex: name, $options: "i" } } : {};

    const categoriesBase = await Category.find(filter)
      .populate("userCreator")
      .sort({ createdAt: -1 });

    //total de productos

    const totalProducts = await Product.countDocuments({
      category: { $in: categoriesBase.map((category) => category._id) },
    });

    const categories = categoriesBase.map((category) => ({
      ...category._doc,
      totalProducts: totalProducts,
    }));

    return res.status(200).json({
      success: true,
      message: "Categorías encontradas exitosamente",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al buscar las categorías",
      error: error.message,
    });
  }
};

// eliminar categoria
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.query;
    const category = await Category.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Categoría eliminada exitosamente",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la categoría",
      error: error.message,
    });
  }
};

// actualizar categoria
export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.query;
    const categoryBase = await Category.findByIdAndUpdate(id, req.body);

    const categoryUpdated = await Category.findById(categoryBase._id).populate(
      "userCreator"
    );

    const totalProducts = await Product.countDocuments({
      category: categoryUpdated._id,
    });

    const category = {
      ...categoryUpdated._doc,
      totalProducts: totalProducts,
    };

    return res.status(200).json({
      success: true,
      message: "Categoría actualizada exitosamente",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la categoría",
      error: error.message,
    });
  }
};
