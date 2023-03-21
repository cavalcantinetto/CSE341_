import { useState, useContext, useEffect } from "react";
import React from "react";
import AuthContext from "../functions/AuthProvider";
import { useCookies} from 'react-cookie';

const BASE_URL = 'http://127.0.0.1:3000'
const SCHEDULE_URL = "/schedule/getall";
const SCHEDULEONE_URL = "/schedule/getone/";
const PATCH_URL = '/schedule/update/';
const Schedule = () =>  {
    const [schedule, setSchedule] = useState([]);
    const {auth} = useContext(AuthContext);
    let [fail, setFail] = useState(false);
    const [timer, setTimer] = useState('')
    let [cookies, useCookie] = useCookies();

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '/' + dd + '/' + yyyy;
    useEffect(()=>{ 
            fetch(BASE_URL+SCHEDULE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${cookies.accessToken}`
                }
            })
            .then((response)=>response.json())
            .then((res)=> {if(res.message) {
                setFail(true);  
            }; setSchedule(res)});

    }, [timer])

    if(fail) {
        return <div>A Operação Falhou</div>
    }

    if(!schedule.map) {
        return <div>Loading...</div>
    }

    function timerChange() {
        setTimeout(() => {
            setTimer((timer) => !timer);
          }, 0);
          return () => clearTimeout()
        return 
        
    }

    function patchSchedule(e, _id) {

      try {
        let comeuValue;
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
        } comeuValue = res.comeu; 

        let patchData = {
            'comeu': !comeuValue
        }
        fetch(BASE_URL+PATCH_URL+_id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer  ${cookies.accessToken}`
          },
          body: JSON.stringify(patchData)
      }).then(setTimer(_id))

    })
        
      } catch(err) {
        console.log(err)
      }
    }

    
    if(schedule.length == 0) {
        return (
            'Loading...'
        )
    } else { 

    return (
        
        <>
        
        <div className="container text-center">
        <h1>Lista de estudantes que almoçam em: <br /><span className={"text-center"}>{formattedToday}</span></h1><br />
        <table className="table table-striped table-bordered table-active">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Classe</th>
                <th>serviço</th>
                <th>Comeu</th>
                </tr>
            </thead>
            <tbody className="table-hover">
                {schedule.map((schedule) => {
                    return <tr scope="row" key={schedule._id}>
                        <td ><input type={'hidden'} value={schedule._id}/>{schedule.nome.studentName}</td>
                        <td>{schedule.classe.classeName}</td>
                        <td>{schedule.svc.serviceName}</td>
                        <td>{ schedule.comeu ? <div className="checked" role={"button"} onClick={(e)=>{
                            patchSchedule(e, schedule._id);
                        }    
                        }>✅</div> : <div className="unchecked" role={"button"} onClick={(e)=>{
                            patchSchedule(e, schedule._id);}
                            
                        }>⛔️</div>}</td></tr>
            })}
            </tbody>
        </table>
        </div>  
        </>
    )
    
}
}
export default Schedule;