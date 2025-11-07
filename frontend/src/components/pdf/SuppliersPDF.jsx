// ProvidersPDF.jsx
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { baseStyles, suppliersColumns } from "../../styles/pdfStyles";
import { PDFHeader, PDFFooter } from "./CompanyInfoPDF";

export const SuppliersPDF = ({ suppliers, companyInfo }) => {
  const totalSuppliers = suppliers.length;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={baseStyles.page}>
        <PDFHeader
          companyInfo={companyInfo}
          reportTitle="Reporte de Proveedores"
        />

        <View style={baseStyles.summary}>
          <Text style={baseStyles.summaryText}>
            Total de Proveedores: {totalSuppliers}
          </Text>
        </View>

        <View style={baseStyles.table}>
          {/* Header */}
          <View style={[baseStyles.tableRow, baseStyles.tableHeader]}>
            <View style={suppliersColumns.col0}>
              <Text style={baseStyles.tableCellHeader}>#</Text>
            </View>
            <View style={suppliersColumns.col1}>
              <Text style={baseStyles.tableCellHeader}>Nombre</Text>
            </View>
            <View style={suppliersColumns.col2}>
              <Text style={baseStyles.tableCellHeader}>Teléfono</Text>
            </View>
            <View style={suppliersColumns.col3}>
              <Text style={baseStyles.tableCellHeader}>Email</Text>
            </View>
            <View style={suppliersColumns.col4}>
              <Text style={baseStyles.tableCellHeader}>Dirección</Text>
            </View>
            <View style={suppliersColumns.col5}>
              <Text style={baseStyles.tableCellHeader}>Tipo de producto</Text>
            </View>
            <View style={suppliersColumns.col6}>
              <Text style={baseStyles.tableCellHeader}>Creado por</Text>
            </View>
            <View style={suppliersColumns.col7}>
              <Text style={baseStyles.tableCellHeader}>Fecha de creación</Text>
            </View>
          </View>

          {/* Filas */}
          {suppliers.map((supplier, index) => (
            <View key={index} style={baseStyles.tableRow}>
              <View style={suppliersColumns.col0}>
                <Text style={baseStyles.tableCell}>{index + 1}</Text>
              </View>
              <View style={suppliersColumns.col1}>
                <Text style={baseStyles.tableCell}>{supplier.name}</Text>
              </View>
              <View style={suppliersColumns.col2}>
                <Text style={baseStyles.tableCell}>{supplier.telephone}</Text>
              </View>
              <View style={suppliersColumns.col3}>
                <Text style={baseStyles.tableCell}>{supplier.email}</Text>
              </View>
              <View style={suppliersColumns.col4}>
                <Text style={baseStyles.tableCell}>
                  {supplier.address || "-"}
                </Text>
              </View>
              <View style={suppliersColumns.col5}>
                <Text style={baseStyles.tableCell}>
                  {supplier.typeProduct || "-"}
                </Text>
              </View>
              <View style={suppliersColumns.col6}>
                <Text style={baseStyles.tableCell}>
                  {supplier.userCreator.name} {supplier.userCreator.lastName}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    @{supplier.userCreator.userName} •{" "}
                    {supplier.userCreator.role}
                  </Text>
                </Text>
              </View>
              <View style={suppliersColumns.col7}>
                <Text style={baseStyles.tableCell}>
                  {new Date(supplier.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <PDFFooter companyInfo={companyInfo} />
      </Page>
    </Document>
  );
};
