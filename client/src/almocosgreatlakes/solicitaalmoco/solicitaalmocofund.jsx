import React, { useEffect, useRef, useState } from "react";
import DadosDaCrianca from "./selecionacrianca";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import RecuperaCardapiosCadastrados from "./recuperacardapios";
import EscolhaDeProteinas from "./escolhadeproteinas";
import EscolhaDeAcompanhamentos from "./escolhadeacompanhamentos";
import FinalizarEscolhas from "./finalizarescolhas";
import EscolhasJaRealizadas from "./escolhasjarealizadas";
import Erro from "../erro";

export default function SolicitaAlmocoFundamental() {

  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  //armazena os dados da criança (nome, turma e turno)
  const [estudante, setEstudante] = useState(null);
  //Armazena o cardapio para a data escolhida
  const [cardapio, setCardapio] = useState(null);
  //armazena a escolha da proteína pelo cliente
  const [proteina, setProteina] = useState();
  //armazena a escolha dos acompanhamentos
  const [acompanhamentosEscolhidos, setAcompanhamentosEscolhidos] = useState([]);
  //armazena as escolhas já realizadas pelo usuário para rerenderizar automaticamente.
  const [reloadTrigger, setReloadTrigger] = useState(0);

  //Se o usuário não estiver logado, ele não entra nessa rota.

  //função que vai para o seleciona criança e traz de volta os dados da criança.
  function handleClickKidData(value) {
    //recebe o dado do componente seleciona criança e popula a variável estudante.
    setEstudante(value);
  }
  //Recebe o dado do cardápio escolhido pelo cliente e retorna um objeto com os dados desse cardápio populando a variável cardapio.
  function handleClickCardapioData(value) {
    setCardapio(value);
    
  }

  //recebe e armazena a proteina escolhida pelo usuário.
  function handleClickEscolhaDaProteina(value) {
    setProteina(value);
  }
  // recebe e armazena o array de acompanhamentos
  function handleClickAcompanhamentos(value) {
    setAcompanhamentosEscolhidos(value);
  }

  //Essa funçao vai recarregar o relatório de escolhas sempre que uma nova escolha for submetida ou o usuário atualizar manualmente
  function reload() {
    setReloadTrigger(oldValue => oldValue = oldValue +1)
  }

  if(!estudante || !cardapio) {

  }

  //Serve apenas para redirecionar se não logado
  useEffect(() => {
    if (!cookies.accessToken) {
      return navigate("/");
    }
  }, []);
try{
  return (
    <>
      <DadosDaCrianca handleClick={handleClickKidData} />

      {estudante && (
        <RecuperaCardapiosCadastrados 
        handleClick={handleClickCardapioData}
        handleClickAcompanhamentos={handleClickAcompanhamentos}
        handleClickEscolhaDaProteina={handleClickEscolhaDaProteina}
        estudante={estudante}
        />
      )}
      {(estudante && cardapio) && (
        <EscolhaDeProteinas
          cardapio={cardapio}
          handleClickProteina={handleClickEscolhaDaProteina}
        />
      )}
      {(estudante && cardapio) && (
        <EscolhaDeAcompanhamentos
          cardapio={cardapio}
          handleClickAcompanhamentos={handleClickAcompanhamentos}
          acompanhamentos={acompanhamentosEscolhidos}

        />
      )}
      {(estudante && cardapio) && (
            <FinalizarEscolhas
            dados={estudante}
            proteina={proteina}
            acompanhamentos={acompanhamentosEscolhidos}
            cardapio={cardapio}
            responsavel={cookies.userData?.userName}
            vencimento={cookies.userData?.userVencimento}
            handleClickEscolhaDaProteina={handleClickEscolhaDaProteina}
            handleClickAcompanhamentos={handleClickAcompanhamentos}
            reloadFunction={reload}
    
          />
        )
      }
      {(estudante) && <EscolhasJaRealizadas estudante={estudante}
                  reloadFunction={reload}
                  reloadTrigger={reloadTrigger}
                   />}
    </>
  );
} catch(err) {
    console.log(err)
    return <Erro />
}
}
