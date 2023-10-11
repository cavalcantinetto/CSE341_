import React from "react";
import { useState, useEffect, useRef } from "react";
import Loading from "../../components/loading";
import { useCookies } from "react-cookie";
import CardapioCard from "../cardscardapio";
import { convertDate } from "../../components/dataconverted";
import {
  ACOMPANHAMENTOS_URL,
  BASE_URL,
  CARDAPIO_URL,
  DELETE_URL,
  DELETE_URL_ACOMPANHAMENTOS,
  REGISTER_URL,
  REGISTRAACOMPANHAMENTOS_URL,
} from "../../functions/urlbase";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Erro from "../erro";
import fetcher from "../lib/fetcher";

export default function InsereCardapio() {
  const [cookies, setCookies] = useCookies();
  const [loader, setLoader] = useState(false);
  const [acompanhamento, setAcompanhamento] = useState([]);
  const [cardapioNaBase,setCardapioNaBase] = useState([])
  const [atualizarTela, setAtualizarTela] = useState(false);
  const acompanhamentos = useRef();
  const dataDoCardapio = useRef();
  const proteina1 = useRef();
  const proteina2 = useRef();
  const proteina3 = useRef();
  const proteina4 = useRef("Ovo frito, mexido ou cozido");
  const proteinas = [
    proteina1.current,
    proteina2.current,
    proteina3.current,
    proteina4.current,
  ];
  const navigate = useNavigate();
  function handleApagaCardapio() {
    proteina1.current = null;
    proteina2.current = null;
    proteina3.current = null;
    dataDoCardapio.current = null;
    setAcompanhamento([]);
    window.location.reload();
  }
  function handleApagaAcompanhamento(id) {
    const confirmaApaga = window.confirm("Tem certeza que quer apagar o acompanhamento?")
    if(confirmaApaga) {
      setLoader(oldValue => oldValue =!oldValue);
      console.log(BASE_URL+DELETE_URL_ACOMPANHAMENTOS+id)
      fetcher(BASE_URL+DELETE_URL_ACOMPANHAMENTOS+id, cookies, "DELETE").then((res) => {
        if(res.acompanhamento) {
          setLoader(oldValue => oldValue =!oldValue);
          alert('Acompanhamento apagado com sucesso')
          return window.location.reload()
        }
        console.log(res)
        setLoader(oldValue => oldValue =!oldValue);
        alert(`Houve um erro. Tente novamente mais tarde.\n${res.message}`)
        return window.location.reload()
      })

    }
    console.log('apagando...')
  }
  async function handleNovoAcompanhamento() {
    const novoAcompanhamentoPrompt = prompt(
      "Digite o nome do novo acompanhamento"
    );
    if (novoAcompanhamentoPrompt) {
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
          alert("Dados gravados om sucesso");
          window.location.reload();
        } else {
          const res = await acompanhamentos.json();
          alert(
            "Houve um problema e os dados não foram gravados.\nTente novamente mais tarde."
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function registrarCardapio() {
    if (
      dataDoCardapio == null ||
      proteinas == ["", "", ""] ||
      acompanhamento.length < 3 ||
      dataDoCardapio == "" ||
      proteinas[0] == "" ||
      proteinas[1] == "" ||
      acompanhamento == "" ||
      dataDoCardapio == undefined ||
      proteinas == undefined ||
      acompanhamento == undefined ||
      dataDoCardapio == " " ||
      acompanhamento == " "
    ) {
      alert(
        "Não foi possível submeter. A provável causa é a ausência de data, ausência de pelo menos 2 proteínas (1 e 2) ou você cadastrou menos de 3 acompanhamentos para o dia definido."
      );
      console.log("deu algum chabú");
      return;
    }
    setLoader((oldValue) => (oldValue = !oldValue));
    try {
      const data = {
        data: new Date(dataDoCardapio.current).toISOString(),
        proteinas: proteinas,
        acompanhamentos: acompanhamento,
      };
      console.log(data);
      const result = fetch(BASE_URL + REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          console.log(res);
          const message = res.json();
          setLoader((oldValue) => (oldValue = !oldValue));
          return alert(`algo deu errado: ${message}`);
        }
        handleApagaCardapio();
        setLoader((oldValue) => (oldValue = !oldValue));
        return alert("Cardapio enviado com sucesso!");
      });
    } catch (err) {
      alert(`algo deu errado: ${err}`);
      window.location.reload();
    }
  }
  async function confirmaDelete(data) {
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja apagar o cardápio do dia ${data}?`
    );
    if (confirmDeletion) {
      setLoader((oldValue) => oldValue = !oldValue);
      try {
        const result = await fetch(BASE_URL + DELETE_URL + new Date(data).toISOString(), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${cookies.accessToken}`,
          },
        });
        if (result.ok) {
          alert("Dia removido com sucesso!");
          setLoader((oldValue) => oldValue = !oldValue);
          window.location.reload();
        } else {
          alert(result.message);
          setLoader((oldValue) => oldValue = !oldValue);
        }
      } catch (err) {
        setLoader((oldValue) => oldValue = !oldValue);
      }
    } else {
      return;
    }
  };
  async function getData() {
      setLoader((oldValue) => oldValue = !oldValue);
      try {
        const result = await fetch(BASE_URL + CARDAPIO_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${cookies.accessToken}`,
          },
        });
        if (result.ok) {
          const res = result.json().then(res => {setCardapioNaBase(res.cardapio)}).then(setLoader((oldValue) => oldValue = !oldValue));
        } else {
          const res = await result.json();
          setLoader((oldValue) => oldValue = !oldValue);
          alert(res.message);

  
        }
      } catch {
        const res = await getData.json();
        setLoader((oldValue) => oldValue = !oldValue);
        alert(res.message);

  
      }
    }

  useEffect(() => {
    if (!cookies.userData) {
      return navigate("/");
    }
    if (cookies.userData.userLeve < 130) {
      return navigate("glakes/solicitaalmocofundamental");
    }
  });

  const { data, error, isLoading } = useSWR(
    BASE_URL + ACOMPANHAMENTOS_URL,
    (url) => fetcher(url, cookies)
  );
  if (error) {
    return <Erro />;
  }
  if (isLoading) {
    return <Loading />;
  }

  if (loader) {
    return <Loading />;
  }

  acompanhamentos.current = data;

  try {
    return (
      <div className="container text-center mb-3">
        <h1>Insira o menu diário no cardápio</h1>
        <h4>
          Instruções: escolha a data, em seguida digite as proteínas que estarão
          disponíveis nesse dia. <br />
          Finalize selecionando os acompanhamentos do dia e clicando em
          registrar.
        </h4>
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            id="floatingDate"
            onChange={(e) => {
              dataDoCardapio.current = e.target.value;
              setAtualizarTela((oldValue) => (oldValue = !oldValue));
            }}
            //value={date}
            required
          />
          <label htmlFor="floatingDate">Data</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingProteina1"
            onChange={(e) => {
              proteina1.current = e.target.value;
              setAtualizarTela((oldValue) => (oldValue = !oldValue));
            }}
            required
          />
          <label htmlFor="floatingProteina1">Proteína 1</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingProteina2"
            onChange={(e) => {
              proteina2.current = e.target.value;
              setAtualizarTela((oldValue) => (oldValue = !oldValue));
            }}
            required
          />
          <label htmlFor="floatingProteina1">Proteína 2</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingProteina3"
            onChange={(e) => {
              proteina3.current = e.target.value;
              setAtualizarTela((oldValue) => (oldValue = !oldValue));
            }}
            required
          />
          <label htmlFor="floatingProteina1">Proteína 3</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingProteina4"
            value={proteina4.current}
            onChange={(e) => {
              proteina4.current = e.target.value;
              setAtualizarTela((oldValue) => (oldValue = !oldValue));
            }}
          />
          <label htmlFor="floatingProteina1">Proteína 4</label>
        </div>
        <div>
          <h5>Acompanhamentos: </h5>
        </div>
        <div
          className="border border-success p-2 mb-2"
          role="group"
          aria-label="Basic checkbox toggle button group">
          {acompanhamentos.current.map((item) => {
            return (
              <>
                <input
                  type="checkbox"
                  className="btn-check"
                  id={item._id}
                  autoComplete="off"
                  value={item.acompanhamento}
                  onClick={(e) => {
                    if (e.target.checked) {
                      setAcompanhamento((oldValue) => {
                        if (!oldValue.includes(e.target.value)) {
                          return [...oldValue, e.target.value];
                        }
                        return [...oldValue];
                      });
                    } else {
                      setAcompanhamento((oldValue) => {
                        if (oldValue.includes(e.target.value)) {
                          oldValue.splice(oldValue.indexOf(e.target.value), 1);
                          return [...oldValue];
                        }
                        return [...oldValue];
                      });
                    }
                  }}
                />
                <label
                  className="btn btn-outline-primary m-2"
                  htmlFor={item._id}>
                  {item.acompanhamento}
                  <span className="badge bg-primary rounded-pill ms-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                      id={item._id}
                      onClick={(e)=> {handleApagaAcompanhamento(e.target.id)}}>
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </span>
                </label>
              </>
            );
          })}
          <button
            type="submit"
            className="btn btn-primary m-2"
            onClick={handleNovoAcompanhamento}>
            Novo acompanhamento
          </button>
        </div>
        <div className=" border border-success p-2 mb-2" role="group">
          <p>
            <strong>Data:</strong> {convertDate(dataDoCardapio.current)}
          </p>
          <p>
            <strong>Proteínas</strong>
          </p>
          <ul className="list-group">
            <li className="list-group-item">{proteina1.current}</li>
          </ul>
          <ul className="list-group">
            <li className="list-group-item">{proteina2.current}</li>
          </ul>
          <ul className="list-group">
            <li className="list-group-item">{proteina3.current}</li>
          </ul>
          <ul className="list-group">
            <li className="list-group-item">{proteina4.current}</li>
          </ul>
          <br />
          <p>
            <strong>Acompanhamentos</strong>
          </p>
          <ul className="list-group">
            {acompanhamento.map((item) => {
              return <li className="list-group-item">{item}</li>;
            })}
          </ul>
          <br />
          <div>
            <button
              type="button"
              className="btn btn-primary m-3"
              onClick={() => {
                handleApagaCardapio();
              }}>
              Apagar
            </button>
            <button
              type="button"
              className="btn btn-primary m-3"
              onClick={() => {
                registrarCardapio();
              }}>
              Registrar
            </button>
          </div>
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
          <div className="d-flex align-content-stretch justify-content-center flex-wrap m-3 text-center">
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
      </div>
    );
  } catch (err) {
    console.log(err);
    return <Erro />;
  }
}