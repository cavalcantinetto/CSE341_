import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { convertDate } from "../components/dataconverted";
import Loading from "../components/loading";
import BotoesStatus from "./botoesstatus";
import {
  BASE_URL,
  CARDAPIO_URL,
  ESCOLHASDODIA_URL,
} from "../functions/urlbase";
import SolicitaAlmoco from "./solicitaalmoco";

const PedidosDoDia = () => {
  const [loading, setLoading] = useState(true);
  const [cookies, setCookies] = useCookies();
  const [escolhasDoDia, setEscolhasDoDia] = useState([]);
  const [cardapioNaBase, setCardapioNaBase] = useState([]);
  const [errMsg, setErrMsg] = useState();
  const dataRef = useRef();
  const [dataIdState, setDataIdState] = useState();
  const [dataState, setDataState] = useState();
  let userLevel;
  const proteinsCounter = [];
  // const [proteinasTotais, setProteinasTotais] = useState();
  let proteinas;
  let proteinasTotais;

  if (escolhasDoDia.length) {
    escolhasDoDia.map((item) => {
      proteinsCounter.push(item.pratos.proteina);
      const counts = {};
      proteinsCounter.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });
      proteinasTotais = counts;
      proteinas = Object.keys(proteinasTotais);
    });
  }

  if (cookies.userData.userLevel) {
    userLevel = cookies.userData.userLevel;
  }
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString().toString();

  async function getData() {
    try {
      const result = await fetch(BASE_URL + CARDAPIO_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
      });
      if (result.ok) {
        const res = await result.json();
        setCardapioNaBase(res);
        return;
      } else {
        const res = await result.json();
        setErrMsg(res.message);
      }
    } catch {
      const res = await getData.json();
      setErrMsg(res.message);
    }
  }
  async function getEscolhas(dataIdState) {
    try {
      let dataId = dataIdState;
      const escolhas = await fetch(BASE_URL + ESCOLHASDODIA_URL + dataId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
      });
      if (!escolhas) {
        alert("aconteceu algo errado, tente novamente mais tarde.");
        return;
      }
      if (escolhas.ok) {
        const res = await escolhas.json();
        setEscolhasDoDia(res);
        return;
      }
    } catch (err) {
      setLoading((oldValue) => !oldValue);
      return;
    }
  }

  useEffect(() => {
    setLoading((oldValue) => !oldValue);
    if (dataIdState) {
      const escolhas = getEscolhas(dataIdState);
      if (escolhas) {
        setEscolhasDoDia(escolhas);

        setLoading((oldValue) => !oldValue);
      } else {
        alert("Algo deu errado no servidor.");
      }
    }
  }, [dataIdState]);

  useEffect(() => {
    const res = getData();
    if (res) {
      setLoading((oldValue) => !oldValue);
    }
  }, []);

  if (userLevel < 110) {
    return <SolicitaAlmoco />;
  }

  {
    loading && <Loading />;
  }

  if (cardapioNaBase) {
    return (
      <>
        <div className="container text-center">
          <h1>PEDIDOS DO DIA</h1>
        </div>
        <div className="container text-center">
          <div className="m-3">
            <label htmlFor="dataRef" className="form-label m-3">
              Escolha o dia para exibir a lista de pedidos:
            </label>
            <select
              name="dataRef"
              id="dataRef"
              ref={dataRef}
              value={dataIdState}
              onChange={(e) => {
                setDataIdState(e.target[e.target.selectedIndex].value);
                setDataState(e.target[e.target.selectedIndex].text);
              }}
            >
              <option key={"startPoint"}>Escolha uma data:</option>
              {cardapioNaBase.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                    {convertDate(item.data)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {escolhasDoDia.length ? (
          <>
            <div className="container text-center">
              <h1>
                Você está visualizando as escolhas do dia:{" "}
                {convertDate(dataState)}
              </h1>
              {convertDate(today) !== dataState && (
                <p
                  className="p-3 mb-2 bg-danger text-white"
                  aria-live="assertive"
                >
                  {"Atenção. Esse relatório NÃO É DE HOJE!"}
                </p>
              )}
            </div>
            <br />
            <div className="d-flex align-content-stretch flex-wrap m-3 text-center">
              {proteinas.map((key) => {
                return (
                  <p className="card-body bg-dark text-white bg-gradient rounded-3 shadow">{`Prepare ${proteinasTotais[key]} ${key}`}</p>
                );
              })}
            </div>

            <div>
              <div className="d-flex align-content-stretch flex-wrap m-3 text-center">
                {escolhasDoDia.map((item) => {
                  return (
                    <div key={item._id} className="card m-3 p-2">
                      <div className="card-body bg-light bg-gradient rounded-3 shadow">
                        <div>
                          <h5 className="card-title m-3">{item.estudante}</h5>
                          <h4 className="card-title m-3">
                            {`Turma: ${item.turma}`}
                          </h4>
                          <p className="card-text">{item.pratos.proteina}</p>
                          <hr></hr>
                          {item.pratos.acompanhamentos.map((acomp) => {
                            return (
                              <p key={item._id + acomp} className="card-text">
                                {acomp}
                              </p>
                            );
                          })}
                          <hr></hr>
                          <BotoesStatus item={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="container text-center p-3 mb-2 bg-danger text-white"
              aria-live="assertive"
            >
              <p>
                Não há escolhas para esse dia. Escolha outro dia para visualizar
                escolhas.
              </p>
            </div>
          </>
        )}
      </>
    );
  }
};

export default PedidosDoDia;
