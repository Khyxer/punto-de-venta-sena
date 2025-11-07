import { Document, Page, Text, View } from "@react-pdf/renderer";
import { baseStyles, categoriesColumns } from "../../styles/pdfStyles";
import { PDFHeader, PDFFooter } from "./CompanyInfoPDF";
import { formatText, formatDate } from "../../utils/utilFormatFunctions";

export const CategoriesPDF = ({ categories }) => {
  const totalCategories = categories.length;
  const totalProducts = categories.reduce(
    (sum, cat) => sum + cat.totalProducts,
    0
  );
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={baseStyles.page}>
        {/* Header con info de la empresa */}
        <PDFHeader reportTitle="Reporte de Categorías" />

        {/* Resumen */}
        <View style={baseStyles.summary}>
          <Text style={baseStyles.summaryText}>
            Total de Categorías: {totalCategories} | Total de Productos:{" "}
            {totalProducts}
          </Text>
        </View>

        {/* Tabla */}
        <View style={baseStyles.table}>
          {/* Header de tabla */}
          <View style={[baseStyles.tableRow, baseStyles.tableHeader]}>
            <View style={categoriesColumns.col0}>
              <Text style={baseStyles.tableCellHeader}>#</Text>
            </View>
            <View style={categoriesColumns.col1}>
              <Text style={baseStyles.tableCellHeader}>Categoría</Text>
            </View>
            <View style={categoriesColumns.col2}>
              <Text style={baseStyles.tableCellHeader}>Descripción</Text>
            </View>
            <View style={categoriesColumns.col3}>
              <Text style={baseStyles.tableCellHeader}>Fecha de creación</Text>
            </View>
            <View style={categoriesColumns.col4}>
              <Text style={baseStyles.tableCellHeader}>Productos</Text>
            </View>
            <View style={categoriesColumns.col5}>
              <Text style={baseStyles.tableCellHeader}>Creado por</Text>
            </View>
          </View>

          {/* Filas de datos */}
          {categories.map((category, index) => (
            <View key={index} style={baseStyles.tableRow}>
              <View style={categoriesColumns.col0}>
                <Text style={baseStyles.tableCell}>{index + 1}</Text>
              </View>
              <View style={categoriesColumns.col1}>
                <Text style={baseStyles.tableCell}>
                  {formatText(category.name)}
                </Text>
              </View>
              <View style={categoriesColumns.col2}>
                <Text style={baseStyles.tableCell}>
                  {category.description || "Sin descripción"}
                </Text>
              </View>
              <View style={categoriesColumns.col3}>
                <Text style={baseStyles.tableCell}>
                  {formatDate(category.createdAt)}
                </Text>
              </View>
              <View style={categoriesColumns.col4}>
                <Text style={baseStyles.tableCell}>
                  {category.totalProducts}
                </Text>
              </View>
              <View style={categoriesColumns.col5}>
                <Text style={baseStyles.tableCell}>
                  {formatText(category.userCreator.name)}{" "}
                  {formatText(category.userCreator.lastName)}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    @{category.userCreator.userName} •{" "}
                    {category.userCreator.role}
                  </Text>
                </Text>
              </View>
            </View>
          ))}
        </View>

        <PDFFooter />

        <Text
          style={baseStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
