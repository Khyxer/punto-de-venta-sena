import { StyleSheet } from "@react-pdf/renderer";

export const baseStyles = StyleSheet.create({
  // Layout general
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  logo: {
    width: 60,
    height: 60,
  },
  companyInfo: {
    flex: 1,
    marginLeft: 15,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  companyDetails: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 2,
  },
  reportInfo: {
    textAlign: "right",
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
  reportDate: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 2,
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 35,
    right: 35,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#9ca3af",
  },

  summary: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  summaryText: {
    fontSize: 9,
    color: "#374151",
  },

  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 25,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#2563eb",
  },
  tableCell: {
    fontSize: 9,
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
    padding: 5,
  },
});

// Funcion para crear columnas de diferentes tamaños para las tablas
// Recibe un array de strings con el ancho de cada columna
// Retorna un objeto con las columnas

export const createTableColumns = (widths) => {
  const styles = {};
  widths.forEach((width, index) => {
    styles[`col${index}`] = {
      width: width,
      padding: 5,
    };
  });
  return StyleSheet.create(styles);
};

// Columnas de categorias
export const categoriesColumns = createTableColumns([
  "8%", // # (número)
  "19%", // Categoría
  "25%", // Descripción
  "13%", // Fecha de creación
  "11%", // Productos
  "24%", // Creado por
]);

// Columnas de suscategorias
export const subCategoriesColumns = createTableColumns([
  "6%", // # (número)
  "16%", // Categoría
  "16%", // Categoría padre
  "21%", // Descripción
  "11%", // Fecha de creación
  "9%", // Productos
  "21%", // Creado por
]);

// Columnas de unidades de medida
export const measuresUnitsColumns = createTableColumns([
  "8%", // # (número)
  "15%", // Nombre
  "10%", // Abreviatura
  "32%", // Descripción
  "20%", // Fecha de creación
  "15%", // Creado por
]);

// Columnas de proveedores
export const suppliersColumns = createTableColumns([
  "5%", // #
  "14%", // Nombre
  "13%", // Teléfono
  "16%", // Email
  "13%", // Dirección
  "14%", // Tipo de producto
  "13%", // Creado por
  "12%", // Fecha de creación
]);

// Columnas de empleados
export const employeesColumns = createTableColumns([
  "5%", // #
  "14%", // Nombre
  "13%", // Usuario
  "16%", // Rol
  "13%", // Telefono
  "13%", // Creado por
  "14%", // Fecha de creación
]);

export const combineStyles = (...stylesheets) => {
  return Object.assign({}, ...stylesheets);
};
