import React from "react";
import { convertDate } from "../../components/dataconverted";
import LinhasDaTabela from "./linhasdatabela";

export default function EstruturaDaTabela(props) {
    console.log(props.dados)
    var counter = 0;

    return (
        <>
        <div className='container text-center bg-primary text-white'>
            <h4>{`Lista de Crianças Almoçando em ${convertDate(props.today)}`}</h4>
            </div>
            <div className="container text-center">
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">Ordem</th>
                <th scope="col">Estudante</th>
                <th scope="col">Turma</th>
                <th scope="col">Status</th>
                <th scope="col">Proteína</th>
                <th scope="col">Arroz e Feijão</th>
                <th scope="col">Salada</th>
                <th scope="col">Guarnição</th>
                <th scope="col">Submeter</th>
                </tr>
            </thead>
            <tbody>
                

            {props.dados.map((item) => {
                counter = counter + 1;
                return <LinhasDaTabela _id={item._id} counter={counter} estudante={item.estudante} turma={item.turma} proteina={item.proteina} arrozefeijao={item.arrozefeijao} guarnicao={item.guarnicao} salada={item.salada} />
                
            })} 
                
            </tbody>
        </table>
        </div>
        </>
    )

}