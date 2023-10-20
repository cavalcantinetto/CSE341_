import React, { useEffect, useState } from "react";
import { convertDate } from "../../components/dataconverted";
import { useCookies } from "react-cookie";
import { BASE_URL, ESCOLHASDODIA_V1 } from "../../functions/urlbase";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Erro from "../erro";
import Loading from "../../components/loading";
import CardsParaImpressao from "../printcreator";
//import fetchEscolhas from "./fetchpedidosdodia";

export default function Cards(props) {
  const [cookies, setCookies] = useCookies();
  //const [data, setData] = useState();
  const [impressao, setImprime] = useState(false);
  let proteinsCounter = [];
  let proteinasTotais;
  let acompCounter = [];
  let acompsTotais;

  function setPrintCards() {
    setImprime((oldValue) => (oldValue = !oldValue));
  }

  function printCards() {
    const printArea = document.getElementById("printArea").innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printArea;
    window.print();
    document.body.innerHTML = originalContent;
  }

  const { data, error, isLoading } = useSWR(
    BASE_URL + ESCOLHASDODIA_V1 + props.dataDosPedidos,
    (url) => fetcher(url, cookies)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    if (impressao) {
      return (
        <>
          <div className="container align-self-center justify-content-center p-3 mb-2 bg-light text-center">
            <button
              onClick={(e) => {
                setPrintCards();
              }}>
              Retorna à página pedidos do dia
            </button>
          </div>
          <div>
            <div
              className="d-flex flex-column"
              style={{ maxWidth: "300px" }}
              id="printArea">
              {data.map((item) => {
                return <CardsParaImpressao item={item} />;
              })}
            </div>

            <button onClick={printCards}>Imprime os cards</button>
          </div>
        </>
      );
    }

    if (data.length == 0) {
      return (
        <div className="d-flex align-content-stretch justify-content-center flex-wrap m-3 text-center">
          <p className="p-3 mb-2 bg-danger text-white" aria-live="assertive">
            Não há pedidos para esse dia.
          </p>
        </div>
      );
    }

    {
      data.map((item) => {
        proteinsCounter.push(item.pratos.proteina);
        const counts = {};
        proteinsCounter.forEach(function (x) {
          counts[x] = (counts[x] || 0) + 1;
        });
        proteinasTotais = counts;
      });
    }
    data.map((item) => {
      item.pratos.acompanhamentos.forEach((acomp) => {
        acompCounter.push(acomp);
      });
      const counts = {};
      acompCounter.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });
      acompsTotais = counts;
    });

    if (
      data[0].data != new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    ) {
      return (
        <>
          <div className="d-flex align-content-stretch justify-content-center flex-wrap m-3 text-center">
            <p className="p-3 mb-2 bg-danger text-white" aria-live="assertive">
              Atenção, o dia exibido NÃO é igual a data de hoje.
            </p>
          </div>
          <div className="container align-self-center p-3 mb-2 bg-light text-center w-50 ">
            <h3>
              <u>PROTEÍNAS DO DIA</u>
            </h3>
            {Object.keys(proteinasTotais).map((item) => {
              return (
                <h5 className="m-3" key={item}>
                  <strong>{`${item}: ${proteinasTotais[item]}`}</strong>
                </h5>
              );
            })}
          </div>
          <div className="container align-self-center p-3 mb-2 bg-light text-center w-50 ">
            <h3>
              <u>ACOMPANHAMENTOS DO DIA</u>
            </h3>
            {Object.keys(acompsTotais).map((key) => {
              return (
                <h5 className="m-3" key={key}>
                  <strong>{`${key}: ${acompsTotais[key]}`}</strong>
                </h5>
              );
            })}
          </div>
          <div className="container align-self-center p-3 mb-2 bg-light text-center">
            <button onClick={setPrintCards}>Imprime todos os cards</button>
          </div>
          <div className="d-flex align-content-stretch justify-content-center flex-wrap m-3 text-center">
            {data.map((item) => {
                let color;
                let font = 'text-white';

                if (item.turma == 'Year 1') {
                    color = 'bg-primary'
                }
                if (item.turma == 'Year 2') {
                    color = 'bg-secondary'
                }
                if (item.turma == 'Year 3') {
                    color = 'bg-success'
                }
                if (item.turma == 'Year 4') {
                    color = 'bg-danger'
                }
                if (item.turma == 'Year 5') {
                    color = 'bg-warning'
                }
                if (item.turma == 'Year 6') {
                    color = 'bg-info'
                }
                if (item.turma == 'Year 7') {
                    color = 'bg-light';
                    font = 'text-dark'
                }
                
              return (
                <>
                  <div
                    key={item._id}
                    className="card m-3 p-2"
                    style={{ maxWidth: "300px" }}
                    id="printArea">
                    <div className="card-body bg-light bg-gradient rounded-3 shadow">
                      <div className={`p-3 mb-2 ${color} ${font}`}>
                        <h5 className="card-title m-3">{item.estudante}</h5>
                        <h4 className="card-title m-3">
                          {`Turma: ${item.turma}`}
                        </h4>
                      </div>
                      <p className="card-text">{item.pratos.proteina}</p>
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
            })}
          </div>
        </>
      );
    }
    return (
      <>
        <div className="container align-self-center p-3 mb-2 bg-light text-center w-50 ">
          <h3>
            <u>PROTEÍNAS DO DIA</u>
          </h3>
          {Object.keys(proteinasTotais).map((item) => {
            return (
              <h5 className="m-3" key={item}>
                <strong>{`${item}: ${proteinasTotais[item]}`}</strong>
              </h5>
            );
          })}
        </div>
        <div className="container align-self-center p-3 mb-2 bg-light text-center w-50 ">
          <h3>
            <u>ACOMPANHAMENTOS DO DIA</u>
          </h3>
          {Object.keys(acompsTotais).map((key) => {
            return (
              <h5 className="m-3" key={key}>
                <strong>{`${key}: ${acompsTotais[key]}`}</strong>
              </h5>
            );
          })}
        </div>
        <div className="container align-self-center p-3 mb-2 bg-light text-center">
          <button onClick={setPrintCards}>Imprime todos os cards</button>
        </div>
        <div className="d-flex align-content-stretch justify-content-center flex-wrap m-3 text-center">
          {data.map((item) => {
            let color;
            let font = 'text-white';

            if (item.turma == 'Year 1') {
                color = 'bg-primary'
            }
            if (item.turma == 'Year 2') {
                color = 'bg-secondary'
            }
            if (item.turma == 'Year 3') {
                color = 'bg-success'
            }
            if (item.turma == 'Year 4') {
                color = 'bg-danger'
            }
            if (item.turma == 'Year 5') {
                color = 'bg-warning'
            }
            if (item.turma == 'Year 6') {
                color = 'bg-info'
            }
            if (item.turma == 'Year 7') {
                color = 'bg-light';
                font = 'text-dark'
            }
            return (
              <div
                key={item._id}
                className="card m-3 p-2"
                style={{ maxWidth: "300px" }}>
                <div className="card-body bg-light bg-gradient rounded-3 shadow">
                  <div className={`p-3 mb-2 ${color} ${font}`}>
                    <h5 className="card-title m-3">{item.estudante}</h5>
                    <h4 className="card-title m-3">{`Turma: ${item.turma}`}</h4>
                  </div>
                  <p className="card-text">{item.pratos.proteina}</p>
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
            );
          })}
        </div>
      </>
    );
  }

  return <Erro message="Não foram encontrados pedidos para esse dia." />;
}
