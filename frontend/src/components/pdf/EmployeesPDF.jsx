import { Document, Page, Text, View } from "@react-pdf/renderer";
import { baseStyles, employeesColumns } from "../../styles/pdfStyles";
import { PDFHeader, PDFFooter } from "./CompanyInfoPDF";
import { formatText } from "../../utils/utilFormatFunctions";

export const EmployeesPDF = ({ employees }) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.active).length;

  const traslateRole = {
    admin: "Admin",
    employee: "Empleado",
    cashier: "Cajero",
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={baseStyles.page}>
        <PDFHeader reportTitle="Reporte de Empleados" />

        <View style={baseStyles.summary}>
          <Text style={baseStyles.summaryText}>
            Total de Empleados: {totalEmployees} | Activos: {activeEmployees} |
            Inactivos: {totalEmployees - activeEmployees}
          </Text>
        </View>

        <View style={baseStyles.table}>
          {/* Header */}
          <View style={[baseStyles.tableRow, baseStyles.tableHeader]}>
            <View style={employeesColumns.col0}>
              <Text style={baseStyles.tableCellHeader}>#</Text>
            </View>
            <View style={employeesColumns.col1}>
              <Text style={baseStyles.tableCellHeader}>Nombre</Text>
            </View>
            <View style={employeesColumns.col2}>
              <Text style={baseStyles.tableCellHeader}>Usuario</Text>
            </View>
            <View style={employeesColumns.col3}>
              <Text style={baseStyles.tableCellHeader}>Email</Text>
            </View>
            <View style={employeesColumns.col4}>
              <Text style={baseStyles.tableCellHeader}>Rol</Text>
            </View>
            <View style={employeesColumns.col5}>
              <Text style={baseStyles.tableCellHeader}>Teléfono</Text>
            </View>
            <View style={employeesColumns.col6}>
              <Text style={baseStyles.tableCellHeader}>Creado por</Text>
            </View>
            <View style={employeesColumns.col7}>
              <Text style={baseStyles.tableCellHeader}>Fecha de creación</Text>
            </View>
          </View>

          {/* Filas */}
          {employees.map((employee, index) => (
            <View key={index} style={baseStyles.tableRow}>
              <View style={employeesColumns.col0}>
                <Text style={baseStyles.tableCell}>{index + 1}</Text>
              </View>
              <View style={employeesColumns.col1}>
                <Text style={baseStyles.tableCell}>
                  {formatText(employee?.name)} {formatText(employee?.lastName)}
                  {"\n"}
                  <Text
                    style={{
                      fontSize: 7,
                      color: employee?.active ? "#10b981" : "#ef4444",
                    }}
                  >
                    {employee?.active ? "Activo" : "Inactivo"}
                  </Text>
                </Text>
              </View>
              <View style={employeesColumns.col2}>
                <Text style={baseStyles.tableCell}>{employee?.userName}</Text>
              </View>
              <View style={employeesColumns.col3}>
                <Text style={baseStyles.tableCell}>
                  {employee?.email || "No especificado"}
                </Text>
              </View>
              <View style={employeesColumns.col4}>
                <Text style={baseStyles.tableCell}>
                  {traslateRole[employee?.role]}
                </Text>
              </View>
              <View style={employeesColumns.col5}>
                <Text style={baseStyles.tableCell}>{employee?.telephone}</Text>
              </View>
              <View style={employeesColumns.col6}>
                <Text style={baseStyles.tableCell}>
                  {formatText(employee?.userCreator?.name)}{" "}
                  {formatText(employee?.userCreator?.lastName)}
                  {"\n"}
                  <Text style={{ fontSize: 7, color: "#6b7280" }}>
                    {employee?.userCreator?.userName}
                  </Text>
                </Text>
              </View>
              <View style={employeesColumns.col7}>
                <Text style={baseStyles.tableCell}>
                  {new Date(employee?.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <PDFFooter />
      </Page>
    </Document>
  );
};
