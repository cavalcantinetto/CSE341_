import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BotoesOpcoes(props) {
  let navigate = useNavigate();
  function newRoute(url) {
    navigate(url);
  }
 return (
    <>
    <input
                            type="radio"
                            className="btn-check"
                            name={props.keyname}
                            id={props.keyname}
                            key={props.keyname}
                            autoComplete="off"
                            value={props.keyname}
                            onClick={(e) => {
                              // e.preventDefault();
                              //levar para o endereco
                              newRoute(props.url);
                              }
                            }
                          />
                          <label
                            className="btn btn-outline-primary m-2 w-50 align-self-center"
                            htmlFor={props.keyname}>{props.nome}</label>  
                             </>
 )}