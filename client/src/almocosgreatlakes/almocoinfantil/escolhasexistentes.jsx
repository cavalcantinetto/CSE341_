import React from "react";
import useSWR from 'swr';
import { BASE_URL, GETKIDSINFANTILCHOICES_V1 } from "../../functions/urlbase";
import Erro from "../erro";
import Loading from "../../components/loading";
import { useCookies } from "react-cookie";
import fetcher from "../lib/fetcher";
import { convertDate } from "../../components/dataconverted";
import LinhasTabelaRelatorio from "./linhastabelarelatorio";

export default function VerificaEscolhasExistentes(props) {
    const [cookies, setCookies] = useCookies();
    const {data, error, isLoading} = useSWR(BASE_URL+GETKIDSINFANTILCHOICES_V1+props.estudante.nome, (url) => fetcher(url, cookies));
    var count = 0;

    if(error) {
        return <Erro />
    }

    if(isLoading) {
        return <Loading />
    }
    if(data.pedidos.length == 0) {
        return (
            <div className="container text-center">
            <hr />
            <h4>Não há dia a serem exibidos para: <strong>{props.estudante.nome} - {props.estudante.turma}</strong> </h4>
            </div>

        )
    }

    return (
        <div className="container text-center border">
            <hr />
            <h5 className="bg-primary text-white">Escolhas já realizadas para: {props.estudante.nome} - {props.estudante.turma} </h5>

            <div className='container text-center'>
            <table className="table table-striped table-hover">
                <thead>
                    <tr key={'cabecalho'}>
                    <th scope="col">Ordem</th>
                    <th scope="col">Data</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Cobrado</th>
                    </tr>
                </thead>
                <tbody>
            {data.pedidos.map(item => {
                count += 1;
                return (
                    <LinhasTabelaRelatorio _id={item._id} count={count} data={item.data} servico={item.servico} cobrado={item.cobrado}/>
                )
           
            })}
            </tbody>
            </table>
        </div>
        </div>



    )
}