import React, { useState } from "react";
import Loading from "../../components/loading";

export default function EscolhaDeProteinas(props) {

    //Mensagem temporária enquanto cliente não escolhe a data.
    if (!props.cardapio.proteinas) {
        return (
            <div className="container rounded-3 shadow p-2 mb-2">
                <div className="container text-center">
                    <strong>Aguardando escolha da data ...</strong>
                </div>
            </div>
        )

    }
    return (
        <>
        <div className="container rounded-3 shadow p-2 mb-2 mt-2"
                role="group"
                aria-label="Basic checkbox toggle button group">
                    
        <div className="d-flex justify-content-center flex-column  ">
        <div className="container text-center">
            <h3>Escolha a proteína do dia:</h3>
        </div>
                    {props.cardapio.proteinas.map((item) => {
                      return (
                        <>
                          <input
                            type="radio"
                            className="btn-check"
                            name="options"
                            id={item}
                            autoComplete="off"
                            value={item}
                            key={props.cardapio._id}
                            onClick={(e) => {
                               if (e.target.checked) {
                                props.handleClickProteina(e.target.value);
                              }
                            }
                        }
                          />
                          <label
                            className="btn btn-outline-primary m-2 w-50 align-self-center"
                            htmlFor={item}
                          >{item}</label>
                        </>
                      )}
                    )}
        </div>
        </div>
        
        </>
 )

}