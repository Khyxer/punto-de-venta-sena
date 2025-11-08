import { Document, Page, Text, View } from "@react-pdf/renderer";
import { baseStyles, measuresUnitsColumns } from "../../styles/pdfStyles";
import { PDFHeader, PDFFooter } from "./CompanyInfoPDF";
import { formatText, formatDate } from "../../utils/utilFormatFunctions";

export const MeasuresUnitsPDF = ({ measuresUnits }) => {
  const totalMeasuresUnits = measuresUnits.length;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={baseStyles.page}>
        {/* Header con info de la empresa */}
        <PDFHeader reportTitle="Reporte de Unidades de Medida" />

        {/* Resumen */}
        <View style={baseStyles.summary}>
          <Text style={baseStyles.summaryText}>
            Total de Unidades de Medida: {totalMeasuresUnits}
          </Text>
        </View>

        {/* Tabla */}
        <View style={baseStyles.table}>
          {/* Header de tabla */}
          <View style={[baseStyles.tableRow, baseStyles.tableHeader]}>
            <View style={measuresUnitsColumns.col0}>
              <Text style={baseStyles.tableCellHeader}>#</Text>
            </View>
            <View style={measuresUnitsColumns.col1}>
              <Text style={baseStyles.tableCellHeader}>Nombre</Text>
            </View>
            <View style={measuresUnitsColumns.col2}>
              <Text style={baseStyles.tableCellHeader}>Abreviatura</Text>
            </View>
            <View style={measuresUnitsColumns.col3}>
              <Text style={baseStyles.tableCellHeader}>Descripción</Text>
            </View>
            <View style={measuresUnitsColumns.col4}>
              <Text style={baseStyles.tableCellHeader}>Fecha de creación</Text>
            </View>
            <View style={measuresUnitsColumns.col5}>
              <Text style={baseStyles.tableCellHeader}>Creado por</Text>
            </View>
          </View>

          {/* Filas de datos */}
          {measuresUnits.map((measureUnit, index) => (
            <View key={index} style={baseStyles.tableRow}>
              <View style={measuresUnitsColumns.col0}>
                <Text style={baseStyles.tableCell}>{index + 1}</Text>
              </View>
              <View style={measuresUnitsColumns.col1}>
                <Text style={baseStyles.tableCell}>
                  {formatText(measureUnit?.name)}
                </Text>
              </View>
              <View style={measuresUnitsColumns.col2}>
                <Text style={baseStyles.tableCell}>
                  {measureUnit?.abbreviation}
                </Text>
              </View>
              <View style={measuresUnitsColumns.col3}>
                <Text style={baseStyles.tableCell}>
                  {measureUnit?.description || "Sin descripción"}
                </Text>
              </View>
              <View style={measuresUnitsColumns.col4}>
                <Text style={baseStyles.tableCell}>
                  {formatDate(measureUnit?.createdAt)}
                </Text>
              </View>
              <View style={measuresUnitsColumns.col5}>
                <Text style={baseStyles.tableCell}>
                  {formatText(measureUnit?.userCreator?.name)}{" "}
                  {formatText(measureUnit?.userCreator?.lastName)}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    @{measureUnit?.userCreator?.userName} •{" "}
                    {measureUnit?.userCreator?.role}
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
