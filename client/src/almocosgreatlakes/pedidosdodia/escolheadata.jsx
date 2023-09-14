import React from "react";
import { useCookies } from "react-cookie";
import useSWR from 'swr';
import { BASE_URL, CARDAPIO_URL } from "../../functions/urlbase";
import fetcher from "../lib/fetcher";
import Erro from "../erro";
import Loading from "../../components/loading";
import { convertDate } from "../../components/dataconverted";


export default function EscolheAData(props) {
    const [cookies, setCookies] = useCookies()

    const {data, error, isLoading} = useSWR(BASE_URL+CARDAPIO_URL, (url)=> fetcher(url, cookies));
    
    if (error) {
        return <Erro />
    }
    if (isLoading) {
        return <Loading />
    }

    if (data.cardapio.length) {
        return(
            <>
            <div className="container text-center">
              <h1>PEDIDOS DO DIA</h1>
            </div>
            <div className="container text-center">
              <div className="m-3">
                <label htmlFor="dataRef" className="form-label m-3">
                  Escolha o dia para exibir a lista de pedidos:
                </label>
                <select key='escolhaDeData' onChange={(e)=> {
                    e.preventDefault();
                    props.handleDataState(e.target[e.target.selectedIndex].value);
                }}>
                    <option>Escolha a data ....</option>
                    {data.cardapio.map((item) => {
                        if(item.data) {
                            return (
                                <option key={item._id} value={item._id}>{convertDate(item.data)}</option>
                            )
                        }
                    })}
                </select>
                </div>
            </div>
            </>
        )
    } else {
        return <Erro />
    }
   
}