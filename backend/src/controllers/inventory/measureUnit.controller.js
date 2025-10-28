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

    //unico
    const measureUnitExist = await MeasureUnit.findOne({
      name: name.toLowerCase(),
      abbreviation: abbreviation,
    });

    if (measureUnitExist) {
      return res.status(400).json({
        success: false,
        message: "La unidad de medida ya existe",
      });
    }

    const measureUnitBase = new MeasureUnit({
      name: name.toLowerCase(),
      abbreviation: abbreviation,
      description,
      userCreator: req.user._id,
    });

    await measureUnitBase.save();

    const measureUnit = await MeasureUnit.findById(
      measureUnitBase._id
    ).populate("userCreator");

    return res.status(201).json({
      success: true,
      message: "Unidad de medida creada",
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

//obtener unidades de medida
export const getMeasureUnitsController = async (req, res) => {
  try {
    const measureUnits = await MeasureUnit.find().populate("userCreator").sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      message: "Unidades de medida obtenidas",
      data: measureUnits,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener las unidades de medida",
      error: error.message,
    });
  }
};

//actualizar unidad de medida
export const updateMeasureUnitController = async (req, res) => {
  try {
    const { name, abbreviation, description } = req.body;
    const measureUnit = await MeasureUnit.findById(req.query.id);
    if (!measureUnit) {
      return res.status(404).json({
        success: false,
        message: "Unidad de medida no encontrada",
      });
    }
    measureUnit.name = name.toLowerCase();
    measureUnit.abbreviation = abbreviation.toLowerCase();
    measureUnit.description = description;
    await measureUnit.save();
    return res.status(200).json({
      success: true,
      message: "Unidad de medida actualizada",
      data: measureUnit,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la unidad de medida",
      error: error.message,
    });
  }
};

//eliminar unidad de medida
export const deleteMeasureUnitController = async (req, res) => {
  try {
    const measureUnit = await MeasureUnit.findByIdAndDelete(req.query.id);
    // console.log("measureUnit", measureUnit);
    if (!measureUnit) {
      return res.status(404).json({
        success: false,
        message: "Unidad de medida no encontrada",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Unidad de medida eliminada",
      data: measureUnit,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la unidad de medida",
      error: error.message,
    });
  }
};
