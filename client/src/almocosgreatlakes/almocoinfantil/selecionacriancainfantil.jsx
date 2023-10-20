import React from "react";
import useSWR from 'swr';
import { BASE_URL, GETALLKIDS } from "../../functions/urlbase";
import { useCookies } from "react-cookie";
import Loading from "../../components/loading";
import fetcher from "../lib/fetcher";
import Erro from "../erro";


export default function DadosDaCriancaInfantil(props) {
    const [cookies, setCookies] = useCookies();
    const {data, error, isLoading} = useSWR(BASE_URL+GETALLKIDS, (url) => fetcher(url, cookies));

    if(error) {
        return <Erro />
    }
    if(isLoading) {
        return <Loading/>;
    }
    if(data) {
      if(!cookies.userData) {
        return <Erro />
      }
      if(cookies?.userData.userLevel > 100) {
      return (
          <>
          <div className="container text-center">
              <div className="m-3">
                <label htmlFor="estudantRef" className="form-label m-3">
                  Nome da criança:
                </label>
                <select
                //passa os dados do estudante para a pagina principal com base no id que é o índex do array.
                  onChange={(e) => {
                    if(e.target[e.target.selectedIndex].id<0) {
                      props.handleClickEstudante(null)
                    } else {
                      props.handleClickEstudante(data[e.target[e.target.selectedIndex].id]);
                    }
                    

                  }}
                ><option id={-1} key={'undefined'} value={null}>
              Selecione o estudante ...
              </option>
                  {data.map((item) => {
                    if(!(item.turma === 'Year 1' || item.turma === 'Year 2' || item.turma === 'Year 3' || item.turma === 'Year 4' || item.turma === 'Year 5' || item.turma === 'Year 6' || item.turma === 'Year 7' || item.turma === 'Staff')) {
                      return (
                        <option id={data.indexOf(item)} key={data.indexOf(item)} name={item.turno} value={item.nome}>
                          {item.nome}
                        </option>
                      );
                    } return null
                  })}
                </select>
              </div>
          </div>
              </>
      )
     } else {
      return (
        <>
        <div className="container text-center">
            <div className="m-3">
              <label htmlFor="estudantRef" className="form-label m-3">
                Nome da criança:
              </label>
              <select
              //passa os dados do estudante para a pagina principal com base no id que é o índex do array.
                onChange={(e) => {
                  if(e.target[e.target.selectedIndex].id<0) {
                    props.handleClickEstudante(null)
                  } else {
                    props.handleClickEstudante(cookies.userData.userKids[e.target[e.target.selectedIndex].id]);
                  }
                }}
              ><option id={-1} key={'invalidData'} value={null}>
            Selecione o estudante ...
            </option>
                {cookies.userData.userKids.map((item) => {
                  if(!(item.turma === 'Year 1' || item.turma === 'Year 2' || item.turma === 'Year 3' || item.turma === 'Year 4' || item.turma === 'Year 5' || item.turma === 'Year 6' || item.turma === 'Year 7' || item.turma === 'Staff')) {
                    return (
                      <option id={cookies.userData.userKids.indexOf(item)} key={cookies.userData.userKids.indexOf(item)} name={item.turno} value={item.nome}>
                        {item.nome}
                      </option>
                    );
                  } return null
                })}
              </select>
            </div>
        </div>
            </>
    )
     }
    } else {
      return <Loading />
    }
}