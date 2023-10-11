import React, { useEffect, useRef, useState } from "react";
import InsereDatas from "./inseredata";
import TabelaDeCobranca from "./tabeladecobranca";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function RelatorioDeCobranca() {
    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();
    const [tipoDeContrato, setTipoDeContrato] = useState("Mensais")
    const [cookies, setCookies] = useCookies()
    const navigate = useNavigate()

    useEffect(() =>{
        if(cookies.userData.userLevel <= 100) {
            return navigate('/glakes/solicitaalmocofundamental');
        }
    },[])

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

