import React, { useRef, useState } from "react";

export default function InsereDatas(props) {
    const {errMsg, setErrMsg} = useState();
    const dataInicial = useRef();
    const dataFinal = useRef();
    const [verTipoDeContrato, setVerTipoDeContrato] = useState("Ver Mensais")


    function alteraNomeDoBotao() {
      if(verTipoDeContrato == "Ver Mensais") {
        setVerTipoDeContrato("Ver Diárias");
        props.handleTipoDeContrato("Mensais")
      } if(verTipoDeContrato == "Ver Diárias") {
        setVerTipoDeContrato("Ver Staff")
        props.handleTipoDeContrato("Diarias")
      }if(verTipoDeContrato == "Ver Staff") {
        setVerTipoDeContrato("Ver Mensais")
        props.handleTipoDeContrato("Staff")
      }
     
    }


    return (
        <>
        <div className="container text-center">
              <p
                className={errMsg ? "p-3 mb-2 bg-danger text-white" : "d-none"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <p>Escolha a data inicial e a data final para gerar o relatório. Observe que o sistema apura os mensalistas pela quantidade de pedidos no período selecionado, portanto, utilize sempre meses completos (primeiro ao último dia) para realizar a cobrança.</p>
    
              <div className="form-floating mb-3">
                <input
                type="date"
                className="form-control"
                id="floatingDateIni"
                onChange={(e)=>{
                    console.log(e.target.value)
                    dataInicial.current = e.target.value;
                }}
                />
                <label htmlFor="floatingDateIni">Data Inicial</label>
              </div>
            </div>
    
            <div className="container text-center">
              <div className="form-floating mb-3">
                <input
                type="date"
                className="form-control"
                id="floatingDateFin"
                onChange={(e)=>{
                    dataFinal.current = e.target.value;
                }}
                />
                <label htmlFor="floatingDateFin">Data Final</label>
              </div>
              <div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block m-3"
                  onClick={(e)=> {
                    if(!dataInicial.current || !dataFinal.current) {
                       return alert("É necessário preencher data inicial e data Final.")
                    }
                    if(dataInicial.current > dataFinal.current) {
                       return  alert("A data inicial não pode ser posterior à data final.")
                    }
                    props.handleDatas(new Date(dataInicial.current).toISOString(), new Date(dataFinal.current).toISOString())

                  }}
                  >
                  Filtrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block m-3"
                  onClick={(e)=> {
                    alteraNomeDoBotao();
                  }}
                >{verTipoDeContrato}
                </button>
              </div>
              </div>
            </div>
            </>
    )
}