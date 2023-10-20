import React from "react";
import LinhaTabelaCobranca from "./linhastabelacobranca";

const TabelaCobrancas = (props) => {
    let counter = 0
    let counter2 = 0
    let estudante = null;
    const counts = {};
    {props.dados.forEach(function (x) {
        counts[x.estudante] = (counts[x.estudante] || 0) + 1;
    });}

    if(props.tipoDeContrato) {
        return (

            <>
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
                    if(counts[item.estudante] < 15) {
                        if(item.turma == "Professor") {
                            return <LinhaTabelaCobranca _id={item._id} counter={counter}data={item.data} estudante={item.estudante} responsavel={item.responsavel} turma={"item.turma"} servico={item.servico} contrato={counts[item.estudante]} cobrado={item.cobrado} vencimento={item.vencimento}/>        
                        }
                        counter = counter + 1;
                    return <LinhaTabelaCobranca _id={item._id} counter={counter}data={item.data} estudante={item.estudante} responsavel={item.responsavel} turma={item.turma} servico={item.servico} contrato={counts[item.estudante]} cobrado={item.cobrado} vencimento={item.vencimento}/>
                    }
                    
                })}
                    
                </tbody>
            </table>
            <br/>
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
                if(item.turma == "Professor") {
                    counter = counter + 1;
                return <LinhaTabelaCobranca _id={item._id} counter={counter}data={item.data} estudante={item.estudante} responsavel={item.responsavel} turma={item.turma} servico={item.servico} contrato={counts[item.estudante]} cobrado={item.cobrado} vencimento={item.vencimento}/>
                }
                
            })}
                
            </tbody>
        </table>
            </>
        )
    } else {
        return (

            <>
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
                    return <LinhaTabelaCobranca _id={item._id} counter={counter}data={item.data} estudante={item.estudante} responsavel={item.responsavel} turma={item.turma} servico={item.servico} contrato={counts[item.estudante]} cobrado={item.cobrado} vencimento={item.vencimento}/>
                    }
                    
                })}
                    
                </tbody>
            </table>
            </>
        )
    }

    
}

export default TabelaCobrancas;