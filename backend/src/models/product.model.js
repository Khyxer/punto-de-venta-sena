import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    image: {
      type: String,
    },
    productCode: {
      type: String,
      required: [true, "El código de producto es requerido"],
      unique: true,
    },
    barCode: {
      type: String,
      required: [true, "El código de barras es requerido"],
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    costPrice: {
      type: Number,
      required: [true, "El precio de costo es requerido"],
    },
    sellPrice: {
      type: Number,
      required: [true, "El precio de venta es requerido"],
    },
    stock: {
      type: Number,
      required: [true, "El stock es requerido"],
      min: [0, "El stock debe ser mayor o igual a 0"],
    },
    minStock: {
      type: Number,
      required: [true, "El stock mínimo es requerido"],
      min: [0, "El stock mínimo debe ser mayor o igual a 0"],
    },
    unitOfMeasure: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnitOfMeasure",
    },
    expirationDate: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    userCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
