import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';



// const CardsParaImpressao = (props) => {
//   return (

//   <div className="d-flex flex-column" style={{maxWidth:'300px'}}>
//     <p>Turma: { props.item.turma}</p>
//     <p><strong>{props.item.estudante}</strong></p>
//     <p>--------------------------------</p>
//     <h5>{props.item.pratos.proteina}</h5>
//     <p>--------------------------------</p>
//     {props.item.pratos.acompanhamentos.map((acomp) => {
//       return <p>{acomp}</p>
//     })}
//     <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
//     </div>
//   )
// }

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      maxHeight: 400
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const CardsParaImpressao = (props) => {
    console.log(props)
    return (

     <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section} wrap={false}>
          <Text break>Turma: { props.item.turma}</Text><br/>
          <Text>{props.item.estudante}</Text><br/>
             <Text>-------------------------------</Text><br/>
             <Text>{props.item.pratos.proteina}</Text><br/>
             <Text>-------------------------------</Text><br/>
             {props.item.pratos.acompanhamentos.map((acomp) => {
              return <><Text>{acomp}</Text><br /></>
            })}
            <Text>xxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text><br/>
            <Text></Text><br/>
            <Text></Text><br/>
         </View>
       </Page>
     </Document>
    )

    ReactPDF.render(<CardsParaImpressao />);

}

  export default CardsParaImpressao;