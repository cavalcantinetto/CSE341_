import React, { useState } from "react";
import Erro from "../erro";
import Cards from "./cards";
import EscolheAData from "./escolheadata";


export default function PedidosDoDia_v1(props) {
    const [dataDosPedidos, setDataDosPedidos] = useState();
    
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