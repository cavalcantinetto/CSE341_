import React, { useRef, useState } from "react";
import InsereDatas from "./inseredata";
import TabelaDeCobranca from "./tabeladecobranca";

export default function RelatorioDeCobrancaInfantil() {
    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();
    const [tipoDeContrato, setTipoDeContrato] = useState("Mensais")

    function handleTipoDeContrato(valor) {
        setTipoDeContrato(valor);
    }

    function handleDatas(dataIni, dataFin) {
        setDataInicial(dataIni);
        setDataFinal(dataFin)
    }

    if( !dataInicial || !dataFinal) {
        return <InsereDatas handleDatas={handleDatas} handleTipoDeContrato={handleTipoDeContrato}/>

    }

    if(dataInicial && dataFinal) {
       return ( 
        <>
        <InsereDatas handleDatas={handleDatas} handleTipoDeContrato={handleTipoDeContrato} />
        <TabelaDeCobranca dataInicial={dataInicial} dataFinal={dataFinal} tipoDeContrato={tipoDeContrato} />
        </>

        
       )
    }


    

}

