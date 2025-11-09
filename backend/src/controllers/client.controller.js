import Client from "../models/client.model.js";
import { validNumberDocument } from "../utils/validateDocument.js";

// Crear cliente
export const createClientController = async (req, res) => {
  try {
    const {
      name,
      lastName,
      typeDocument,
      documentNumber,
      telephone,
      email,
      address,
      birthDate,
      gender,
      notes,
      discountPercentage,
      loyaltyPoints,
      preferredPaymentMethod,
    } = req.body;

    // Validación de campos obligatorios
    if (
      !name.trim() ||
      !lastName.trim() ||
      !typeDocument ||
      !documentNumber.trim() ||
      !gender ||
      !preferredPaymentMethod ||
      !telephone.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    // Validación de cliente duplicado
    const clientExists = await Client.findOne({
      documentNumber,
    });

    if (clientExists && clientExists.deleted === true) {
      return res.status(400).json({
        success: false,
        message: "El numero de documento ya existe en un cliente eliminado",
      });
    } else if (clientExists) {
      return res.status(400).json({
        success: false,
        message: "El cliente ya existe",
      });
    }

    // Validar formato del número de documento
    if (!validNumberDocument[typeDocument].test(documentNumber.trim())) {
      return res.status(400).json({
        success: false,
        message: `El número de documento no es válido para ${typeDocument}`,
      });
    }

    if (discountPercentage !== undefined) {
      const discount = Number(discountPercentage);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        return res.status(400).json({
          success: false,
          message: "El porcentaje de descuento debe estar entre 0 y 100",
        });
      }
    }

    await Client.create({
      name: name.trim(),
      lastName: lastName.trim(),
      typeDocument,
      documentNumber: documentNumber.trim().toUpperCase(),
      telephone: telephone?.trim(),
      email: email?.trim().toLowerCase(),
      address: address?.trim(),
      birthDate,
      gender,
      notes,
      discountPercentage: discountPercentage || 0,
      loyaltyPoints: loyaltyPoints || 0,
      preferredPaymentMethod,
      userCreator: req.user?._id,
    });

    const client = await Client.findOne({
      documentNumber,
    }).populate("userCreator");

    console.log(client);

    res.status(201).json({
      success: true,
      message: "Cliente creado exitosamente",
      data: client,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear el cliente",
    });
  }
};

// Obtener todos los clientes
export const getClientsController = async (req, res) => {
  try {
    const clients = await Client.find({ deleted: false })
      .populate("userCreator")
      .sort({ createdAt: -1 });

    // Obtener estadísticas para cada cliente
    const clientsWithStats = await Promise.all(
      clients.map(async (client) => {
        const statistics = await client.getStatistics();
        return {
          ...client.toObject(), // Convertir a objeto plano
          statistics, // Agregar estadísticas
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Clientes obtenidos exitosamente",
      data: clientsWithStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los clientes",
    });
  }
};

// Actualizar cliente
export const updateClientController = async (req, res) => {
  try {
    const { id } = req.query;
    const client = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Cliente actualizado exitosamente",
      data: client,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el cliente",
    });
  }
};

// Eliminar cliente (Estado)
export const deleteClientController = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No se proporciono un id",
      });
    }
    const client = await Client.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Cliente eliminado exitosamente",
      data: client,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el cliente",
    });
  }
};
