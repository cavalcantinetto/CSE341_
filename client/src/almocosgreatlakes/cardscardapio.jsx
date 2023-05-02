import React from "react";
import { convertDate } from "../components/dataconverted";

const CardapioCard = (props) => {

    return (
     <>
    <div key={props.id} className="card m-3 p-2">
    <div className="card-body bg-light bg-gradient rounded-3 shadow">
    <div><h5 className="card-title m-3">
        {convertDate(props.data)}
    </h5></div>
    {props.proteina.map((protein) => {
        return <p key={props.id+protein} className="card-text">{protein}</p>
    })
}   
    <hr></hr>
    {props.acompanhamento.map((acomp) => {
        return <p key={props.id+acomp} className="card-text">{acomp}</p>
    })
}   
  </div>
    <div value={props.data} >
    <button key={props.data.acomp} type="button" className="btn btn-outline-danger mt-2" title="Clique para apagar" onClick={(e) => {
        props.confirmaDelete(props.data)
    }}><svg key={props.data.acomp} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-x" viewBox="0 0 16 16">
    <path d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"/>
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
  </svg>
     </button>
    </div>
</div>
</>
)}

export default CardapioCard;