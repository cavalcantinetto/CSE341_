import React, { useState } from "react";
import { useCookies } from "react-cookie";
import useSWR from 'swr';
import { BASE_URL, CONSULTACOBRANCA_V1 } from "../../functions/urlbase";
import fetcher from "../lib/fetcher";
import Erro from "../erro";
import Loading from "../../components/loading";
import EstruturaDaTabelaCobrancas from "./estruturatabeladecobranca";

export default function TabelaDeCobranca(props) {
    const [cookies, setCookies] = useCookies();

    const {data, error, isLoading} = useSWR(BASE_URL+CONSULTACOBRANCA_V1+props.dataInicial+"&"+props.dataFinal, (url)=> fetcher(url, cookies));

    if(error) {
        return <Erro />
    }

    if(isLoading) {
        return <Loading />
    }

    return (
        <>
        <div className='container'>
        <EstruturaDaTabelaCobrancas dados={data} tipoDeContrato={props.tipoDeContrato}/>
        </div>
        </>
    )
}