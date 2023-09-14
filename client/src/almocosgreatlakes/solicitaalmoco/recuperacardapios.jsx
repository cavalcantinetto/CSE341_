import React from "react";
import useSWR from 'swr';
import { BASE_URL, CARDAPIO_URL } from "../../functions/urlbase";
import fetcher from "../lib/fetcher";
import { useCookies } from "react-cookie";
import Loading from "../../components/loading";
import { convertDate } from "../../components/dataconverted";
import Erro from "../erro";

export default function RecuperaCardapiosCadastrados(props) {
    const [cookies, setCookies] = useCookies();
    const {data, error, isLoading} = useSWR(BASE_URL+CARDAPIO_URL, (url) => fetcher(url, cookies));

    if(error) {
        return <Erro />;
    }
    if(isLoading || !props.estudante) {
        props.handleClick()
        return <Loading />;
    }
    //Essa condicional serve para excluir o dia atual da lista que o pai vai ver. Usuários administrativos veem o dia atual.
    if((cookies?.userData?.userLevel)<=100) {
        if(data?.cardapio[0].data == data?.data) {
            data.cardapio.shift();
        }

    }

    return (
        <>
        <div className="container text-center">
        <div className="card-body bg-light bg-gradient rounded-3 shadow">
              <div className="m-3">
                <label htmlFor="dateRef" className="form-label m-3">
                  Data (aaaa-mm-dd):{}
                </label>
                <select
                key={data.cardapio[0]._id}
                  onChange={(e) => {
                    props.handleClick(data.cardapio[e.target[e.target.selectedIndex].value]);
                    props.handleClickAcompanhamentos([]);
                    props.handleClickEscolhaDaProteina(null)
                  }}
                >
                  <option key={"selecioneUmaData0"} value={"none"}>
                    Selecione uma data
                  </option>
                  {(data.cardapio).map((item)=> {
                    //retorna as datas constantes do banco de dados com o index no campo value.
                    return <option key={item.data} value={data.cardapio.indexOf(item)}>{(convertDate(item.data))}</option>
                  })}
                  </select>
                  </div>
        </div>
        
        </div>
        </>
    )




}
