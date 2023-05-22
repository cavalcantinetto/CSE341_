import React from "react";
import { useCookies } from "react-cookie";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading";
import ErrorFallback from "../components/handleerror";
import { convertDate } from "../components/dataconverted";
import { useNavigate } from "react-router-dom";
import { BASE_URL, CARDAPIO_URL, DELETE_URL_ESCOLHAS, ESCOLHAS_URL, INSEREALMOCO } from "../functions/urlbase";


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
    if (cookies.userData.userLevel == 101) {
      estudantes = [{'nome': 'Ailin Versiani Scott Rivadeneyra', 'turma': 'Year 1'}, {'nome': 'Alice Assis Cyrillo Galvão Nunes', 'turma': 'Year 3'}, {'nome': 'Alice Postal Farias Zandonadi', 'turma': 'Year 1'}, {'nome': 'Alice Taques Gomes Correa', 'turma': 'Year 4'}, {'nome': 'Alicia Damasceno Tolentino', 'turma': 'Year 6'}, {'nome': 'Ana Laura Belone Narazaki', 'turma': 'Year 6'}, {'nome': 'Ana Sofia Tan Viotti', 'turma': 'Year 2'}, {'nome': 'Angelina Borges Marção', 'turma': 'Year 6'}, {'nome': 'Arthur Mendes Botelho', 'turma': 'Year 6'}, {'nome': 'Arthur Teixeira Monteiro', 'turma': 'Year 5'}, {'nome': 'Artur Oliveira Antunes', 'turma': 'Year 5'}, {'nome': 'Augusto Hirokazu Yamada', 'turma': 'Year 1'}, {'nome': 'Aurora Pereira Amaro', 'turma': 'Year 4'}, {'nome': 'Ayla Martins de Oliveira', 'turma': 'Year 3'}, {'nome': 'Beatriz Damasceno Tolentino', 'turma': 'Year 3'}, {'nome': 'Benicio Flores de Souza Barichello', 'turma': 'Year 2'}, {'nome': 'Benjamin de Oliveira Godoy de Camargo', 'turma': 'Year 2'}, {'nome': 'Bento Beltrão Loducca', 'turma': 'Year 2'}, {'nome': 'Bernardo Nardy Alves', 'turma': 'Year 1'}, {'nome': 'Caio Mariano Simões', 'turma': 'Year 4'}, {'nome': 'Carolina Solera Camacho', 'turma': 'Year 4'}, {'nome': 'Catarina Manetti', 'turma': 'Year 4'}, {'nome': 'Clara Ogata Perrenoud', 'turma': 'Year 2'}, {'nome': 'Daniel March Garcia Castro', 'turma': 'Year 5'}, {'nome': 'Daniel Murao Gentil Leite', 'turma': 'Year 2'}, {'nome': 'Dante Davanzo de Alcântara Oliveira', 'turma': 'Year 5'}, {'nome': 'Davi de Castro Camargo', 'turma': 'Year 3'}, {'nome': 'Davi Gomes Ravagnani Vargas', 'turma': 'Year 7'}, {'nome': 'Davi Lucchiari Ribeiro', 'turma': 'Year 1'}, {'nome': 'Diego Alexandrino de Oliveira', 'turma': 'Year 5'}, {'nome': 'Eduardo Siqueira Cavalcanti', 'turma': 'Year 5'}, {'nome': 'Elena Yoko Cortez Shimoda', 'turma': 'Year 2'}, {'nome': 'Elisa Cavalcanti Girardi Vieira', 'turma': 'Year 4'}, {'nome': 'Emanuelah Cunha Fernandes', 'turma': 'Year 6'}, {'nome': 'Enzo de Almeida Pedroso Guirado', 'turma': 'Year 1'}, {'nome': 'Enzo Mariano Simões', 'turma': 'Year 5'}, {'nome': 'Estevan Benites', 'turma': 'Year 3'}, {'nome': 'Eva da Mata Sella', 'turma': 'Year 3'}, {'nome': 'Felipe Oliveira Miranda', 'turma': 'Year 2'}, {'nome': 'Felipe Rocha de Brito', 'turma': 'Year 6'}, {'nome': 'Felipe Waki de borba', 'turma': 'Year 3'}, {'nome': 'Fernando de Carvalho Coelho Junior', 'turma': 'Year 4'}, {'nome': 'Filipe Britta Veroneze', 'turma': 'Year 3'}, {'nome': 'Gabriel Bonifácio Borges', 'turma': 'Year 5'}, {'nome': 'Gabriel Mendes Simões Pereira', 'turma': 'Year 5'}, {'nome': 'Giovana Oliveira Peixoto', 'turma': 'Year 4'}, {'nome': 'Guilherme Cappeletti Reis', 'turma': 'Year 7'}, {'nome': 'Gustavo Gonçalves Guimarães Severo', 'turma': 'Year 3'}, {'nome': 'Helena Chamoun Marchon Dupas Ribeiro', 'turma': 'Year 2'}, {'nome': 'Helena Rodrigues dos Santos', 'turma': 'Year 4'}, {'nome': 'Heloísa Lopes Nogueira', 'turma': 'Year 1'}, {'nome': 'Henrique Hayao Furuno Resende', 'turma': 'Year 1'}, {'nome': 'Isabella Sayuri de Melo Haiachi', 'turma': 'Year 5'}, {'nome': 'Isadora do Val Pavan', 'turma': 'Year 5'}, {'nome': 'Jhonny Rocha da Silva Pereira', 'turma': 'Year 3'}, {'nome': 'João Alcantara da Paz', 'turma': 'Year 2'}, {'nome': 'João Felipe Quental Barbosa', 'turma': 'Year 3'}, {'nome': 'João Otávio Domingos Camargo Franco', 'turma': 'Year 1'}, {'nome': 'Joaquim Otto Soldi Taube', 'turma': 'Year 3'}, {'nome': 'Júlia Hidalgo Oliveira Melo', 'turma': 'Year 4'}, {'nome': 'Lara Lauria Mafetano', 'turma': 'Year 3'}, {'nome': 'Lara Rezende do Nascimento', 'turma': 'Year 2'}, {'nome': 'Larissa de Castro Soares Bernardo', 'turma': 'Year 6'}, {'nome': 'Larissa França Dias', 'turma': 'Year 2'}, {'nome': 'Laura Costa Marques', 'turma': 'Year 1'}, {'nome': 'Lauren Costa de Souza', 'turma': 'Year 1'}, {'nome': 'Lavínia Santos Vasconcellos Muniz', 'turma': 'Year 4'}, {'nome': 'Layla Guerreiro Mrad', 'turma': 'Year 1'}, {'nome': 'Leonardo Teixeira Monteiro', 'turma': 'Year 5'}, {'nome': 'Letícia Pereira Mendes', 'turma': 'Year 6'}, {'nome': 'Lis Emmerick Vieira', 'turma': 'Year 1'}, {'nome': 'Lis Ogata Perrenoud', 'turma': 'Year 5'}, {'nome': 'Lorena Canavezi Moura', 'turma': 'Year 1'}, {'nome': 'Lorenzo Destro Fernandes', 'turma': 'Year 3'}, {'nome': 'Lorenzo Dias Novelletto', 'turma': 'Year 2'}, {'nome': 'Luana Rodrigues Dias Belieny', 'turma': 'Year 6'}, {'nome': 'Luca Destre Redigolo', 'turma': 'Year 3'}, {'nome': 'Lucas Alves Cursino de Moura Dall\'ara', 'turma': 'Year 2'}, {'nome': 'Lucas Biaso Montenegro Félix ahmed', 'turma': 'Year 6'}, {'nome': 'Lucas Machado Antonino', 'turma': 'Year 2'}, {'nome': 'Lucas Pierri Silvestre', 'turma': 'Year 1'}, {'nome': 'Luisa Bueno Moreira', 'turma': 'Year 5'}, {'nome': 'Luísa Indiani Ferreira Pinto', 'turma': 'Year 2'}, {'nome': 'Luisa Moscardini Figueira', 'turma': 'Year 3'}, {'nome': 'Luiz Gustavo Cotrim Valério', 'turma': 'Year 5'}, {'nome': 'Luiz Gustavo Jenner da Silva', 'turma': 'Year 2'}, {'nome': 'Luiz Octavio Monteiro Pereira', 'turma': 'Year 4'}, {'nome': 'Luiza de Bona Gauch', 'turma': 'Year 2'}, {'nome': 'Luiza dos Santos Cruz', 'turma': 'Year 2'}, {'nome': 'Luiza Rocha de Brito', 'turma': 'Year 1'}, {'nome': 'Luma Hermans', 'turma': 'Year 3'}, {'nome': 'Maitê Destro Fernandes', 'turma': 'Year 1'}, {'nome': 'Maitê Heliotropio de Matos Guimarães', 'turma': 'Year 4'}, {'nome': 'Malu Ribeiro Penaranda', 'turma': 'Year 3'}, {'nome': 'Manuela dos Santos Fontes', 'turma': 'Year 3'}, {'nome': 'Manuela Ferreira Veltri Rodrigues', 'turma': 'Year 7'}, {'nome': 'Manuela Milani', 'turma': 'Year 5'}, {'nome': 'Manuela Pessoa Campos Rodrigues', 'turma': 'Year 2'}, {'nome': 'Marcela Campello Macedo', 'turma': 'Year 7'}, {'nome': 'Marcella Filippi', 'turma': 'Year 1'}, {'nome': 'Marcelo Pimenta Pioli', 'turma': 'Year 4'}, {'nome': 'Maria Alice Quizzeppi de Almeida Carneiro', 'turma': 'Year 6'}, {'nome': 'Maria Carolina Freitas Villaça', 'turma': 'Year 2'}, {'nome': 'Maria Clara Bortoleto Higuchi', 'turma': 'Year 3'}, {'nome': 'Maria Clara Polimeno Franco', 'turma': 'Year 2'}, {'nome': 'Maria Eduarda de Carvalho Coelho Junior', 'turma': 'Year 6'}, {'nome': 'Maria Eduarda Iwamura Marques', 'turma': 'Year 3'}, {'nome': 'Maria Flor Baptista da Cruz', 'turma': 'Year 2'}, {'nome': 'Maria Gabriela da Cruz Barros', 'turma': 'Year 1'}, {'nome': 'Maria Helena Rodrigues Mota', 'turma': 'Year 1'}, {'nome': 'Maria Julia Bortoleto Higuchi', 'turma': 'Year 6'}, {'nome': 'Maria Victoria Mastandrea Marques', 'turma': 'Year 4'}, {'nome': 'Mariah Peixoto Almeida', 'turma': 'Year 2'}, {'nome': 'Mariana Camargo Antonino', 'turma': 'Year 2'}, {'nome': 'Marina Chiste Silva', 'turma': 'Year 4'}, {'nome': 'Mateo Montes Santos', 'turma': 'Year 2'}, {'nome': 'Matheus Assis Araújo', 'turma': 'Year 7'}, {'nome': 'Matheus Machado Gonçalves', 'turma': 'Year 7'}, {'nome': 'Matheus Mendes Candido', 'turma': 'Year 3'}, {'nome': 'Matheus Terra Gonçalves', 'turma': 'Year 5'}, {'nome': 'Mauricio Manetti', 'turma': 'Year 6'}, {'nome': 'Mayara Malosti de Jesus', 'turma': 'Year 6'}, {'nome': 'Micaela Gomes Ravagnani Vargas', 'turma': 'Year 6'}, {'nome': 'Miguel Gomes Padilha', 'turma': 'Year 5'}, {'nome': 'Miguel Guido Machado Celete', 'turma': 'Year 2'}, {'nome': 'Miguel Monteiro de Miranda', 'turma': 'Year 6'}, {'nome': 'Miguel Senra Delamico', 'turma': 'Year 1'}, {'nome': 'Mohamad Smaidi', 'turma': 'Year 2'}, {'nome': 'Muhamad Taha Saifi', 'turma': 'Year 2'}, {'nome': 'Nicholas Dias Novelletto', 'turma': 'Year 3'}, {'nome': 'Nicolas Bomfá Doro', 'turma': 'Year 5'}, {'nome': 'Nicolas Coutinho Reno Cassia Cruz', 'turma': 'Year 1'}, {'nome': 'Nicolas Duarte Martin', 'turma': 'Year 1'}, {'nome': 'Nicole de Moura Santos Pinheiro', 'turma': 'Year 4'}, {'nome': 'Noha Gabriel Yendé Monthe', 'turma': 'Year 1'}, {'nome': 'Norberto Amaral Ramos', 'turma': 'Year 5'}, {'nome': 'Nycole Martins Nogarotto', 'turma': 'Year 4'}, {'nome': 'Paulo Brandão Zeraick da Costa', 'turma': 'Year 1'}, {'nome': 'Pedro Cavassana Germano', 'turma': 'Year 2'}, {'nome': 'Pedro Villalta Roman', 'turma': 'Year 2'}, {'nome': 'Rafael Gasch Mello', 'turma': 'Year 5'}, {'nome': 'Rafael Guerreiro Mrad', 'turma': 'Year 7'}, {'nome': 'Rafael Hiroshi Inaba Castilho', 'turma': 'Year 1'}, {'nome': 'Rafaela Oliveira Miranda', 'turma': 'Year 5'}, {'nome': 'Rafaela Welter Kratz', 'turma': 'Year 1'}, {'nome': 'Ramon Benites', 'turma': 'Year 1'}, {'nome': 'Raul de Morais Urias', 'turma': 'Year 2'}, {'nome': 'Rayhan Massaud Mrad Cabral', 'turma': 'Year 3'}, {'nome': 'Rebeca Santos Vasconcellos Muniz', 'turma': 'Year 2'}, {'nome': 'Rodrigo Barbosa de Campos Gomes', 'turma': 'Year 7'}, {'nome': 'Samuel da Mata Mesquita', 'turma': 'Year 1'}, {'nome': 'Samuel Moscardini Figueira', 'turma': 'Year 1'}, {'nome': 'Sara Giacomazzi', 'turma': 'Year 5'}, {'nome': 'Sofia Alves Ikeda', 'turma': 'Year 4'}, {'nome': 'Sofia Biaso Montenegro Félix Ahmed', 'turma': 'Year 3'}, {'nome': 'Sofia Lauria Mafetano', 'turma': 'Year 7'}, {'nome': 'Sofia Moreira França', 'turma': 'Year 1'}, {'nome': 'Sophia de Moura Santos Pinheiro', 'turma': 'Year 5'}, {'nome': 'Sophia de Paula Gomes', 'turma': 'Year 3'}, {'nome': 'Soraia Mohamad Smidi', 'turma': 'Year 2'}, {'nome': 'Soraia Saifi', 'turma': 'Year 5'}, {'nome': 'Thais Bueno Moreira', 'turma': 'Year 5'}, {'nome': 'Thais Rodrigues Dias de Melo', 'turma': 'Year 7'}, {'nome': 'Theo Amantéa Costa', 'turma': 'Year 2'}, {'nome': 'Theo Plachta', 'turma': 'Year 2'}, {'nome': 'Theodora Reis Da Paz', 'turma': 'Year 1'}, {'nome': 'Thomaz Canavezi Moura', 'turma': 'Year 4'}, {'nome': 'Tobias Colacioppo e Silva', 'turma': 'Year 4'}, {'nome': 'Tomás Furtado Nossaes', 'turma': 'Year 5'}, {'nome': 'Valentina Gaeta dos Reis Bispado', 'turma': 'Year 4'}, {'nome': 'Valentina Guadalajara Valeriani', 'turma': 'Year 2'}, {'nome': 'Valentina Negrini Biase', 'turma': 'Year 1'}, {'nome': 'Vicente Guimarães Bentiboglio', 'turma': 'Year 1'}, {'nome': 'Victor Augusto Tupinambá Aguiar', 'turma': 'Year 5'}, {'nome': 'Vito Ardito Filho', 'turma': 'Year 2'}, {'nome': 'Vitor Kazuo Kuwabara Fracchia da Costa', 'turma': 'Year 3'}, {'nome': 'Vivian Santos Luna', 'turma': 'Year 2'}, {'nome': 'Yasmin Guerreiro Mrad', 'turma': 'Year 4'}];

    }
    else {
      if (cookies.userData.userKids) {
      estudantes = cookies.userData.userKids;
    }}
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

  async function submitAlmoco(dateId, date, turma, turno, proteina, acompanhamentos) {
    setIsLoading(true);
    try {
    //define o objeto que vai carregar o array de escolhas para registro na base de dados
      let data;
      if(turma == "Year 6" || turma == "Year 7") {
          data = {
          data: new Date(date),
          dataId: dateId,
          estudante: estudante,
          turma: turma,
          proteina: proteina,
          acompanhamentos: acompanhamentos,
        };
      } else {
          data = {
          data: new Date(date),
          dataId: dateId,
          estudante: estudante,
          turma: `${turno}-${turma}`,
          proteina: proteina,
          acompanhamentos: acompanhamentos,
        };
      }
        
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

    
    let turno =(estudantes.filter(item => item.nome == estudante)[0].turno)
    if(!turno) {
      turno = "Z - Avulsos"
    }
    const turma =(estudantes.filter(item => item.nome == estudante)[0].turma)
    if(!turma) {
      return
    } else {
      setAbleToSubmit(false);
    const response = await submitAlmoco(
      dataEscolhida,
      convertDate(date),
      turma,
      turno,
      proteinSelection,
      acompanhamentos
    );
    setTemEscolhas(false);
    return response;
    }
    
  }

  const confirmaDelete = async (data) => {
    const confirmDeletion = window.confirm(
      'Tem certeza que deseja apagar a escolha?'
    );
    if (confirmDeletion) {
      setIsLoading(true);

      try {
        const result = await fetch(BASE_URL + DELETE_URL_ESCOLHAS + data, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${cookies.accessToken}`,
          },
        });
        if (result.ok) {
          alert("Dia removido com sucesso!");
          setIsLoading(false);
          return window.location.reload();
        } else {
          alert(result.message);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    } else {
      return;
    }
  };


  useEffect(() => {
    try {
      fetchCard();
      fetchEscolhas();
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
                      <option id={item.turma} key={item.nome} value={item.nome}>
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
                          <span>
                  <small>
                    Instruções: O sistema sobrescreverá escolhas já realizadas,
                    caso você escolha uma data já cadastrada.
                  </small>
                </span>
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
                <div className="d-flex align-content-stretch justify-content-center flex-wrap m-3 text-center">
                  {escolhasNaBase.map((item) => {
                    if (item.data >= today) {
                      console.log(item._id);
                      return (
                        <>
                          <div key={item.id} className="card m-3 p-2" style={{maxWidth:"250px"}}>
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
                            <div value={item._id} onClick={(e) => {
                                confirmaDelete(e.target.value)
                            }}>
                            <button value={item._id} type="button" className="btn btn-outline-danger mt-2" title="Clique para apagar">Apagar
                            </button>
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
