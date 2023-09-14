import React, { useRef, useState } from "react";
import Loading from "../../components/loading";
import { ALTERACOMEU_V1, BASE_URL } from "../../functions/urlbase";
import { useCookies } from "react-cookie";

export default function LinhasDaTabela(props) {
    const [cookies, setCookies] = useCookies();
    const [isLoading, setIsLoading] = useState();
    const [present, setPresent] = useState('ausente')
    const [sent, setSent] = useState(0)
    const statusProteina = useRef();
    const statusArrozEFeijao = useRef();
    const statusSalada = useRef();
    const statusGuarnicao = useRef();

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }


    function handleSubmete(e) {
        setIsLoading(true);
        if (statusProteina.current == null ||statusSalada.current == null || statusGuarnicao.current == null || statusProteina.current == "" ||statusSalada.current == "" || statusGuarnicao.current == "") {
            setIsLoading(false)
            return alert("Deve ser selecionado um status para proteina, guarnição e salada.")
        } else {
            const statusToBeSent = {
                "proteina": statusProteina.current,
                "arrozefeijao": statusArrozEFeijao.current,
                "salada": statusSalada.current,
                "guarnicao": statusGuarnicao
            }
            const result = fetch(BASE_URL+ALTERACOMEU_V1+props._id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer  ${cookies.accessToken}`,
                  },
                  body: JSON.stringify(statusToBeSent)

            }).then(res=> res.json().then(data => console.log(data)))

        }

        console.log(statusProteina, statusSalada,statusGuarnicao)
        setIsLoading(false)
    }

    if(isLoading) {
        return <><tr><td></td><td></td><td></td><td></td><td></td><td></td><Loading /></tr></>
    }
    console.log(present)
    if(present == 'ausente' || present == null || present == undefined || present == "") {
        return (
            <tr className="table-warning" key={getRndInteger(1,1000) + props._id}>
              <td key={getRndInteger(1,1000) + props._id}>{props.counter}</td>
              <td key={getRndInteger(1,1000) + props._id}>{props.estudante}</td>
              <td key={getRndInteger(1,1000) + props._id}>{props.turma}</td>
              <td key={getRndInteger(1,1000) + props._id}>
              <select onChange={(e) => {
                    setPresent(e.target.value);

                }}>
                <option value="ausente">Ausente</option>
                <option value="presente">Presente</option>
            </select>
              </td>
              <td key={getRndInteger(1,1000) + props._id}>{props.proteina}</td>
              <td key={getRndInteger(1,1000) + props._id}>{props.arrozefeijao}</td>
              <td key={getRndInteger(1,1000) + props._id}>{props.salada}</td>
              <td key={getRndInteger(1,1000) + props._id}>{props.guarnicao}</td>
              <td>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
              </td>
              </tr>
              )

    }

    if(props.proteina) {
        return (
          <tr className="table-success" key={getRndInteger(1,1000) + props._id}>
            <td key={getRndInteger(1,1000) + props._id}>{props.counter}</td>
            <td key={getRndInteger(1,1000) + props._id}>{props.estudante}</td>
            <td key={getRndInteger(1,1000) + props._id}>{props.turma}</td>
            <td key={getRndInteger(1,1000) + props._id}>
              <select onChange={(e) => {

                    setPresent(e.target.value);
                    

                }}>
                <option value="presente">Presente</option>
                <option value="ausente">Ausente</option>
            </select>
              </td>
            <td key={getRndInteger(1,1000)}>{props.proteina}</td>
            <td key={getRndInteger(1,1000) + props._id}>{props.arrozefeijao}</td>
            <td key={getRndInteger(1,1000) + props._id}>{props.salada}</td>
            <td key={getRndInteger(1,1000) + props._id}>{props.guarnicao}</td>
            <td>
              <div onClick={handleSubmete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-all"
                  viewBox="0 0 16 16">
                  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                </svg>
              </div>
            </td>
          </tr>
        );

    }

    if(sent == 0) {
        return (
          <tr key={getRndInteger(1, 1000) + props._id}>
            <td key={props._id + "counter"}>{props.counter}</td>
            <td key={props._id + props.estudante}>{props.estudante}</td>
            <td key={props._id + props.turma}>{props.turma}</td>
            <td key={props._id + "select"}>
              <select
                onChange={(e) => {
                  setPresent(e.target.value);
                }}>
                <option value="presente">Presente</option>
                <option value="ausente">Ausente</option>
              </select>
            </td>
            <td key={props._id + "proteina"}>
              <select
                onChange={(e) => {
                  statusProteina.current = e.target.value;
                }}>
                <option></option>
                <option value="Aceitou Bem">Aceitou Bem</option>
                <option value="Experimentou">Experimentou</option>
                <option value="Não aceitou">Não Aceitou</option>
              </select>
            </td>
            <td key={props._id + "arrozefeijao"}>
              <select
                onChange={(e) => {
                  statusArrozEFeijao.current = e.target.value;
                }}>
                <option></option>
                <option value="Aceitou Bem">Aceitou Bem</option>
                <option value="Experimentou">Experimentou</option>
                <option value="Não aceitou">Não Aceitou</option>
              </select>
            </td>
            <td key={props._id + "salada"}>
              <select
                onChange={(e) => {
                  statusSalada.current = e.target.value;
                }}>
                <option></option>
                <option value="Aceitou Bem">Aceitou Bem</option>
                <option value="Experimentou">Experimentou</option>
                <option value="Não aceitou">Não Aceitou</option>
              </select>
            </td>
            <td key={props._id + "guarnicao"}>
              <select
                onChange={(e) => {
                  statusGuarnicao.current = e.target.value;
                }}>
                <option></option>
                <option value="Aceitou Bem">Aceitou Bem</option>
                <option value="Experimentou">Experimentou</option>
                <option value="Não aceitou">Não Aceitou</option>
              </select>
            </td>
            <td key={props._id + "button"}>
              <div onClick={handleSubmete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-save"
                  viewBox="0 0 16 16">
                  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                </svg>
              </div>
            </td>
          </tr>
        );
      

    }
    

    
}