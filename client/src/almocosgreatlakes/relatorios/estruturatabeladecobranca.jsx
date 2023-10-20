import React from "react";
import LinhaTabelaCobranca from "./linhastabelacobranca";
import LinhasDaTabelaCobranca from "./linhastabelacobranca";


const EstruturaDaTabelaCobrancas = (props) => {
    let counter = 0
    let counter2 = 0
    let estudante = null;
    const counts = {};
    {props.dados.forEach(function (x) {
        counts[x.estudante] = (counts[x.estudante] || 0) + 1;
    });}

    if(props.tipoDeContrato == "Diarias") {
        return (

            <>
            <div className='container text-center bg-primary text-white'><h4>Tabela de crianças diaristas</h4></div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Ordem</th>
                    <th scope="col">Data</th>
                    <th scope="col">Estudante</th>
                    <th scope="col">Responsável</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Contrato</th>
                    <th scope="col">Vencimento</th>
                    <th scope="col">Cobrado</th>
                    </tr>
                </thead>
                <tbody>
                {props.dados.map((item) => {
                    if(counts[item.estudante] < 15 && item.turma != "Staff") {
                        counter = counter + 1;
                    return <LinhasDaTabelaCobranca _id={item._id} counter={counter}data={item.data} estudante={item.estudante} responsavel={item.responsavel} turma={item.turma} servico={item.servico} contrato={counts[item.estudante]} cobrado={item.cobrado} vencimento={item.vencimento}/>
                    }
                    
                })}
                    
                </tbody>
            </table>
            </>
        )
    } if(props.tipoDeContrato == "Mensais") {
        return (

            <>
            <div className='container text-center bg-primary text-white'><h4>Tabela de crianças Mensalistas</h4></div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Ordem</th>
                    <th scope="col">Data</th>
                    <th scope="col">Estudante</th>
                    <th scope="col">Responsável</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Contrato</th>
                    <th scope="col">Vencimento</th>
                    <th scope="col">Cobrado</th>
                    </tr>
                </thead>
                <tbody>
                {props.dados.map((item) => {
                    if(counts[item.estudante] >= 15) {
                        counter = counter + 1;
                    return <LinhasDaTabelaCobranca _id={item._id} counter={counter}data={item.data} estudante={item.estudante} responsavel={item.responsavel} turma={item.turma} servico={item.servico} contrato={counts[item.estudante]} cobrado={item.cobrado} vencimento={item.vencimento}/>
                    }
                    
                })}
                    
                </tbody>
            </table>
            </>
        )
    } if(props.tipoDeContrato == "Staff") {
        return (

            <>
            <div className='container text-center bg-primary text-white'><h4>Tabela de Cobranças Para o Staff</h4></div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Ordem</th>
                    <th scope="col">Data</th>
                    <th scope="col">Estudante</th>
                    <th scope="col">Responsável</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Contrato</th>
                    <th scope="col">Vencimento</th>
                    <th scope="col">Cobrado</th>
                    </tr>
                </thead>
                <tbody>
                {props.dados.map((item) => {
                    if(item.turma == "Staff") {
                        counter = counter + 1;
                    return <LinhasDaTabelaCobranca _id={item._id} counter={counter}data={item.data} estudante={item.estudante} responsavel={item.responsavel} turma={item.turma} servico={item.servico} contrato={"Cobrança direta Staff"} cobrado={item.cobrado} vencimento={item.vencimento}/>
                    }
                    
                })}
                    
                </tbody>
            </table>
            </>
        )
    }

    
}

export default EstruturaDaTabelaCobrancas;