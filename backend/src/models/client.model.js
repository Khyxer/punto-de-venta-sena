import mongoose from "mongoose";

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
      enum: ["CC", "TI", "CE", "Pasaporte", "Otro"],
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    telephone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
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

export default mongoose.model("Client", clientSchema);
