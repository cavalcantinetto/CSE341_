import React from "react";
import { useCookies } from "react-cookie";
import { useRef, useState } from "react";
import { BASE_URL, ALTERASTATUS } from "../functions/urlbase";


const BotoesStatus = (props) => {

    const [cookies, setCookies] = useCookies();
    const [pratoPronto, setPratoPronto] = useState(props.item.status.pratopronto)
    const [pratoServido, setPratoServido] = useState(props.item.status.pratoservido);

    async function alteraStatusPratoPronto(id, statusPratoPronto, pratoServido) {
          
            try {
            let data = {
                _id: id,
                status: {
                    pratopronto: statusPratoPronto,
                    pratoservido: pratoServido
                }
                
            }
            const status = await fetch(BASE_URL+ALTERASTATUS+id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer  ${cookies.accessToken}`,
                  },
                  body: JSON.stringify(data)
            })
            if(!status) {
                alert("aconteceu algo errado, o status não foi registrado.\nTente novamente mais tarde.");
                return;
            } if(status.ok) {
                const res = await status.json();

                return;
            }
           
        } catch (err) {
            return;
        }
      }
      async function alteraStatusPratoServido(id, statusPratoServido, pratoPronto) {
          
        try {
        let data = {
            _id: id,
            status: {
              pratopronto: pratoPronto,
              pratoservido: statusPratoServido
          }
            
        }
        const status = await fetch(BASE_URL+ALTERASTATUS+id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer  ${cookies.accessToken}`,
              },
              body: JSON.stringify(data)
        })
        if(!status) {
            alert("aconteceu algo errado, o status não foi registrado.\nTente novamente mais tarde.");
            return;
        } if(status.ok) {
            const res = await status.json();
            return;
        }
       
    } catch (err) {
        return;
    }
  }
    
  return (
    <>
      <div
        className="container border p-2 mb-2 align-self-end"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          className="btn-check"
          id={"pratopronto" + props.item._id}
          autoComplete="off"
          defaultChecked={pratoPronto}
          onClick={(e) => {
            if (e.target.checked) {

              setPratoPronto(true)
              alteraStatusPratoPronto(props.item._id, true, pratoServido);

            } else {
              alteraStatusPratoPronto(props.item._id, false, pratoServido);
              setPratoPronto(false)
            }
          }}
        />
        <label
          className="btn btn-outline-primary m-2"
          htmlFor={"pratopronto" + props.item._id}
        >
          Prato Pronto
        </label>
      </div>
      <div
        className="container border p-2 mb-2 "
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          className="btn-check"
          id={"pratoservido" + props.item._id}
          autoComplete="off"
          defaultChecked={pratoServido}
          onClick={(e) => {
            if (e.target.checked) {

               alteraStatusPratoServido(props.item._id, true, pratoPronto);
               setPratoServido(true)
            } else {
               alteraStatusPratoServido(props.item._id, false, pratoPronto);
               setPratoServido(false)
            }
          }}
        />
        <label
          className="btn btn-outline-primary m-2"
          htmlFor={"pratoservido" + props.item._id}
        >
          Prato Servido
        </label>
      </div>
    </>
  );
};

export default BotoesStatus;
