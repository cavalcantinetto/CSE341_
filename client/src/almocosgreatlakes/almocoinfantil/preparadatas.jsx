import React from "react";

export default function PreparaDatas(props) {


    function getDatesInRage(dataIni, dataFim) {
        var dataIni = new Date(props.dataIni)
        var dataFim = new Date(props.dataFim)


        const datas = [];
        while (dataIni <= dataFim) {
            //Exclui o sábado e o Dommingo do array.

            if(dataIni.getDay() != 5 && dataIni.getDay() != 6) {
                datas.push(new Date(dataIni).toISOString());
                dataIni.setDate(dataIni.getDate()+1);
            }
            if(dataIni.getDay() == 6) {
                dataIni.setDate(dataIni.getDate()+1)
            } 
            if(dataIni.getDay() == 5) {
                dataIni.setDate(dataIni.getDate()+1)  
            } 
        }
        return datas;
    }

    const datas = getDatesInRage(props.dataIni, props.dataFim)
    props.handleDatasEscolhidas(datas);

    return
}