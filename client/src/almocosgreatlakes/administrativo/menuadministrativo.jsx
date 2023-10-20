import React, { useEffect } from "react";
import BotoesOpcoes from "../botoesopcoes";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function MenuAdministrativo(props) {
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();
    if(!cookies.userData) {
    navigate('/');
    }

    useEffect(() =>{
        if(cookies.userData.userLevel <= 100) {
            return navigate('/glakes/solicitaalmocofundamental');
        }
    },[])

    const data = [{servico: "Insere Usuário", endereco: "/glakes/insereusuario", _id: "svc1"}, 
    {servico: "Relatório de Cobrança Infantil", endereco: "/glakes/relatorioalmocoinfantil", _id: "svc02"},
    {servico: "Relatório de Cobrança Fundamental - Glakes", endereco: "/glakes/relatoriocobranca", _id: "svc03"}, 
    {servico: "Controle de Almoço Infantil", endereco: "/glakes/almocodiarioinfantil", _id: "svc04"}
]
    

   return (
        <div className="d-flex justify-content-center flex-column  ">
            {data.map((svc) => {
                return <BotoesOpcoes nome={svc.servico} keyname={svc._id} url={svc.endereco}/>
            } )
        }
        </div>
    )
}