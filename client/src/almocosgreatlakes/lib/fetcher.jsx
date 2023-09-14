import React from "react";

const fetcher = (url, cookies, args, dados)=> {

    //Se nao tiver argumentos, presumo ser um GET
    if(!args) {
        const data = fetch((url), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer  ${cookies.accessToken}`,
            },
          }).then((res) => res.json());
          return data;  
        }
    if(!dados) {
      const data = fetch((url), {
        method: args,
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer  ${cookies.accessToken}`,
        },
      }).then((res) => res.json());
      return data;  

    }
}
    
    

export default fetcher;