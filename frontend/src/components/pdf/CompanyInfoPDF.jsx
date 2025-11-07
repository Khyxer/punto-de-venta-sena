import { Image, Text, View } from "@react-pdf/renderer";
import { styles } from "../../constants/constStylesPDF";
import logo from "../../assets/LogoMain.png";

export const PDFHeader = ({ reportTitle }) => (
  <View style={styles.header}>
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      <Image style={styles.logo} src={logo} />
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>NOVA POS</Text>
        <Text style={styles.companyDetails}>Dirección: kra 99 # 99 - 99</Text>
        <Text style={styles.companyDetails}>
          Tel: 00000000 | Email: novasolutions@gmail.com
        </Text>
      </View>
    </View>
    <View style={styles.reportInfo}>
      <Text style={styles.reportTitle}>{reportTitle}</Text>
      <Text style={styles.reportDate}>
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
    <Text style={styles.footer}>
      NOVA POS | Documento generado automáticamente
    </Text>
    <Text
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) =>
        `Página ${pageNumber} de ${totalPages}`
      }
      fixed
    />
  </>
);
