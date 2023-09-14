import React, { useRef, useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { convertDate } from "../../components/dataconverted";


export default function InsereDatas(props) {
    const {errMsg, setErrMsg} = useState();
    const dataInicial = useRef();
    const dataFinal = useRef();

    return (
        <>

        <div className="container text-center">
              <p
                className={errMsg ? "p-3 mb-2 bg-danger text-white" : "d-none"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <p>Escolha a data inicial e a data final para contratação das refeições. Não se preocupe, pois o sistema filtra automaticamente os finais de semana.</p>
              <p>Caso queira apenas UMA diária de refeição a data inicial e final devem ser coincidentes.</p>
              <p></p>
    
              <div className="form-floating mb-3">
                <input
                type="date"
                className="form-control"
                id="floatingDateIni"
                disabled={props.disable}
                onChange={(e)=>{
                    dataInicial.current = e.target.value;
                }}
                />
                <label htmlFor="floatingDateIni">Data Inicial</label>
              </div>
            </div>
    
            <div className="container text-center">
              <div className="form-floating mb-3">
                <input
                type="date"
                className="form-control"
                id="floatingDateFin"
                disabled={props.disable}
                onChange={(e)=>{
                    dataFinal.current = e.target.value;
                }}
                />
                <label htmlFor="floatingDateFin">Data Final</label>
              </div>
              <div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block m-3"
                  disabled={props.disable}
                  onClick={(e)=> {
                    if(!dataInicial.current || !dataFinal.current) {
                       return alert("É necessário preencher data inicial e data Final.")
                    }
                    if(dataInicial.current > dataFinal.current) {
                       return  alert("A data inicial não pode ser posterior à data final.")
                    }
                    //Checa se a data escolhida é em dia anterior a hoje 11:00
                    if(new Date(`${dataInicial.current}T00:00`) < new Date(new Date().setHours(11,0,0,0))) {
                      if (new Date(`${dataInicial.current}T00:00`).getDate() < new Date().getDate()) {

                        return  alert("A data inicial não pode ser retroativa.")

                      }  
                      //se o dia for o mesmo, checa se é antes das 11h, horário local.
                      if(Date.now() > (new Date().setHours(11,0,0,0))) {
                        const hour = new Date(Date.now()).getHours();
                        const minutes = new Date(Date.now()).getMinutes()
                        return alert(`Agora são ${hour}:${minutes}. Só é possível solicitar almoço para o dia corrente até as 11:00 (horário Local). Sua solicitação não foi processada.`)
                      }
                      
                    }

                    props.handleDatas(new Date(dataInicial.current).toISOString(), new Date(dataFinal.current).toISOString())

                  }}
                  >
                  Avançar
                </button>
              </div>
              </div>
            </div>
            </>
    )
}