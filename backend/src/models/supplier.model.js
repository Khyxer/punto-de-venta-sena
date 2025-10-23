import mongoose from "mongoose";

//proveedor
const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    telephone: {
      type: Number,
    },
    email: {
      type: String,
    },
    webSite: {
      type: String,
    },
    bank: {
      type: String,
    },
    bankAccount: {
      type: String,
    },
    typeProduct: {
      type: String,
    },
    comment: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    userCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contactsPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupplierContact",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Supplier", supplierSchema);
