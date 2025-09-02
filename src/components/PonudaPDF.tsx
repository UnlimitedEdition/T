// src/pages/PonudaPDF.tsx
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 12 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  section: { marginBottom: 15 },
  label: { fontWeight: 'bold' },
  value: { marginTop: 4 }
});

// PDF Component
const PonudaPDF = ({ config, price }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Ponuda - Laser Wood Design</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Dimenzije:</Text>
        <Text>{config.width}mm × {config.height}mm</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Materijal:</Text>
        <Text>{config.materialName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>LED osvetljenje:</Text>
        <Text>{config.ledLighting ? 'Da' : 'Ne'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Procenjena cena:</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{price.toLocaleString()} RSD</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ marginTop: 30, fontStyle: 'italic' }}>
          Hvala što koristite naš konfigurator. Kontaktiraćemo vas u najkraćem mogućem roku.
        </Text>
      </View>
    </Page>
  </Document>
);

export default PonudaPDF;