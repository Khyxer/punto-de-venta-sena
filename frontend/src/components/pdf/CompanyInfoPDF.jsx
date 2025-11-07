import { Image, Text, View } from "@react-pdf/renderer";
// import { styles } from "../../constants/constStylesPDF";
import { baseStyles } from "../../styles/pdfStyles";
import logo from "../../assets/LogoMain.png";

export const PDFHeader = ({ reportTitle }) => (
  <View style={baseStyles.header}>
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      <Image style={baseStyles.logo} src={logo} />
      <View style={baseStyles.companyInfo}>
        <Text style={baseStyles.companyName}>NOVA POS</Text>
        <Text style={baseStyles.companyDetails}>Dirección: kra 99 # 99 - 99</Text>
        <Text style={baseStyles.companyDetails}>
          Tel: 00000000 | Email: novasolutions@gmail.com
        </Text>
      </View>
    </View>
    <View style={baseStyles.reportInfo}>
      <Text style={baseStyles.reportTitle}>{reportTitle}</Text>
      <Text style={baseStyles.reportDate}>
        {new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  </View>
);

export const PDFFooter = () => (
  <>
    <Text style={baseStyles.footer}>
      NOVA POS | Documento generado automáticamente
    </Text>
    <Text
      style={baseStyles.pageNumber}
      render={({ pageNumber, totalPages }) =>
        `Página ${pageNumber} de ${totalPages}`
      }
      fixed
    />
  </>
);
