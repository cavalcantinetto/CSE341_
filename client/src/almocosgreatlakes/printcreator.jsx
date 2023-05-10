import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

const MyDocument = (props) => {
    console.log(props)
    return (

     <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{props.cards.estudante}</Text>
          <Text>{props.cards.dataId}</Text>
        </View>
        <View style={styles.section}>
          <Text>{props.cards.estudante}</Text>
          <Text>{props.cards.dataId}</Text>
        </View>
      </Page>
    </Document>
  


    )
    ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

}

  export default MyDocument;