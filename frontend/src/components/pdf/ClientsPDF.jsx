import { Document, Page, Text, View } from "@react-pdf/renderer";
import { baseStyles, clientsColumns } from "../../styles/pdfStyles";
import { PDFHeader, PDFFooter } from "./CompanyInfoPDF";
import { formatText, formatDate } from "../../utils/utilFormatFunctions";

export const ClientsPDF = ({ clients }) => {
  const totalClients = clients.length;
  const activeClients = clients.filter((client) => client.active).length;
  const totalPurchases = clients.reduce(
    (sum, client) => sum + (client.totalPurchases || 0),
    0
  );
  const totalPurchaseCount = clients.reduce(
    (sum, client) => sum + (client.purchaseCount || 0),
    0
  );

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={baseStyles.page}>
        {/* Header con info de la empresa */}
        <PDFHeader reportTitle="Reporte de Clientes" />

        {/* Resumen */}
        <View style={baseStyles.summary}>
          <Text style={baseStyles.summaryText}>
            Total de Clientes: {totalClients} | Clientes Activos:{" "}
            {activeClients} | Total Compras: $
            {totalPurchases.toLocaleString("es-CO")} | N° de Compras:{" "}
            {totalPurchaseCount}
          </Text>
        </View>

        {/* Tabla */}
        <View style={baseStyles.table}>
          {/* Header de tabla */}
          <View style={[baseStyles.tableRow, baseStyles.tableHeader]}>
            <View style={clientsColumns.col0}>
              <Text style={baseStyles.tableCellHeader}>#</Text>
            </View>
            <View style={clientsColumns.col1}>
              <Text style={baseStyles.tableCellHeader}>Nombre</Text>
            </View>
            <View style={clientsColumns.col2}>
              <Text style={baseStyles.tableCellHeader}>Documento</Text>
            </View>
            <View style={clientsColumns.col3}>
              <Text style={baseStyles.tableCellHeader}>Contacto</Text>
            </View>
            <View style={clientsColumns.col4}>
              <Text style={baseStyles.tableCellHeader}>Teléfono</Text>
            </View>
            <View style={clientsColumns.col5}>
              <Text style={baseStyles.tableCellHeader}>Compras</Text>
            </View>
            <View style={clientsColumns.col6}>
              <Text style={baseStyles.tableCellHeader}>Fecha de creación</Text>
            </View>
          </View>

          {/* Filas de datos */}
          {clients.map((client, index) => (
            <View key={index} style={baseStyles.tableRow}>
              <View style={clientsColumns.col0}>
                <Text style={baseStyles.tableCell}>{index + 1}</Text>
              </View>
              <View style={clientsColumns.col1}>
                <Text style={baseStyles.tableCell}>
                  {formatText(client?.name)} {formatText(client?.lastName)}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    {client?.gender} • {client?.preferredPaymentMethod}
                  </Text>
                </Text>
              </View>
              <View style={clientsColumns.col2}>
                <Text style={baseStyles.tableCell}>
                  {client?.typeDocument}
                  {"\n"}
                  <Text style={{ fontSize: 8 }}>{client?.documentNumber}</Text>
                </Text>
              </View>
              <View style={clientsColumns.col3}>
                <Text style={baseStyles.tableCell}>
                  {client?.email || "Sin email"}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    {client?.address || "Sin dirección"}
                  </Text>
                </Text>
              </View>
              <View style={clientsColumns.col4}>
                <Text style={baseStyles.tableCell}>{client?.telephone}</Text>
              </View>
              <View style={clientsColumns.col5}>
                <Text style={baseStyles.tableCell}>
                  ${(client?.totalPurchases || 0).toLocaleString("es-CO")}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    {client?.purchaseCount || 0} compra(s)
                  </Text>
                </Text>
              </View>
              <View style={clientsColumns.col6}>
                <Text style={baseStyles.tableCell}>
                  {formatDate(client?.createdAt)}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    por {formatText(client?.userCreator?.name || "Sistema")}
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
