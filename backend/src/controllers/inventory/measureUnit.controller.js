import MeasureUnit from "../../models/measureUnit.model.js";

//crear unidad de medida
export const createMeasureUnitController = async (req, res) => {
  try {
    const { name, abbreviation, description } = req.body;

    if (!name || !name.trim() || !abbreviation || !abbreviation.trim()) {
      return res.status(400).json({
        success: false,
        message: "El nombre y la abreviatura son requeridos",
      });
    }

    const measureUnit = new MeasureUnit({
      name: name.toLowerCase(),
      abbreviation: abbreviation.toLowerCase(),
      description,
      userCreator: req.user._id,
    });

    await measureUnit.save();
    
    return res.status(201).json({
      success: true,
      message: "Unidad de medida creada exitosamente",
      data: measureUnit,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al crear la unidad de medida",
      error: error.message,
    });
  }
};
