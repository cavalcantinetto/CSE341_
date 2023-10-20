import React, { useState } from "react";
import { convertDate } from "../../components/dataconverted";
import Loading from "../../components/loading";
import { REGISTRAALMOCOINFANTIL_V1, BASE_URL } from "../../functions/urlbase";


export default function ConfirmaDatas(props) {
    const [isLoading, setIsLoading] = useState(false);
    const datas = props.datas;
    var count = 0
    var dias;
    console.log(props.email)
    async function handleSubmit() {
        const novaEscolha = {
            "datas": props.datas,
            "estudante": props.estudante.nome,
            "turma": props.estudante.turma,
            "vencimento": props.vencimento,
            "responsavel": props.responsavel,
            "servico": "Almoço Infantil",
            "email": props.email

        }
      setIsLoading(true);
      const result = await fetch(BASE_URL + REGISTRAALMOCOINFANTIL_V1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${props.accessToken}`,
        },
        body: JSON.stringify(novaEscolha),
      }).then((res) => res.json()).then(data => console.log(data)).then(setIsLoading(false));
    }

    if(isLoading) {
        return <Loading/>
    }

    return (
        <div className="container text-center border">
            <h5 className="bg-primary text-white">Você optou pelo almoço nas datas abaixo, <br />Por favor confirme sua escolha ou refaça sua solicitação</h5>
            <ul className="list-group list-group-flush">
                
                {datas.map((data) => {
                    var dayOfTheWeek;
                    if(new Date(data).getDay()==0) {
                        dayOfTheWeek = "Segunda-feira"
                    }
                    if(new Date(data).getDay()==1) {
                        dayOfTheWeek = "Terça-feira"
                    }
                    if(new Date(data).getDay()==2) {
                        dayOfTheWeek = "Quarta-feira"
                    }
                    if(new Date(data).getDay()==3) {
                        dayOfTheWeek = "Quinta-feira"
                    }
                    if(new Date(data).getDay()==4) {
                        dayOfTheWeek = "Sexta-feira"
                    }
                    if(datas.length > 15 ) {
                        dias = "apenas os primeiros e os últimos dias escolhidos.";
                        if(datas.indexOf(data)< 3 ) {
                            count += 1;
                            return <li className="list-group-item">{`Diária ${count} - ${convertDate(data)} - ${dayOfTheWeek}`}</li>
                        }
                        if(datas.indexOf(data) == 3) {
                            count += 1;
                            return <li className="list-group-item">...</li>
                        }
                        if (datas.indexOf(data) > (datas.length - 4)) {
                            count += 1;
                            return <li className="list-group-item">{`Diária ${count} - ${convertDate(data)} - ${dayOfTheWeek}`}</li>
                        }
                        count += 1;
                    } else {
                        count += 1;
                        dias = "todos os dias escolhidos."
                        return <li className="list-group-item">{`Diária ${count} - ${convertDate(data)} - ${dayOfTheWeek}`}</li>
                    }
                })}
            </ul>
            <br />
            <h3>{`Você selecionou ${count} diária(s) no total.`}</h3>
            <h5>{`Estão sendo exibidos ${dias}`}</h5>
            <div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block m-3"
                  disabled={props.disable}
                  onClick={(e)=> {
                    handleSubmit()
                  }}
                  >
                  Confirmar
                </button>
              
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block m-3"
                  disabled={props.disable}
                  onClick={(e) => {
                    props.handleReload()
                  }}
                  >
                Refazer
            </button>
            </div>
            
        </div>
    )
   
}