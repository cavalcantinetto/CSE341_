import React from "react";
import { useState } from "react";
import { convertDate } from "../components/dataconverted";
import { BASE_URL, STATUS_COBRANCA } from "../functions/urlbase";
import { useCookies } from "react-cookie";
import Loading from "../components/loading";


const LinhaTabelaCobranca = (props) => {
  const [cookies, setCookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState(props.cobrado);
  const props_id = props._id;

  async function alteraStatusCobranca() {
    setIsLoading(oldValue => oldValue = !oldValue)
    let dados;
    try {

        if(state) {
            dados = {
                _id: props_id,
                cobrado: false
              };
        
        } else {
            dados = {
                _id: props_id,
                cobrado: true
              };
        }
      const result = await fetch(BASE_URL + STATUS_COBRANCA, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
        body: JSON.stringify(dados),
      });
      if (!result) {
        alert(
          "houve uma falha e a solicitação não foi registrada. Tente novamente mais tarde."
        );
      } else {
        setState((oldValue) => (oldValue = !oldValue));
        setIsLoading(oldValue => oldValue = !oldValue)
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    
    return <><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><Loading /></td></tr></>
  }
  let tipoDeContrato;
  if(props.contrato >= 15) {
    tipoDeContrato = "Mensal"
  } else {
    tipoDeContrato = "Diária"
  }

  if (state) {
    return (
      <tr className="table-success" key={props.counter}>
        <td>{props.counter}</td>
        <td>{convertDate(props.data)}</td>
        <td>{props.estudante}</td>
        <td>{props.responsavel}</td>
        <td>{props.turma}</td>
        <td>{props.servico}</td>
        <td>{tipoDeContrato}</td>
        <td>{`Dia: ${props.vencimento}`}</td>
        <td>
          <div onClick={alteraStatusCobranca}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-all"
              viewBox="0 0 16 16"
            >
              <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
            </svg>
          </div>
        </td>
      </tr>
    );
  } else {
    return (
      <tr key={props.counter}>
        <td>{props.counter}</td>
        <td>{convertDate(props.data)}</td>
        <td>{props.estudante}</td>
        <td>{props.responsavel}</td>
        <td>{props.turma}</td>
        <td>{props.servico}</td>
        <td>{tipoDeContrato}</td>
        <td>{`Dia: ${props.vencimento}`}</td>
        <td>
          <div onClick={alteraStatusCobranca}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </td>
      </tr>
    );
  }
};

export default LinhaTabelaCobranca;
