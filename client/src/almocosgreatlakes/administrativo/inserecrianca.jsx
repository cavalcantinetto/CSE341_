import React from "react";
import { useForm } from 'react-hook-form';

export default function InsereCrianca(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);


    return (
      <div className="border p-3">
        <div className="mb-3">
          <label>Nome da criança {props.numero}:</label>
          <input
            onChange={(e) => props.handleCrianca(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Bruce Wayne Junior"
          />
        </div>
        <div className="row g-3 align-items-center mb-3">
          <label className="col-auto">Turma da criança {props.numero}: </label>
          <select
            className="col-auto"
            onChange={(e) => {
              props.handleTurma(e.target.value);
            }}>
            <option value="false">Escolha uma turma...</option>
            <option value="Early Toddler">Early Toddler</option>
            <option value="Toddler">Toddler</option>
            <option value="Nursery">Nursery</option>
            <option value="JK">JK</option>
            <option value="SK">SK</option>
            <option value="Year 1">Year 1</option>
            <option value="Year 2">Year 2</option>
            <option value="Year 3">Year 3</option>
            <option value="Year 4">Year 4</option>
            <option value="Year 5">Year 5</option>
            <option value="Year 6">Year 6</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
          </select>
        </div>
        <div>
        <label className="col-auto">Turno da criança {props.numero}:  </label>
          <select
            className="col-auto m-2"
            onChange={(e) => {
              props.handleTurno(e.target.value);
            }}>
          <option value="false">Escolha o turno</option>
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
         
          <input type="radio" id="tarde" name="tarde" value="tarde" />
          </select>
        </div>
      </div>
    );
}