import React from "react";
import {useCookies} from 'react-cookie';
import { RenderLogin } from "./loginform";
const serverAPI = 'http://localhost:3000';
const serviceAPI = '/login/login'


const baseURL = new URL(serverAPI+serviceAPI);

export function LoginPage() {
   const [logedIn, setLogedIn] = React.useState(false);
   const [cookies, setCookie] = useCookies(['token']);


  async function HandleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('InputEmail1').value;
    const password = document.getElementById('InputPassword1').value;
    const data = {
        email: email,
        password: password
    }
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'mode': "cors"
      },
      body: JSON.stringify(data)
    });
    if(res.ok) {
        const result = await res.json();
        setPhrase("Bem-vindo ao sistema BookClub MBT");
        setCookie('token', result.token, { path: '/' });
        setLogedIn(true);
        
        console.log(res.status);
    } else {
        if(res.status === 401) {
            return
            
        }
        if (res.status === 404) {
            return
        }
        if (res.status === 400) {
            return 
        } 
        if(!res.status) {
            return
        }
    }

  }
  if (!logedIn) {
    return (
    <div>
    <RenderLogin handleClick={HandleSubmit} />
    </div>
    )
  } 
return (
    <div>
      <p>Deu certo</p>
    </div>
    );
  }