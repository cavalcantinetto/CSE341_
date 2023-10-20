import React, { useRef, useState } from "react";
import InsereCrianca from "./inserecrianca";

export default function InsereUsuario(props) {
    const nomeDoResp = useRef();
    const nomeCrianca1 = useRef();
    const dataVencimento = useRef();
    const nomeCrianca2 = useRef();
    const nomeCrianca3 = useRef();
    const nomeCrianca4 = useRef()
    const emailResp = useRef();
    const RM = useRef();
    const turma1 = useRef();
    const turma2 = useRef();
    const turma3 = useRef();
    const turma4 = useRef();
    const turno1 = useRef();
    const turno2 = useRef();
    const turno3 = useRef();
    const turno4 = useRef();
    
    const [numCriancas, setNumCriancas] = useState(1)

    function handleCrianca1(value) {
        nomeCrianca1.current = value;
        console.log(nomeCrianca1.current)
    }

    function handleCrianca2(value) {
        nomeCrianca2.current = value;
        console.log(nomeCrianca2.current)
    }

    function handleCrianca3(value) {
        nomeCrianca3.current = value;
        console.log(nomeCrianca3.current)
    }

    function handleCrianca4(value) {
        nomeCrianca4.current = value;
        console.log(nomeCrianca4.current)
    }

    function handleTurma1(value) {
        turma1.current = value;
        console.log(turma1.current)
    }

    function handleTurma2(value) {
        turma2.current = value;
        console.log(turma2.current)
    }

    function handleTurma3(value) {
        turma3.current = value;
        console.log(turma3.current)
    }

    function handleTurma4(value) {
        turma4.current = value;
        console.log(turma4.current)
    }

    function handleTurno1(value) {
        turno1.current = value;
        console.log(turno1.current)
    }
    function handleTurno2(value) {
        turno2.current = value;
        console.log(turno2.current)
    }
    function handleTurno3(value) {
        turno3.current = value;
        console.log(turno3.current)
    }
    function handleTurno4(value) {
        turno4.current = value;
        console.log(turno4.current)
    }

    function handleNomeDOResp(value) {
        nomeDoResp.current = value;
        console.log(nomeDoResp.current)
    }

    function handleEmailDoResp(value) {
        emailResp.current = value;
        console.log(emailResp.current)
    }

    function handleRM(value) {
        RM.current = value;
        console.log(RM.current)
    }

    function handleDataVencimento(value) {
        dataVencimento.current = value;
        console.log(dataVencimento.current)
    }

    function handleSubmit() {
        console.log(nomeDoResp.current ,nomeCrianca1.current ,dataVencimento.current ,nomeCrianca2.current ,nomeCrianca3.current ,nomeCrianca4.current ,emailResp.current ,RM.current ,turma1.current ,turma2.current ,turma3.current ,turma4.current ,turno1.current ,turno2.current ,turno3.current ,turno4.current)
    }

        return (

            <div className="container">
                <div className="mb-3">
                <label>Quantas crianças serão cadastradas para o mesmo responsável?</label><br/>
                    <select onChange={(e)=> {
                        e.preventDefault();
                        setNumCriancas(e.target.value)
                    }}>
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                    </select>
                    
                </div> 
            <div className="mb-3">
            <label htmlFor="respName">Nome do Responsável</label>
            <input id="respName" className="form-control" type="text" placeholder="Bruce Wayne"  onChange={(e)=> handleNomeDOResp(e.target.value)}/>
            </div>
            <div className="mb-3">
            <label>Email do Responsável</label>
            <input className="form-control" type="text" placeholder="alert@batman.com" label="Email do Responsável" onClick={(e)=> handleEmailDoResp(e.target.value)} />
            </div>
            <div className="mb-3">
                <label>RM da criança 1:</label>
            <input className="form-control" type="text" placeholder="123456-x - servirá como senha de acesso para o responsável." onClick={(e)=> handleRM(e.target.value)} />
            </div>
            <div className="row g-3 align-items-center mb-3">
            <label className="col-auto">Data do Vencimento: </label>
            <select className="col-auto" onChange={(e)=> handleDataVencimento(e.target.value)}>
              <option value="0">Escolha uma data...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            </div>
            {numCriancas==1 && <InsereCrianca numero="1" handleCrianca={handleCrianca1} handleTurma={handleTurma1} handleTurno={handleTurno1}/>}
            {numCriancas==2 && <><InsereCrianca numero="1" handleCrianca={handleCrianca1} handleTurma={handleTurma1} handleTurno={handleTurno1}/>
            <InsereCrianca numero="2" handleCrianca={handleCrianca2} handleTurma={handleTurma2} handleTurno={handleTurno2}/></>}
            {numCriancas==3 && <><InsereCrianca numero="1" handleCrianca={handleCrianca1} handleTurma={handleTurma1} handleTurno={handleTurno1}/>
            <InsereCrianca numero="2" handleCrianca={handleCrianca2} handleTurma={handleTurma2} handleTurno={handleTurno2}/>
            <InsereCrianca numero="3" handleCrianca={handleCrianca3} handleTurma={handleTurma3} handleTurno={handleTurno3}/></>}
            {numCriancas==4 && <><InsereCrianca numero="1" handleCrianca={handleCrianca1} handleTurma={handleTurma1} handleTurno={handleTurno1}/>
            <InsereCrianca numero="2" handleCrianca={handleCrianca2} handleTurma={handleTurma2} handleTurno={handleTurno2}/>
            <InsereCrianca numero="3" handleCrianca={handleCrianca3} handleTurma={handleTurma3} handleTurno={handleTurno3}/>
            <InsereCrianca numero="4"handleCrianca={handleCrianca4} handleTurma={handleTurma4} handleTurno={handleTurno4}/></>}
            <div className="container text-center">
            <input className="m-3" type="submit" value={"Registrar"}  onClick={handleSubmit}/>
            </div>
          </div>
        );

    }