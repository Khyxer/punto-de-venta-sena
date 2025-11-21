import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Referencias
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      index: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    // Productos con información histórica
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productCode: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "La cantidad debe ser al menos 1"],
        },
        unitPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    // Totales con Number
    subTotal: {
      type: Number,
      required: true,
    },
    taxIva: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },

    // Detalles de la venta
    paymentMethod: {
      type: String,
      enum: ["Efectivo", "Tarjeta", "Transferencia", "Otro"],
      default: "Efectivo",
      required: true,
    },
    amountReceived: {
      type: Number,
      required: true,
      default: 0,
    },
    change: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices compuestos para consultas frecuentes
saleSchema.index({ employee: 1, saleDate: -1 });
saleSchema.index({ client: 1, saleDate: -1 });

// Virtual para obtener total de items
saleSchema.virtual("totalItems").get(function () {
  return this.products.reduce((sum, item) => sum + item.quantity, 0);
});

export default mongoose.model("Sale", saleSchema);
