import mongoose from "mongoose";
import Sale from "./sale.model.js";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    typeDocument: {
      type: String,
      enum: [
        "C.C",
        "T.I",
        "C.E",
        "Pasaporte",
        "Registro Civil",
        "Residencia Temporal",
      ],
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["M", "F", "Otro", "Prefiere no decir"],
      required: true,
    },
    notes: {
      type: String,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    preferredPaymentMethod: {
      type: String,
      enum: ["Efectivo", "Tarjeta", "Transferencia", "Otro"],
      required: true,
    },
    lastPurchaseDate: {
      type: Date,
    },
    totalPurchases: {
      type: Number,
      default: 0,
    },
    purchaseCount: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    userCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Método para obtener estadísticas
clientSchema.methods.getStatistics = async function () {
  const Sale = mongoose.model("Sale");

  const stats = await Sale.aggregate([
    {
      $match: {
        client: this._id,
        deleted: false,
      },
    },
    {
      $group: {
        _id: null,
        totalPurchases: {
          $sum: { $toDouble: "$total" },
        },
        purchaseCount: { $sum: 1 },
        lastPurchase: { $max: "$saleDate" },
      },
    },
  ]);

  return (
    stats[0] || {
      totalPurchases: 0,
      purchaseCount: 0,
      lastPurchase: null,
    }
  );
};

export default mongoose.model("Client", clientSchema);
