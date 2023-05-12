import React from "react";
import BotoesStatus from "./botoesstatus";

const ReturnPedidos = (props) => {
 if(props.item.turma === 'Year 1'|| props.item.turma === 'Manhã-Year 1'|| props.item.turma ==='Tarde-Year 1') {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div>
                <div className='p-3 mb-2 bg-primary text-white'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
 }  if(props.item.turma === 'Year 2'|| props.item.turma === 'Manhã-Year 2'|| props.item.turma ==='Tarde-Year 2') {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div>
                <div className='p-3 mb-2 bg-secondary text-white'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
 }
 if(props.item.turma === 'Year 3'|| props.item.turma === 'Manhã-Year 3'|| props.item.turma ==='Tarde-Year 3') {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div>
                <div className='p-3 mb-2 bg-success text-white'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
 }  if(props.item.turma === 'Year 4'|| props.item.turma === 'Manhã-Year 4'|| props.item.turma ==='Tarde-Year 4') {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div>
                <div className='p-3 mb-2 bg-danger text-white'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
 }  if(props.item.turma === 'Year 5' || props.item.turma === 'Manhã-Year 5'|| props.item.turma ==='Tarde-Year 5') {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div>
                <div className='p-3 mb-2 bg-warning text-dark'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
  }
   if(props.item.turma === 'Year 6') {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div>
                <div className='p-3 mb-2 bg-info text-white'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
 } if(props.item.turma === 'Year 7') {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div>
                <div className='p-3 mb-2 bg-light text-dark'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
 } else {
    return (
        <div key={props.item._id} className="card m-3 p-2">
          <div className="card-body bg-light bg-gradient rounded-3 shadow">
            <div><div className='p-3 mb-2 bg-dark text-white'>
              <h5 className="card-title m-3">{props.item.estudante}</h5>
              <h4 className="card-title m-3">
                {`Turma: ${props.item.turma}`}
              </h4>
              </div>
              <p className="card-text">{props.item.pratos.proteina}</p>
              <hr></hr>
              {props.item.pratos.acompanhamentos.map((acomp) => {
                return (
                  <p key={props.item._id + acomp} className="card-text">
                    {acomp}
                  </p>
                );
              })}
              <hr></hr>
              <BotoesStatus item={props.item} />
            </div>
          </div>
        </div>
   );
 }
        
}

export default ReturnPedidos;