import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/loading";
import BotoesOpcoes from "./botoesopcoes";
import { BASE_URL, LISTADESERVICOS } from "../functions/urlbase";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "./lib/fetcher";
import Erro from "./erro";

export default function SelecionaServicos(props) {
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();
    if(!cookies.userData) {
    navigate('/');
    }

    const {data, error, isLoading } = useSWR(BASE_URL+LISTADESERVICOS, (url => fetcher(url, cookies)));

    if(error) {
        return <Erro />
    }

    if(isLoading) {
        return <Loading/>
    }
    return (
        <div className="d-flex justify-content-center flex-column  ">
            {data.map((svc) => {
                return <BotoesOpcoes nome={svc.servico} keyname={svc._id} url={svc.endereco}/>
            } )
        }
        </div>
    )
}
