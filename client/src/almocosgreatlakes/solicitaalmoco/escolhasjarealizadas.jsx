import React, { useState } from "react";
import { BASE_URL, DELETE_URL_V1, ESCOLHAS_URL, ESCOLHAS_URL_V1 } from "../../functions/urlbase";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { useCookies } from "react-cookie";
import Erro from "../erro";
import Loading from "../../components/loading";
import { convertDate } from "../../components/dataconverted";

export default function EscolhasJaRealizadas(props) {
  const [cookies, setCookies] = useCookies();
  const [isLoader, setIsLoader] = useState(false)
  const { data, error, isLoading } = useSWR(
    BASE_URL + ESCOLHAS_URL_V1 + props.estudante.nome,
    (url) => fetcher(url, cookies)
  );

  if (error) {
    return <Erro />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isLoader) {
    return <Loading />;
  }
  return (
    <>
      <div className="border border-primary">
        <div className="container text-center">
          <h1>Relatório de escolhas já realizadas</h1>
          <p><small>
          Instruções: Para realizar novas escolhas, selecione primeiro a data no campo
            acima.
          </small></p>
          <span>
            <small>
              O sistema sobrescreverá escolhas já realizadas, caso
              você escolha uma data já cadastrada.
            </small>
          </span>
          <p><small>Para ver as escolhas já realizadas, clique em Atualizar relatório.</small></p><br/>
              <button
                type="button"
                className="btn btn-primary m-3"
                onClick={() => {
                  setIsLoader(oldValue => oldValue = !oldValue);
                  props.reloadFunction();
                  setIsLoader(oldValue => oldValue = !oldValue);
                }}
              >
                Atualizar Relatório
              </button>
        </div>
        
        <div className="d-flex align-content-stretch justify-content-center flex-wrap m-3 text-center ">
          {data.cardapio.map((item) => {
            if (item.data == data.data) {
              return (
                <>
                  <div
                    key={item.id}
                    className="card m-3 p-2"
                    style={{ maxWidth: "250px" }}>
                    <div className="card-body bg-light bg-gradient rounded-3 shadow">
                      <h5 className="card-title">{convertDate(item.data)}</h5>
                      <p
                        key={item._id + item.pratos.proteina}
                        className="card-text">
                        {item.pratos.proteina}
                      </p>
                      <hr></hr>
                      {item.pratos.acompanhamentos.map((acomp) => {
                        return (
                          <p key={item._id + acomp} className="card-text">
                            {acomp}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            }
            return (
              <>
                <div
                  key={item.id}
                  className="card m-3 p-2"
                  style={{ maxWidth: "250px" }}>
                  <div className="card-body bg-light bg-gradient rounded-3 shadow">
                    <h5 className="card-title">{convertDate(item.data)}</h5>
                    <p
                      key={item._id + item.pratos.proteina}
                      className="card-text">
                      {item.pratos.proteina}
                    </p>
                    <hr></hr>
                    {item.pratos.acompanhamentos.map((acomp) => {
                      return (
                        <p key={item._id + acomp} className="card-text">
                          {acomp}
                        </p>
                      );
                    })}
                  </div>
                  <div
                    value={item._id}
                    onClick={(e) => {
                      //confirmaDelete(e.target.value)
                    }}>
                    <button
                      value={item._id}
                      type="button"
                      className="btn btn-outline-danger mt-2"
                      title="Clique para apagar"
                      onClick={() => {
                        fetcher(BASE_URL+DELETE_URL_V1+item._id, cookies, "DELETE").then((data)=>{alert(data.message)}).then(props.reloadFunction())
                      }
                    }>
                      Apagar
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
