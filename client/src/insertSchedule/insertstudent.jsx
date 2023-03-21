import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../functions/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useCookies} from 'react-cookie';
import { convertDate } from "../components/dataconverted";

const BASE_URL = 'http://127.0.0.1:3000'
const REGISTER_URL = "/schedule/register";
const STUDENT_URL = "/students/getall"
const SERVICES_URL = "/services/getall"
const CLASSES_URL = "/classes/getall";
const SCHEDULES_URL = "/schedule/getall";
const DELETE_URL = '/schedule/remove/';
const PATCH_URL = '/schedule/update/';
const SCHEDULEONE_URL = "/schedule/getone/";


const InsertStudent = () => {
    const studentRef = useRef();
    const classeRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState();
    const [student, setStudent] = useState('');
    const [classe, setClasse] = useState('');
    const [service, setService] = useState('');
    const [chamado, setChamado] = useState('');
    const [dateBegin, setDateBegin] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    let [cookies, useCookie] = useCookies();
    const [refreshPage, setRefreshPage] = useState(false);
    


    let [studentsList, setStudentsList] = useState([{ studentName: "carregando..."} ]);
    let [classesList, setClassesList] = useState([]);
    let [servicesList, setServicesList] = useState([]);
    let [schedules, setSchedules] = useState([]);

    useEffect(()=>{ 
        fetch(BASE_URL+STUDENT_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${cookies.accessToken}`
            }
        })
        .then((response)=>response.json())
        .then((res)=> {if(res.message) { 
            setErrMsg(res.message);
        }; setStudentsList(res); setStudentsList(oldValue => [...oldValue, ""])}) 

        fetch(BASE_URL+CLASSES_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${cookies.accessToken}`
            }
        })
        .then((response)=>response.json())
        .then((res)=> {if(res.message) { 
            setErrMsg(res.message);
        }; setClassesList(res); setClassesList(oldValue => [...oldValue, ""])})

        fetch(BASE_URL+SERVICES_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${cookies.accessToken}`
            }
        })
        .then((response)=>response.json())
        .then((res)=> {if(res.message) { 
            setErrMsg(res.message);
        }; setServicesList(res); setServicesList(oldValue => [...oldValue, ""])})

        fetch(BASE_URL+SCHEDULES_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${cookies.accessToken}`
            }
        })
        .then((response)=>response.json())
        .then((res)=> { if(res.message) { 
            setErrMsg(res.message);
        }; 
          let newArray = []; 
          res.map((item)=>{
            
              item.dateBegin = convertDate(item.dateBegin);
              item.dateEnd = convertDate(item.dateEnd);

                newArray.push(item);

            
          })
          setSchedules(newArray);})

    }, [schedules])


    const handleSubmit = (e) => { 
      e.preventDefault();

        alert("submeteu !")
        let newDateBegin = new Date(dateBegin)
        let newDateEnd = new Date(dateEnd)

      try {
        let data = {
          "nome": student,
          "classe": classe,
          "svc": service,
          "qtd": 1,
          "dateBegin": dateBegin,
          "dateEnd": dateEnd,
          "chamado": chamado
        }
        fetch(BASE_URL+REGISTER_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer  ${cookies.accessToken}`
          },
          body: JSON.stringify(data)
      })
      .then((response)=>{response.json();})
      .then((resJson) => {console.log(resJson)})

      } catch(err) {
        console.log(err)
      }
    }

    const deleteRegister= (id) => {
      try {
        let data = {
          "_id": id
        }
        fetch(BASE_URL+DELETE_URL+id, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer  ${cookies.accessToken}`
          },
          body: JSON.stringify(data)
      })
      .then((response)=>{
        if(response.statusText.ok) {
          setRefreshPage(oldValue => !oldValue)
        }
      })   

      } catch (err) {
        console.log(err)
      }
    }

    function patchSchedule(e, _id) {

      try {
        let cobrouValue;
        fetch(BASE_URL+SCHEDULEONE_URL+_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${cookies.accessToken}`
            }
        })
        .then((response)=>response.json())
        .then((res)=> {
            if(res.message) { 
            //console.log(res.message);
            return ;
        } cobrouValue = res.cobrou; 

        let patchData = {
            'cobrou': !cobrouValue
        }
        fetch(BASE_URL+PATCH_URL+_id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer  ${cookies.accessToken}`
          },
          body: JSON.stringify(patchData)
      }).then(res=>res.json()).then((oldValue)=> setRefreshPage(!oldValue))

    })
        
      } catch(err) {
        console.log(err)
      }
    }


    if(!schedules.length) {
        return <div>Loading...</div>
    }

    return (
      <>
    <div className="container d-flex justify-content-around">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
        crossorigin="anonymous"></link>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "p-3 mb-2 bg-danger text-white" : "d-none"}
          aria-live="assertive">
          {errMsg}
        </p>
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            <h1>Inserir Almoço</h1>
          </div>

          <label htmlFor="studentName">
            Nome do estudante:
          </label>
          <select 
              className="form-control mt-2"
              id="studentName"
              name="studentName"
              ref={studentRef}
              onChange={(e) => {
                  setStudent(e.target.value);
              }}
              value={student}
              required
          >
            {studentsList.map((student) => {
                return <option key={student._id} value={student._id}>
                    {student.studentName}
                </option>
            })
            }
          </select><br />
          <label htmlFor="classe">
            Classe:
          </label>
          <select
            className="form-control mt-2"
            id="classe"
            name="classe"
            ref={classeRef}
            onChange={(e) => setClasse(e.target.value)}
            value={classe}
            required
          >
            {classesList.map((classe) => {
                return <option key={classe._id} value={classe._id}>
                    {classe.classeName}
                </option>
            })
            }
          </select><br/>
             <label htmlFor="service">
            Tipo de serviço:
          </label>
          <select
            className="form-control mt-2"
            id="service"
            onChange={(e) => {
                setService(e.target.value);
            }}
            value={service}
            required
          > 
          {servicesList.map((service) => {
                return <option key={service._id} value={service._id}>
                    {service.serviceName}
                </option>
            })
            }
          
          </select><br />
        <label htmlFor="chamado">
          Chamado:
        </label>
        <input
            className="form-control mt-2"
            type="text"
            id="chamado"
            autoComplete="off"
            onChange={(e) => {
                setChamado(e.target.value);
            }}
            value={chamado}
            required
          /> <br />
          <div className='row'>
            <div className="col">
          <label htmlFor="dateBegin">
           Data de início do Serviço:
          </label>
          <input
            className="form-control"
            type="date"
            id="dateBegin"
            onChange={(e) => setDateBegin(e.target.value)}
            value={dateBegin}
            
          />  </div> 
          <div className="col">       
            <label htmlFor="dateEnd">
            Data de Fim do Serviço:
            </label>
            <input
           className="form-control"
           type="date"
           id="dateEnd"
           onChange={(e) => setDateEnd(e.target.value)}
           value={dateEnd}
         /></div>
         </div><span>*Em caso de contratação mensal, defina o último dia previsto para encerramento do almoço</span>
        <div className="d-flex justify-content-around">
          <button className="btn btn-lg btn-primary btn-block mt-4 text-center">
            Registrar
          </button>
          </div>
        </form>
        <div className="d-flex justify-content-around mt-3">
        </div>
      </section>
    </div>
    <hr />
    <div className='d-flex justify-content-around'><h1>Lista de estudantes inscritos</h1></div>
    <div className="container text-center">
        
        <table className="table table-striped table-bordered">
            <thead className="table">
                <th>Nome</th>
                <th>Classe</th>
                <th>Serviço</th>
                <th>Valor unitário</th>
                <th>Data de Início (mm/dd/yyyy)</th>
                <th>Data de Fim (mm/dd/yyyy)</th>
                <th>Editar</th>
                <th>Excluir</th>
                <th>Status de cobrança</th>
            </thead>
            <tbody className="table-hover">
                {schedules.map((schedule) => {
                    return (
                        <tr scope="row" key={schedule._id}>
                        <td ><input type={'hidden'} value={schedule._id}/>{schedule.nome.studentName}</td>
                        <td>{schedule.classe.classeName}</td>
                        <td>{schedule.svc.serviceName}</td>
                        <td>{schedule.svc.serviceValue}</td>
                        <td>{schedule.dateBegin}</td>
                        <td>{schedule.dateEnd}</td>
                        <td>{ schedule.cobrou ? <div>🚫</div> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-pencil" onClick={()=>{
                            console.log('chamar funçao para mudar o BD')}} >
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
                }</td>
                        <td> {schedule.cobrou ? <div>🚫</div> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-trash" viewBox="0 0 16 16" onClick={()=> {deleteRegister(schedule._id);}}>
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>}</td>

                        <td>{ schedule.cobrou ? <div className="checked" role={"button"} onClick={(e)=>{
                            patchSchedule(e, schedule._id);
                        }    
                        }>✅</div> : <div className="unchecked" role={"button"} onClick={(e)=>{
                            patchSchedule(e, schedule._id);
                          }
                            
                        }>⛔️</div>}</td>
                      </tr>
            )})}
            </tbody>
        </table>
    </div>
    </>
  );

}

export default InsertStudent;