import React from "react";
import { useCookies } from "react-cookie";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading";
import { BASE_URL, CONSULTA_COBRANCA } from "../functions/urlbase";
import { convertDate } from "../components/dataconverted";
import TabelaCobrancas from "./tabelaCobrancas";
import { useNavigate } from "react-router-dom";

const RelatorioCobranca = () => {
  var currentDate = new Date(),
    ano = currentDate.getFullYear(),
    mes = currentDate.getMonth();
  var firstDay = new Date(ano, mes, 1).toISOString();
  var lastDay = new Date(ano, mes + 1, 0).toISOString();

  //Lê os cookies para definir o usuário e o nível de acesso
  const [cookies, setCookies] = useCookies();
  //define o isLoading para bloquear a tela enquanto aguarda o fetch
  const [isLoading, setIsLoading] = useState(true);
  const dataInicialRef = useRef();
  const [dataInicial, setDataInicial] = useState(convertDate(firstDay));
  const dataFinalRef = useRef();
  const [dataFinal, setDataFinal] = useState(convertDate(lastDay));
  const [errMsg, setErrMsg] = useState();
  const [contratoMensal, setContratoMensal] = useState(true);
  const [gatilho, setGatilho] = useState(false);
  const [dadosDeCobranca, setDadosDeCobranca] = useState();
  const [verTipoDeContrato, setVerTipoDeContrato] = useState("Ver Mensais")
  const navigate = useNavigate();
  var userLevel;


  if (cookies.userData && cookies.userData.userLevel) {
    userLevel = cookies.userData.userLevel;
    };
  if (!cookies.userData || !cookies.accessToken || userLevel < 130) {
    navigate("/glakes/solicitaalmoco");
  }; 


  function verContrato() {
    if(contratoMensal) {
      setVerTipoDeContrato("Ver Diárias");
    } else {
      setVerTipoDeContrato("Ver Mensais")
    }
    
    setContratoMensal((oldValue) => (oldValue = !oldValue))
  }
  
  async function fetchDadosDeCobranca(dataIni, dataFim) {
    setIsLoading(true);
    const dados = {
      dataIni: new Date(dataIni).toISOString(),
      dataFim: new Date(dataFim).toISOString(),
    };

    try {
      const result = await fetch(BASE_URL + CONSULTA_COBRANCA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
        body: JSON.stringify(dados),
      });
      if (!result.ok) {
        setErrMsg(
          "Houve um erro ao processar a consulta. Verifique se preencheu corretamente as datas e tente novamente."
        );
      } else {
        const res = await result.json();
        setDadosDeCobranca(res);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchDadosDeCobranca(dataInicial, dataFinal);
  }, [gatilho]);


  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="container text-center">
          <p
            className={errMsg ? "p-3 mb-2 bg-danger text-white" : "d-none"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="floatingDate"
              ref={dataInicialRef}
              onChange={(e) => {
                setDataInicial(e.target.value);
                setErrMsg();
              }}
              value={dataInicial}
              required
            />
            <label htmlFor="floatingDate">Data Inicial</label>
          </div>
        </div>

        <div className="container text-center">
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="floatingDate"
              ref={dataFinalRef}
              onChange={(e) => {
                setDataFinal(e.target.value);
                setErrMsg();
              }}
              value={dataFinal}
              required
            />
            <label htmlFor="floatingDate">Data Final</label>
          </div>
          <div>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block m-3"
              onClick={() => setGatilho((oldValue) => (oldValue = !oldValue))}
            >
              Filtrar
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block m-3"
              onClick={verContrato}
            >{verTipoDeContrato}
            </button>
          </div>
          </div>
        </div>
        <br />
        <div className="container text-center">
          <TabelaCobrancas dados={dadosDeCobranca} tipoDeContrato={contratoMensal} />
        </div>
      </>
    );
  }
};

export default RelatorioCobranca;
