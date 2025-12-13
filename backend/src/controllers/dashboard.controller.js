import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";

export const getDashboardDataController = async (req, res) => {
  //   console.log("getDashboardDataController");

  // Metodos de pago y su frecuencia de uso
  const totalPaymentMethods = await Sale.aggregate([
    {
      $group: {
        _id: "$paymentMethod",
        count: { $sum: 1 },
      },
    },
  ]);

  // stock bajo - si no hay ninguno bajo mostrar un menasje en el front de "No hay productos bajo stock"
  const productLowStock = await Product.find({
    $expr: { $lt: ["$stock", "$minStock"] },
  })
    .select("name stock minStock measureUnit imageProduct productCode")
    .populate("measureUnit");

  // Total de ventas por empleado
  const totalSalesByEmployee = await Sale.aggregate([
    {
      $group: {
        _id: "$employee",
        totalSales: { $sum: "$total" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "employee",
      },
    },
    { $unwind: "$employee" },

    {
      $project: {
        totalSales: 1,
        "employee.name": 1,
        "employee.lastName": 1,
        "employee.role": 1,
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 5 },
  ]);

  // Total de ventas en los ultimos 30 días
  const rawSales = await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
            timezone: "America/Bogota",
          },
        },
        totalSales: { $sum: "$total" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const last30Days = [];
  const now = new Date();

  const bogotaOffset = -5 * 60;
  const localOffset = now.getTimezoneOffset();
  const offsetDiff = (localOffset - bogotaOffset) * 60 * 1000;

  const nowBogota = new Date(now.getTime() - offsetDiff);

  for (let i = 29; i >= 0; i--) {
    const date = new Date(nowBogota);
    date.setDate(nowBogota.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day}`;

    const found = rawSales.find((s) => s._id === formatted);

    last30Days.push({
      date: formatted,
      totalSales: found ? found.totalSales : 0,
    });
  }

  // Clientes con mas compras

  const totalSalesByClient = await Sale.aggregate([
    {
      $group: {
        _id: "$client",
        totalSales: { $sum: "$total" },
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "_id",
        foreignField: "_id",
        as: "client",
      },
    },
    { $unwind: "$client" },

    {
      $project: {
        totalSales: 1,
        "client.name": 1,
        "client.lastName": 1,
      },
    },
    { $sort: { totalSales: -1 } },
    { $limit: 5 },
  ]);

  // ========= PRODUCTOS MÁS RENTABLES (POR GANANCIA) =========
  const topProductsByP = await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $unwind: "$products" },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    {
      $group: {
        _id: "$products.product",
        productName: { $first: "$products.productName" },
        totalQuantitySold: { $sum: "$products.quantity" },
        totalRevenue: {
          $sum: { $multiply: ["$products.quantity", "$products.unitPrice"] },
        },
        // Ganancia total = (Precio Venta - Precio Costo) * Cantidad
        // totalProfit: {
        //   $sum: {
        //     $multiply: [
        //       "$products.quantity",
        //       { $subtract: ["$products.unitPrice", "$productInfo.costPrice"] },
        //     ],
        //   },
        // },
        avgSellPrice: { $avg: "$products.unitPrice" },
        costPrice: { $first: "$productInfo.costPrice" },
      },
    },
    {
      $addFields: {
        // Porcentaje de margen de ganancia
        profitMarginPercentage: {
          $cond: {
            if: { $gt: ["$avgSellPrice", 0] },
            then: {
              $multiply: [
                {
                  $divide: [
                    { $subtract: ["$avgSellPrice", "$costPrice"] },
                    "$avgSellPrice",
                  ],
                },
                100,
              ],
            },
            else: 0,
          },
        },
      },
    },
    { $sort: { profitMarginPercentage: -1 } },
    { $limit: 5 },
  ]);

  // ========= datos basicos =========
  // Función auxiliar para obtener fechas en Bogotá
  const getBogotaDates = () => {
    const now = new Date();
    const bogotaOffset = -5 * 60; // UTC-5 en minutos
    const localOffset = now.getTimezoneOffset();
    const offsetDiff = (localOffset - bogotaOffset) * 60 * 1000;

    const nowBogota = new Date(now.getTime() - offsetDiff);

    const startOfDay = new Date(nowBogota);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(nowBogota);
    endOfDay.setHours(23, 59, 59, 999);

    const start30DaysAgo = new Date(nowBogota);
    start30DaysAgo.setDate(start30DaysAgo.getDate() - 29);
    start30DaysAgo.setHours(0, 0, 0, 0);

    return {
      startOfToday: new Date(startOfDay.getTime() + offsetDiff),
      endOfToday: new Date(endOfDay.getTime() + offsetDiff),
      start30Days: new Date(start30DaysAgo.getTime() + offsetDiff),
    };
  };

  const dates = getBogotaDates();

  // ========= VENTAS DEL DÍA (BOGOTÁ) =========
  const totalSalesToday = await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: dates.startOfToday,
          $lte: dates.endOfToday,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$total" },
        salesCount: { $sum: 1 },
      },
    },
  ]);

  // ========= VENTAS DE LOS ÚLTIMOS 30 DÍAS (BOGOTÁ) =========
  const totalSalesMonth = await Sale.aggregate([
    {
      $match: {
        createdAt: {
          $gte: dates.start30Days,
          $lte: dates.endOfToday,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$total" },
        salesCount: { $sum: 1 },
      },
    },
  ]);

  // ========= PRODUCTOS A VENCER (PRÓXIMOS 30 DÍAS) =========
  const productsToExpire = await Product.aggregate([
    {
      $match: {
        expirationDate: {
          $gte: dates.startOfToday,
          $lte: new Date(dates.endOfToday.getTime() + 30 * 24 * 60 * 60 * 1000),
        },
        deleted: false,
        active: true,
      },
    },
    {
      $lookup: {
        from: "measureunits",
        localField: "measureUnit",
        foreignField: "_id",
        as: "measureUnit",
      },
    },
    { $unwind: { path: "$measureUnit", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        daysUntilExpiration: {
          $ceil: {
            $divide: [
              { $subtract: ["$expirationDate", dates.startOfToday] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        expirationDate: 1,
        daysUntilExpiration: 1,
        stock: 1,
        imageProduct: 1,
        productCode: 1,
        "measureUnit.name": 1,
      },
    },
    { $sort: { expirationDate: 1 } },
  ]);

  res.json({
    totalPaymentMethods,
    productLowStock,
    totalSalesByEmployee,
    last30Days, // SON 10 DIAS
    totalSalesByClient,
    topProductsByP, // TODO ENCONTRAR UNA MANERA DE MOSTRAR INFORMACION RELEVANTE DE ACA
    totalSalesToday, // TODO ARREGLAR ESTA MRDA
    totalSalesMonth,
    productsToExpire,
  });
};
