import React, { useState } from "react";
import Loading from "../../components/loading";
import useSWR from "swr";
import { BASE_URL, ESCOLHAS_URL_V1, INSEREALMOCO_v1 } from "../../functions/urlbase";
import fetcher from "../lib/fetcher";
import { useCookies } from "react-cookie";
import Erro from "../erro";
import { convertDate } from "../../components/dataconverted";

export default function FinalizarEscolhas(props) {
  const [cookies, setCookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false);

  const data = props.cardapio.data;
  const dataId = props.cardapio._id;
  const estudante = props.dados.nome;
  const turma = props.dados.turma;
  const turno = props.dados.turno;
  const vencimento = props.vencimento;
  const responsavel = props.responsavel;
  var pratos = {}
    if(!props.proteina) {
      pratos = {
        proteina: "Sem Proteína",
        acompanhamentos: props.acompanhamentos,
      };
    } else {
      pratos = {
        proteina: props.proteina,
        acompanhamentos: props.acompanhamentos,
      };
  }

  
  const novaEscolha = {
    'data': data,
    'dataId': dataId,
    'estudante': estudante,
    'turma': turma,
    'turno': turno,
    'vencimento': vencimento,
    'responsavel': responsavel,
    'servico': "Almoço Great Lakes",
    'pratos': pratos
  }
//corrigir o fetch automatico. de repente tirar o SWR daqui pode ser mais fácil.
async function handleSubmit() {
        setIsLoading(oldValue => oldValue = !oldValue)
        const data = fetch((BASE_URL+INSEREALMOCO_v1), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer  ${cookies.accessToken}`,
        },
        body: JSON.stringify(novaEscolha),
      }).then((res) => res.json()).then(()=> {
        let message = `Foram gravadas com sucesso as seguinte escolhas:\nData: ${convertDate(novaEscolha.data)}\nProteína: ${pratos.proteina}\nAcompanhamentos: ${[
        pratos.acompanhamentos,
      ]}\nPara: ${estudante}\nClique em "Atualizar Relatório" abaixo para visualizar as escolhas já realizadas.`;return message}).then((message)=>{alert(message);setIsLoading(oldValue => oldValue = !oldValue)}).then(props.reloadFunction())
      
   }
  // if (error) {
  //   return <Erro/>
  // }
  if (isLoading) {
    return <Loading />
  }
  
  if(!props.acompanhamentos.length>0 ) {
    return (
      <div className="container text-center">
      <div>
        <button
          type="button"
          disabled
          className="btn btn-primary m-3"
          onClick={() => {
            handleSubmit()
          }}>
          Finalizar
        </button>
      </div>
    </div>
    )
  }
  return (
    <div className="container text-center">
      <div>
        <button
          type="button"
          className="btn btn-primary m-3"
          onClick={() => {
            handleSubmit()
          }}>
          Finalizar
        </button>
      </div>
    </div>
  );
}
