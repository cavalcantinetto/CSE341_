import React, { useState } from "react";
import DadosDaCriancaInfantil from "./selecionacriancainfantil";
import InsereDatas from "./inseredatas";
import PreparaDatas from "./preparadatas";
import ConfirmaDatas from "./confirmadatas";
import VerificaEscolhasExistentes from "./escolhasexistentes";
import { useCookies } from "react-cookie";

export default function SolicitaAlmocoInfantil() {
    const [cookies, setCookies] = useCookies()
    //grava o nome do estudante a partir da caixa de seleção

    const [estudante, setEstudante] = useState();
    const [dataIni, setDataIni] = useState();
    const [dataFim, setDataFim] = useState();
    const [datasEscolhidas, setDatasEscolhidas] = useState()

    console.log(cookies.userData)

    function handleClickEstudante(value) {
        return setEstudante(value);
    }

    function handleDatas(dataIni, dataFim) {
        setDataIni(dataIni);
        setDataFim(dataFim)
    }

    function handleDatasEscolhidas(datas) {
        setDatasEscolhidas(datas);
    }

    function reload() {
        window.location.reload();
    }

    if(!estudante) {
        return <DadosDaCriancaInfantil handleClickEstudante={handleClickEstudante}/>
    }

    if(!dataIni || !dataFim) {
        return (
            <>
            <DadosDaCriancaInfantil handleClickEstudante={handleClickEstudante}/>
            <InsereDatas handleDatas={handleDatas} />
            <br />
            <VerificaEscolhasExistentes estudante={estudante} />
            </>
        )
    }

    if(!datasEscolhidas) {
        return(
        <>
        <DadosDaCriancaInfantil handleClickEstudante={handleClickEstudante}/>
        <InsereDatas handleDatas={handleDatas} disable={false}/>
        <PreparaDatas dataIni={dataIni} dataFim={dataFim} handleDatasEscolhidas={handleDatasEscolhidas} />
        <br />
        <VerificaEscolhasExistentes estudante={estudante} />
        </>
    )
        }

    else {
        console.log(datasEscolhidas);
        return (
            <>
            <DadosDaCriancaInfantil handleClickEstudante={handleClickEstudante}/>
            <InsereDatas handleDatas={handleDatas} disable={true} />
            <ConfirmaDatas datas={datasEscolhidas} handleReload={reload} estudante={estudante} responsavel={cookies.userData?.userName} email={cookies.userData?.userEmail} vencimento={cookies.userData?.userVencimento} accessToken={cookies.accessToken}/>
            <br />
            <VerificaEscolhasExistentes estudante={estudante} />
            </>
        )
    } 
   
}