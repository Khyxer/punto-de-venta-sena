import Category from "../../models/category.model.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoría es requerido",
      });
    }

    const category = new Category({
      name: name.toLowerCase(),
      description,
      userCreator: req.user._id,
    });

    await category.save();

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
