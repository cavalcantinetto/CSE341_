import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';



const CardsParaImpressao = (props) => {
  return (

  <div className="container text-center">
    <h1>Turma: { props.turma}</h1>
    <h1>Estudante: {props.estudante}</h1>
    <p>--------------------------------</p>
    <h3>{props.pratos.proteina}</h3>
    <p>{props.pratos.acompanhamentos}</p>
    <p>--------------------------------</p>
    </div>
  )
}

// const styles = StyleSheet.create({
//     page: {
//       flexDirection: 'row',
//       backgroundColor: '#E4E4E4'
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1
//     }
//   });

// const MyDocument = (props) => {
//     console.log(props)
//     return (

//      <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>texto 1</Text><br/>
//           <Text>texto 2</Text>
//         </View>
//       </Page>
//     </Document>
  


//     )
// //     ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

// }

  export default CardsParaImpressao;