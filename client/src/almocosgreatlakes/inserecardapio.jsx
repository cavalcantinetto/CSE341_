import React from "react";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading";
import { useCookies } from "react-cookie";
import CardapioCard from "./cardscardapio";
import { convertDate } from "../components/dataconverted";
import { ACOMPANHAMENTOS_URL, BASE_URL, CARDAPIO_URL, DELETE_URL, REGISTER_URL, REGISTRAACOMPANHAMENTOS_URL } from "../functions/urlbase";
import SolicitaAlmoco from "./solicitaalmoco";
import PedidosDoDia from "./pedidosdodia";
import { useNavigate } from "react-router-dom";


const InsereCardapio = (props) => {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState();
  let [cookies, useCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const dateRef = useRef();
  const [date, setDate] = useState("");
  const proteina1Ref = useRef();
  const [proteina1, setProteina1] = useState();
  const proteina2Ref = useRef();
  const [proteina2, setProteina2] = useState();
  const proteina3Ref = useRef();
  const [proteina3, setProteina3] = useState();
  const novoAcompanhamentoRef = useRef();
  const [novoAcompanhamento, setNovoAcompanhamento] = useState();
  const [acompanhamentos, setAcompanhamentos] = useState([]);
  const [acompanhamentosNaBase, setAcompanhamentosNaBase] = useState([]);
  const [cardapioNaBase, setCardapioNaBase] = useState([]);
  const proteinas = [proteina1, proteina2, proteina3];
  const dateConverted = convertDate(date);
  const navigate = useNavigate();
  let userLevel;


  if(cookies.userData) {
    if(cookies.userData.userLevel) {
      userLevel = (cookies.userData.userLevel)
    }
  }
  if(!cookies.userData) {
    navigate('/');
  }
 

  
  const data = {
    data: new Date(dateConverted),
    proteinas: proteinas,
    acompanhamentos: acompanhamentos,
  };

  async function handleNovoAcompanhamento() {
    const novoAcompanhamentoPrompt = prompt(
      "Digite o nome do novo acompanhamento"
    );
    setLoading((oldValue) => !oldValue);

    if (novoAcompanhamentoPrompt) {
      setNovoAcompanhamento(novoAcompanhamentoPrompt);
      const data = {
        acompanhamento: novoAcompanhamentoPrompt,
      };
      try {
        const acompanhamentos = await fetch(
          BASE_URL + REGISTRAACOMPANHAMENTOS_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer  ${cookies.accessToken}`,
            },
            body: JSON.stringify(data),
          }
        );
        if (acompanhamentos.ok) {
          setLoading((oldValue) => !oldValue);
          alert("Dados gravados om sucesso");
          window.location.reload()
        } else {
          const res = await acompanhamentos.json();
          setLoading((oldValue) => !oldValue);
          setErrMsg(res.message);
        }
      } catch {
        const res = await getData.json();
        setLoading((oldValue) => !oldValue);
        setErrMsg(res.message);
      }
    }
  }

  async function sendData() {
    setLoading((oldValue) => !oldValue);
    // if(data.data == null || data.proteinas == ['', '', ''] || data.acompanhamentos.length < 3 || data.data == "" || data.proteinas[1] == "" || data.acompanhamentos == "" || data.data == undefined || data.proteinas == undefined || data.acompanhamentos == undefined || data.data == " " || data.proteinas[0] == '' || data.acompanhamentos == " ") {
    //   setLoading((oldValue) => !oldValue);
    //   console.log('entrou aqui', data.data.getTime(), data.proteinas[0], data.proteinas[1], data.acompanhamentos.length)
    //   alert("Não foi possível submeter. A provável causa é a ausência de data, ausência de pelo menos 2 proteínas (1 e 2) ou você cadastrou menos de 3 acompanhamentos para o dia definido.");
    //   return;
    // }

    if(!data.data || data.data ==null || data.data == undefined || isNaN(data.data.getTime())) {
      setLoading((oldValue) => !oldValue);
      console.log(data.data);
      return alert("Não foi possível submeter. A data é inválida");
    }
    if(data.proteinas == ['', '', ''] || data.proteinas[0] == ""  || data.proteinas[1] == ""  || data.proteinas[2] == "" || data.proteinas[0] == undefined  || data.proteinas[1] == undefined || data.proteinas[2] == undefined) {
      setLoading((oldValue) => !oldValue);
      console.log(data.proteinas);
      return alert("Não foi possível submeter. A proteína 1, 2 ou 3 está em branco ou é invalida");
    }
    if(data.acompanhamentos.length < 3) {
      setLoading((oldValue) => !oldValue);
      console.log(data.acompanhamentos);
      return alert("Não foi possível submeter. Você deve ter cadastrado menos de 3 acompanhamentos.");
    }

    try {
      setErrMsg();
      const result = await fetch(BASE_URL + REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (result.ok) {
        const response = await result.json();
        setAcompanhamentos([]);
        alert(`Você registrou com sucesso um novo cardápio para a data: ${convertDate(
          response.data
        )}\n
                Clique sobre Atualizar Cardápio para viasualizar a nova submissão.`);
        setLoading((oldValue) => !oldValue);
        return;
      } else {
        setLoading((oldValue) => !oldValue);
        alert(result.message);
        return;
      }
    } catch (err) {
      setLoading((oldValue) => !oldValue);
      setErrMsg();
      setProteina1(oldValue => oldValue = "")
      setProteina2(oldValue => oldValue = "")
      setProteina3(oldValue => oldValue = "")
      return;
    }
  }

  const getData = async () => {
    setLoading((oldValue) => !oldValue);
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
      } else {
        const res = await result.json();
        setErrMsg(res.message);
     
      }
    } catch {
      const res = await getData.json();
      setErrMsg(res.message);

    }

    try {
      const acompanhamentos = await fetch(BASE_URL + ACOMPANHAMENTOS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
      });
      if (acompanhamentos.ok) {
        const res = await acompanhamentos.json();
        setAcompanhamentosNaBase(res);

      } else {
        const res = await acompanhamentos.json();
        setErrMsg(res.message);
      }
    } catch {
      const res = await getData.json();
      setErrMsg(res.message);
    }
    setLoading((oldValue) => !oldValue);
  };

  const confirmaDelete = async (data) => {
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja apagar o cardápio do dia ${convertDate(data)}?`
    );
    if (confirmDeletion) {
      setLoading((oldValue) => !oldValue);

      try {
        const result = await fetch(BASE_URL + DELETE_URL + data, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${cookies.accessToken}`,
          },
        });
        if (result.ok) {
          alert("Dia removido com sucesso!");
          setLoading((oldValue) => !oldValue);
        } else {
          alert(result.message);
          setLoading((oldValue) => !oldValue);
        }
      } catch (err) {
        setLoading((oldValue) => !oldValue);
      }
    } else {

      return;
    }
  };

  useEffect(() => {
    let isCancalled = false;
    if (!isCancalled) {
      getData();

    }
    return () => {
      isCancalled = true;
    };
  }, []);

  if(!cookies.accessToken) {
    return navigate('/');
  }

  if (userLevel == 110) {
    return <PedidosDoDia/>
  }
  if (userLevel < 110) {
    return <SolicitaAlmoco/>
  }
  

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="container text-center ">
          <h1>Insira o menu diário no cardápio</h1>
          <h4>
            Instruções: escolha a data, em seguida digite as proteínas que
            estarão disponíveis nesse dia. Finalize selecionando os
            acompanhamentos do dia e clicando em registrar.
          </h4>
          <p
            ref={errRef}
            className={errMsg ? "p-3 mb-2 bg-danger text-white" : "d-none"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form method="POST">
            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="floatingDate"
                ref={dateRef}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrMsg();
                }}
                value={date}
                required
              />
              <label htmlFor="floatingDate">Data</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingProteina1"
                ref={proteina1Ref}
                onChange={(e) => {
                  setProteina1(e.target.value);
                }}
                value={proteina1}
                required
              />
              <label htmlFor="floatingProteina1">Proteína 1</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingProteina2"
                ref={proteina2Ref}
                onChange={(e) => {
                  setProteina2(e.target.value);
                }}
                value={proteina2}
                required
              />
              <label htmlFor="floatingProteina2">Proteína 2</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingProteina3"
                ref={proteina3Ref}
                onChange={(e) => {
                  setProteina3(e.target.value);
                }}
                value={proteina3}
                required
              />
              <label htmlFor="floatingProteina3">Proteína 3</label>
            </div>
            <div>
              <h5>Acompanhamentos: </h5>
            </div>
            <div
              className="container border border-success p-2 mb-2"
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              {acompanhamentosNaBase.map((item) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={item._id}
                      autoComplete="off"
                      value={item.acompanhamento}
                      onClick={(e) => {
                        // e.preventDefault();
                        if (e.target.checked) {
                          setAcompanhamentos((oldValue) => {
                            if (!oldValue.includes(e.target.value)) {
                              return [...oldValue, e.target.value];
                            }
                            return [...oldValue];
                          });
                        } else {
                          setAcompanhamentos((oldValue) => {
                            if (oldValue.includes(e.target.value)) {
                              oldValue.splice(
                                oldValue.indexOf(e.target.value),
                                1
                              );
                              return [...oldValue];
                            }
                            return [...oldValue];
                          });
                        }
                      }}
                    />
                    <label
                      className="btn btn-outline-primary m-2"
                      htmlFor={item._id}
                    >
                      {item.acompanhamento}{" "}
                    </label>
                  </>
                );
              })}

              <button
                type="submit"
                className="btn btn-primary m-2"
                onClick={handleNovoAcompanhamento}
              >
                Novo acompanhamento
              </button>
            </div>

            <br />
            <button
              type="button"
              className="btn btn-primary m-3"
              onClick={sendData}
            >
              Registrar
            </button>
          </form>
        </div>

        <hr />
        <div className="container text-center">
          <h1>Tabela de dias do cardápio</h1>

          <button
            type="button"
            className="btn btn-primary m-3"
            onClick={getData}
          >
            Atualizar Cardapio
          </button>
          <div className="d-flex align-content-stretch flex-wrap m-3 text-center">
            {cardapioNaBase.map((item) => {
              return (
                <CardapioCard
                  id={item._id}
                  data={item.data}
                  proteina={item.proteinas}
                  acompanhamento={item.acompanhamentos}
                  confirmaDelete={confirmaDelete}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default InsereCardapio;
