import React from "react";
import { useState } from "react";
import Loading from "../../components/loading";



export default function EscolhaDeAcompanhamentos(props) {
    var acompanhamentos;
    //const [acompanhamentosEscolhidos, props.acompanhamentosEscolhidos] = useState([])
    if (props.cardapio) {
        acompanhamentos = props.cardapio.acompanhamentos;
    }

    //Mensagem temporária enquanto cliente não escolhe a data.
    if (!props.cardapio.acompanhamentos) {
        return (
            <div className="container rounded-3 shadow p-2 mb-2">
                <Loading />
            </div>
        )
    }

    return (
        <>
        <div className="container rounded-3 shadow p-2 mb-2"
                role="group"
                aria-label="Basic checkbox toggle button group">
            <div
                className="container p-2 mb-2"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <div className="container text-center">
                <label
                  htmlFor="selectacompanhamento"
                  className="form-label m-3"
                  key={props.cardapio.acompanhamentos[3]}
                >        
                
                  Escolha até três acompanhamentos:{" "}
                </label><br/>
                {
                    props.cardapio.acompanhamentos.map((item) => {
                        return (
                            <>
                              <input
                                type="checkbox"
                                className="btn-check"
                                id={item}
                                autoComplete="off"
                                value={item}
                                key={props.cardapio._id}
                                onClick={(e) => {
                                  if (e.target.checked) {
                                      if (props.acompanhamentos.length >= 3) {
                                        e.target.checked = false;
                                        props.handleClickAcompanhamentos([...props.acompanhamentos])
                                        return //[...oldValue];
                                      }
                                      if (!props.acompanhamentos.includes(e.target.value)) {
                                        e.target.checked = true;
                                        props.handleClickAcompanhamentos([...props.acompanhamentos, e.target.value])
                                        return //[...oldValue, e.target.value];
                                      }
                                      return //[...oldValue];
                                    
                                  } else {
                                      if (props.acompanhamentos.includes(e.target.value)) {
                                        e.target.checked = false;
                                        props.acompanhamentos.splice(
                                          props.acompanhamentos.indexOf(e.target.value),
                                          1
                                        );
                                        props.handleClickAcompanhamentos([...props.acompanhamentos])
                                        return //[...oldValue];
                                      }
                                      props.handleClickAcompanhamentos([...props.acompanhamentos])
                                      return //[...oldValue];
                                    };
                                }}
                              />
                              <label
                                className="btn btn-outline-primary m-2 w-50 align-self-cente"
                                htmlFor={item}
                              >
                                {item}
                              </label>
                              
                            </>
                          );
                    })
                }
                <br />
                <span>
                  <small>
                    Instruções: A salada é servida livremente, mesmo que você não opte pela salada no prato.
                  </small>
                </span>
                </div>
                
            </div>
 
        </div>
        </>
 )

}