import React, { useEffect, useState } from "react";
import Erro from "../erro";
import Cards from "./cards";
import EscolheAData from "./escolheadata";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export default function PedidosDoDia_v1(props) {
    const [dataDosPedidos, setDataDosPedidos] = useState();
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();
    useEffect(() =>{
        if(cookies.userData.userLevel <= 100) {
            return navigate('/glakes/solicitaalmocofundamental');
        }
    },[])
    
    function handleDataState(data) {
        setDataDosPedidos(data);
    }
    try{
        return (
            <>
            <EscolheAData handleDataState={handleDataState} />
            <Cards dataDosPedidos={dataDosPedidos} handleDataState={handleDataState} />
            
            </>
        )
    } catch(err) {
        console.log(err);
        return <Erro />
    }
   

    
}