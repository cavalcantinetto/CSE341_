import React from "react";
import { useCookies } from "react-cookie";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading";
import ErrorFallback from "../components/handleerror";
import { convertDate } from "../components/dataconverted";
import { useNavigate } from "react-router-dom";
import { BASE_URL, CARDAPIO_URL, ESCOLHAS_URL, INSEREALMOCO } from "../functions/urlbase";


const SolicitaAlmoco = () => {
  //cookie traz os dados do cliente.
  const [cookies, useCookie] = useCookies();
  //estado transitório enquanto fetch a base de dados
  const [isLoading, setIsLoading] = useState(true);
  //estado transitório que indica falha
  const [failed, setFailed] = useState(false);
  //menssagem de erro quando indica erro no sistema
  const [errorMessage, setErrorMessage] = useState("");
  //variável que armazena os cardápios diários registrados no sistema - função deve filtrar para maior que hoje
  const [cardapios, setCardapios] = useState([]);
  //variável que armazena as escolhas do usuário
  const [optionsForTheDay, setOptionsForTheDay] = useState([]);
  //
  const [isOption, setIsOption] = useState(false);
  //Atualiza a variável data escolhida pelo usário sem re-renderizar a tela - avaliar a real necessidade dela
  const dateRef = useRef();
  //armazena o nome do estudante sem re-renderizar a tela
  const estudanteRef = useRef();
  //variável que habilita o botão de submeter as escolhas ao Banco de dados
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  //variável que armazena as escolhas passadas já realizadas
  const [escolhasNaBase, setEscolhasNaBase] = useState([]);
  //variável que indica se exite escolha na base (Não consegui ler o conteudo da variável anterior - potenciais problemas aqui)
  const [temEscolhas, setTemEscolhas] = useState(false);
  const navigate = useNavigate();

  //inicia o sistema lendo quais estudantes são dependentes do usuário principal - pai
  let estudantes;
  
  if(cookies.userData) {
    if (cookies.userData.userKids) {
      estudantes = cookies.userData.userKids;
    }
  } else {
    navigate ("/")
  }

  //parece que essa variável repete o dateRef, avaliar
  const [date, setDate] = useState();
  //não sei diferença entre data escolhida e dateRef e date. avaliar
  const [dataEscolhida, setDataEscolhida] = useState();

  //armazena o estudante escolhido num estado para reler o BD e trazer as escolhas anteriores
  const [estudante, setEstudante] = useState();
  const [turma, setTurma] = useState();
  
  //Aramzena os acompanhamentos escolhidos pelo pai
  const [acompanhamentos, setAcompanhamentos] = useState([]);

  //Armazena a proteína escolhida pelo pai
  const [proteinSelection, setProteinSelection] = useState();

  //define o dia de hoje - vai servir para filtrar as escolhas já realizadas. Só para frente.
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1)
  tomorrow = tomorrow.toISOString().toString();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString().toString();



  //Grupo que definirá todas as funções fetch
  //async function to fetch data from database
  async function fetchCard() {
    try {
      //Vai na base e traz os cardápios já cadastrados na base.
      const result = await fetch(BASE_URL + CARDAPIO_URL, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
      });
      if (result.ok) {
        let res = await result.json();
        if (res) {
          //tendo resultado alimenta a variável cardápios
          setCardapios(res);
          //define o isloading to false para renderizar novamente a tela - isso deveria ficar fora daqui
          setIsLoading(false);
          //O estudante já estava no ref, pq definir ele outra vez? manter retirado até mais testes acontecerem
          //setEstudante(estudanteRef.current.value);
          return res;
        }
        return res;
      }
    } catch (err) {
      //Define a mensagem de falha e encerra a chamada
      setFailed(true);
      setErrorMessage(err.message);
      setIsLoading(true);
    }
  }

  async function fetchEscolhas() {
    try {
      //Acessa a base de escolhas já realizadas pelo pai para a criança específica - usa a variável nome hoje que pode gerar problemas futuros. Melhor seria ter algum numero de referência para elas.
      const result = await fetch(BASE_URL + ESCOLHAS_URL + estudante, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
      });

      if (result.ok) {

        const res = await result.json();
        if (res) {
          //Em caso de escolhas existentes, set na variável escolhas na base que vai ser chamada para produzir os cards de escolhas.
          //Aqui eu poderia trabalhar o filtro de datas e fazer a chamada já com filtro de data, mas preferi filtrar ao renderizar.
          setEscolhasNaBase((oldValue) => (oldValue = res));
          return res;

        }
        return res;
      }
    } catch (err) {
      setFailed(true);
      setErrorMessage(err.message);
      setIsLoading(true);
    }
  }

  async function submitAlmoco(dateId, date, turma, proteina, acompanhamentos) {
    setIsLoading(true);
    try {
      //define o objeto que vai carregar o array de escolhas para registro na base de dados
      const data = {
        data: new Date(date),
        dataId: dateId,
        estudante: estudante,
        turma: turma,
        proteina: proteina,
        acompanhamentos: acompanhamentos,
      };
      //Com o objeto definido, envia para o BD para fazer o registro das escolhas, lá vamos verificar se o dataID já existe.
      const result = await fetch(BASE_URL + INSEREALMOCO, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${cookies.accessToken}`,
        },
        body: JSON.stringify(data),
      });
      if (result.ok) {
        const res = await result.json();
        if (res) {
          let message = `Foram gravadas com sucesso as seguinte escolhas:\nData: ${date}\nProteína: ${proteinSelection}\nAcompanhamentos: ${[
            acompanhamentos,
          ]}\nPara: ${estudante}\nClique em "Atualizar Relatório" abaixo para visualizar as escolhas já realizadas.`;
          setAcompanhamentos((oldValue) => (oldValue = []));
          setIsLoading(false);
          //
          return message;
        } else {
          setIsLoading(false);
          setErrorMessage(
            "Estamos profundamente envergonhados, mas parece que algo deu errado.\nTente novamente mais tarde."
          );
          setProteinSelection();
          setAcompanhamentos([]);
          setIsLoading(false);
          setFailed(true);
          return "Estamos profundamente envergonhados, mas parece que algo deu errado.\nTente novamente mais tarde.";
        }
      } else {
        const res = await result.json();
        setIsLoading(false);
        setErrorMessage(
          `Estamos profundamente envergonhados, \nParece que algo deu errado no servidor.\nTente novamente mais tarde.\nCódigo de erro: ${res.message}`
        );
        setProteinSelection();
        setAcompanhamentos([]);
        setFailed(true);
        return `Estamos profundamente envergonhados, \nParece que algo deu errado no servidor.\nTente novamente mais tarde.\nCódigo de erro: ${res.message}`;
      }
    } catch (err) {
      setErrorMessage(err.message);
      setFailed(true);
      setProteinSelection();
      setAcompanhamentos([]);
    }
  }

  function handleSelectionClick(e) {
    setIsLoading(true);
    let options = cardapios.filter((val) => val._id === e.target.value);
    setDataEscolhida(e.target[e.target.selectedIndex].value);
    setDate(e.target[e.target.selectedIndex].text);
    // setEstudante(estudanteRef.current.value);

    if (e.target[e.target.selectedIndex].value === "none") {
      setIsOption(false);
      setAcompanhamentos((oldValue) => []);
      setProteinSelection((oldValue) => null);
      setIsLoading(false);
    } else {
      setAcompanhamentos((oldValue) => []);
      setProteinSelection((oldValue) => null);
      setOptionsForTheDay([options[0].proteinas, options[0].acompanhamentos]);
      setIsOption(true);
    }
  }

  //falta checar se o dia já havia sido submetido usando o ID do dia
  async function handleSubmit(e) {
    setIsLoading(true);

    const turma =(estudantes.filter(item => item.nome == estudante)[0].turma)
    if(!turma) {
      return
    } else {
      setAbleToSubmit(false);
    const response = await submitAlmoco(
      dataEscolhida,
      convertDate(date),
      turma,
      proteinSelection,
      acompanhamentos
    );
    setTemEscolhas(false);
    return response;
    }
    
  }

  useEffect(() => {
    try {
      fetchCard();
      //fetchEscolhas();
    } catch (err) {
      setErrorMessage(err.message);
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    if (estudanteRef.current) {
      setEstudante(estudanteRef.current.value);
      
    }
    if (estudante) {
      fetchEscolhas();
    }
    setDataEscolhida(dataEscolhida);

    if (date && dataEscolhida && estudante && acompanhamentos.length > 0) {
      setAbleToSubmit(true);
    } else {
      setAbleToSubmit(false);
    }
    setIsLoading(false);
  }, [
    optionsForTheDay,
    proteinSelection,
    acompanhamentos,
    dataEscolhida,
    estudante,
    temEscolhas,
  ]);

  if(!cookies.accessToken) {
    return navigate('/')
  }
  return (
    <>
      <div>
        {failed && (
          <div className="container text-center mb-3">
            <ErrorFallback error={errorMessage} />
          </div>
        )}
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="container text-center">
            <div className="m-3">
              <label htmlFor="estudantRef" className="form-label m-3">
                Nome da criança:
              </label>
              <select
                name="estudanteRef"
                id={estudanteRef}
                ref={estudanteRef}
                value={estudante}
                onChange={(e) => {
                  setEstudante(e.target[e.target.selectedIndex].value);

                }}
              >
                {estudantes.map((item) => {
                  if(item.turma == 'Year 1' || item.turma == 'Year 2' || item.turma == 'Year 3' || item.turma == 'Year 4' || item.turma == 'Year 5' || item.turma == 'Year 6' || item.turma == 'Year 7' || item.turma == 'Staff') {
                    return (
                      <option id={item.turma} key={estudanteRef} value={item.nome}>
                        {item.nome}
                      </option>
                    );
                  } return null
                })}
              </select>
            </div>
            <div className="card-body bg-light bg-gradient rounded-3 shadow">
              <div className="m-3">
                <label htmlFor="dateRef" className="form-label m-3">
                  Data (aaaa-mm-dd):{}
                </label>
                <select
                  name="dateRef"
                  id="dateRef"
                  ref={dateRef}
                  defaultValue={"item._id"}
                  onChange={(e) => {
                    handleSelectionClick(e);
                  }}
                >
                  <option key={"selecioneUmaData0"} value={"none"}>
                    Selecione uma data
                  </option>
                  
                  {cardapios.map((item) => {
<<<<<<< HEAD
           
                    if (item.data > today) {
                      if (item._id === dataEscolhida) {
                        //esse if statment é para definir o defaultValue (o que garante que a tela mostre a data escolhida pelo usuário)
                        return (
                          <option
                            key={`option+${item._id}`}
                            name={item.data}
                            value={"item._id"}
                          >
                            {convertDate(item.data)}
                          </option>
                        );
=======
                    if((cookies?.userData?.userLevel) && (cookies?.userData?.userLevel)>100) {
                        if (item.data >= today) {
                          if (item._id === dataEscolhida) {
                            //esse if statment é para definir o defaultValue (o que garante que a tela mostre a data escolhida pelo usuário)
                            return (
                              <option
                                key={`option+${item._id}`}
                                name={item.data}
                                value={"item._id"}
                              >
                                {convertDate(item.data)}
                              </option>
                            );
                          } else {
                            return (
                              <option key={`option+${item._id}`} value={item._id}>
                                {convertDate(item.data)}
                              </option>
                            );
                          }
                        }

>>>>>>> greatLakesTotalCleaned
                      } else {
                        if (item.data > today) {
                          if (item._id === dataEscolhida) {
                            //esse if statment é para definir o defaultValue (o que garante que a tela mostre a data escolhida pelo usuário)
                            return (
                              <option
                                key={`option+${item._id}`}
                                name={item.data}
                                value={"item._id"}
                              >
                                {convertDate(item.data)}
                              </option>
                            );
                          } else {
                            return (
                              <option key={`option+${item._id}`} value={item._id}>
                                {convertDate(item.data)}
                              </option>
                            );
                          }
                        }

                      }
                  })}
                </select>
                <br />
                <span>
                  <small>
                    Instruções: O sistema sobrescreverá escolhas já realizadas,
                    caso você escolha uma data já cadastrada.
                  </small>
                </span>
              </div>

              <div
                className="container rounded-3 shadow p-2 mb-2"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <label htmlFor="selectproteina" className="form-label m-3">
                  Escolha uma proteína:{" "}
                </label>
                {!isOption && (
                  <select id="selectproteina" disabled>
                    <option key={"escolhaUmaData1"}>Escolha uma data</option>
                  </select>
                )}
                {isOption && (
                  <div className="d-flex justify-content-center flex-column  ">
                    {optionsForTheDay[0].map((item) => {
                      return (
                        <>
                          <input
                            type="radio"
                            className="btn-check"
                            name="options"
                            id={item}
                            autoComplete="off"
                            value={item}
                            key={item}
                            onClick={(e) => {
                              // e.preventDefault();
                              if (e.target.checked) {
                                setProteinSelection(e.target.value);
                              }
                            }}
                          />
                          <label
                            className="btn btn-outline-primary m-2 w-50 align-self-center"
                            htmlFor={item}
                          >
                            {item}
                          </label>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>

              <div
                className="container p-2 mb-2"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <label
                  htmlFor="selectacompanhamento"
                  className="form-label m-3"
                >
                  Escolha até três acompanhamentos:{" "}
                </label>
                {!isOption && (
                  <select id="selectacompanhamento" disabled>
                    <option key={"escolhaUmaData2"}>Escolha uma data</option>
                  </select>
                )}
                {isOption && (
                  <div className="d-flex align-items-center justify-content-center flex-wrap">
                    {optionsForTheDay[1].map((item) => {
                      return (
                        <>
                          <input
                            type="checkbox"
                            className="btn-check"
                            id={item}
                            autoComplete="off"
                            value={item}
                            onClick={(e) => {
                              // e.preventDefault();
                              if (e.target.checked) {
                                setAcompanhamentos((oldValue) => {
                                  if (oldValue.length >= 3) {
                                    e.target.checked = false;
                                    return [...oldValue];
                                  }
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
                            className="btn btn-outline-primary m-2 w-50 align-self-cente"
                            htmlFor={item}
                          >
                            {item}
                          </label>
                        </>
                      );
                    })}
                  </div>
                )}
                <br />
              </div>
            </div>
          </div>
        )}
        {ableToSubmit && (
          <div className="container text-center">
            <div>
              <button
                type="button"
                className="btn btn-primary m-3"
                onClick={() => {
                  handleSubmit().then((data) => alert(data));
                }}
              >
                Finalizar
              </button>
            </div>
          </div>
        )}
        {!ableToSubmit && (
          <div className="container text-center">
            <div>
              <button type="button" className="btn btn-primary m-3" disabled>
                Finalizar
              </button>
            </div>
          </div>
        )}
        {
          <div className="container text-center">
            <hr />
            <div className="container text-center">
              <h1>Relatório de escolhas já realizadas</h1>
              <small>Para ver as escolhas já realizadas, clique em Atualizar relatório.</small><br/>
              <button
                type="button"
                className="btn btn-primary m-3"
                onClick={() => {
                  setTemEscolhas((oldValue) => (oldValue = true));
                }}
              >
                Atualizar Relatório
              </button>
              {temEscolhas && (
                <div className="d-flex align-content-stretch flex-wrap m-3 text-center">
                  {escolhasNaBase.map((item) => {
                    if (item.data >= today) {
                      return (
                        <>
                          <div key={item.id} className="card m-3 p-2">
                            <div className="card-body bg-light bg-gradient rounded-3 shadow">
                              <h5 className="card-title">
                                {convertDate(item.data)}
                              </h5>
                              <p
                                key={item._id + item.pratos.proteina}
                                className="card-text"
                              >
                                {item.pratos.proteina}
                              </p>
                              <hr></hr>
                              {item.pratos.acompanhamentos.map((acomp) => {
                                return (
                                  <p
                                    key={item._id + acomp}
                                    className="card-text"
                                  >
                                    {acomp}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              )}
            </div>{" "}
          </div>
        }
      </div>
    </>
  );
};

export default SolicitaAlmoco;
