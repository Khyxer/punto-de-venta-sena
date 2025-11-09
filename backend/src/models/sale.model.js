import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    saleDate: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
    invoiceNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    // Referencias
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
          type: mongoose.Schema.Types.Decimal128,
          required: true,
          min: 0,
        },
        discount: {
          type: mongoose.Schema.Types.Decimal128,
          default: 0,
          min: 0,
        },
        subtotal: {
          type: mongoose.Schema.Types.Decimal128,
          required: true,
        },
      },
    ],

    // Totales con Decimal128
    subTotal: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    taxIva: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    discount: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    total: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },

    // Detalles de la venta
    paymentMethod: {
      type: String,
      enum: ["Efectivo", "Tarjeta", "Transferencia", "Crédito", "Otro"],
      default: "Efectivo",
      required: true,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // Control
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices compuestos para consultas frecuentes
saleSchema.index({ seller: 1, saleDate: -1 });
saleSchema.index({ client: 1, saleDate: -1 });
saleSchema.index({ deleted: 1 });

// Virtual para obtener total de items
saleSchema.virtual("totalItems").get(function () {
  return this.products.reduce((sum, item) => sum + item.quantity, 0);
});

// Método para convertir Decimal128 a Number
saleSchema.methods.toClientJSON = function () {
  const obj = this.toObject();

  // Convertir Decimal128 a Number
  obj.subTotal = parseFloat(obj.subTotal?.toString() || 0);
  obj.taxIva = parseFloat(obj.taxIva?.toString() || 0);
  obj.discount = parseFloat(obj.discount?.toString() || 0);
  obj.total = parseFloat(obj.total?.toString() || 0);

  obj.products = obj.products.map((item) => ({
    ...item,
    unitPrice: parseFloat(item.unitPrice?.toString() || 0),
    discount: parseFloat(item.discount?.toString() || 0),
    subtotal: parseFloat(item.subtotal?.toString() || 0),
  }));

  return obj;
};

export default mongoose.model("Sale", saleSchema);
