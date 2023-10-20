import React from "react";
import useSWR from 'swr';
import { BASE_URL, CONSULTAALMOCOINFANTIL_V1 } from "../../functions/urlbase";
import fetcher from "../lib/fetcher";
import { useCookies } from "react-cookie";
import Erro from "../erro";
import Loading from "../../components/loading";
import EstruturaDaTabela from "./estruturadatabela";


export default function AlmocosInfantis(props) {
    const [cookies, setCookies] = useCookies();
    const today = new Date(new Date().setHours(-3,0,0,0)).toISOString();

    const {data, error, isLoading} = useSWR(BASE_URL+CONSULTAALMOCOINFANTIL_V1+today, (url)=> fetcher(url, cookies))

    console.log(BASE_URL+CONSULTAALMOCOINFANTIL_V1+today);

    if(error) {
        return <Erro />
    }

    if(isLoading) {
        return <Loading />
    }

    console.log(data)
    return (
        <EstruturaDaTabela dados={data} today={today} />
    )
}