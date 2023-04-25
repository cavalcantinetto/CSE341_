import React from "react";
import { useCookies } from "react-cookie";
import { useRef, useState } from "react";
import { BASE_URL, ALTERASTATUS } from "../functions/urlbase";


const BotoesStatus = (props) => {

    const [cookies, setCookies] = useCookies();
    const [pratoPronto, setPratoPronto] = useState()

    async function alteraStatus(id, statusPratoPronto, statusPratoServido) {
          
            try {
            let data = {
                _id: id,
                status: {
                    pratopronto: statusPratoPronto,
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
                alert("aconteceu algo errado, tente novamente mais tarde.");
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
          defaultChecked={props.item.status.pratopronto}
          onClick={(e) => {
            if (e.target.checked) {

                alteraStatus(props.item._id, true, props.item.status.pratoservido);
                setPratoPronto(oldValue => !oldValue)

            } else {
            
              alteraStatus(props.item._id, false, props.item.status.pratoservido);
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
          defaultChecked={props.item.status.pratoservido}
          onClick={(e) => {
            if (e.target.checked) {
                alteraStatus(props.item._id, props.item.status.pratopronto, true);
                
            } else {
                alteraStatus(props.item._id, props.item.status.pratopronto, false);
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
