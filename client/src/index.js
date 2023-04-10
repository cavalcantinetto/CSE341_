import React from "react";
import { createRoot } from "react-dom/client";
import { NavBar } from "./components/navbar";
import { FooterElement } from "./components/footer";
import { CookiesProvider } from "react-cookie";
import Login from "./login/login";
import { AuthProvider } from "./functions/AuthProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Register} from './login/register'
import Schedule from "./schedule/schedule";
import InsertStudent from "./insertSchedule/insertstudent";
import InsereCardapio from "./almocosgreatlakes/inserecardapio";
import SolicitaAlmoco from "./almocosgreatlakes/solicitaalmoco";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <CookiesProvider>
        <BrowserRouter>
        <NavBar menu="Home, About Us, Kids" />
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/schedule' element={ <Schedule/>}/>
          <Route path='/insertstudent' element={ <InsertStudent/>}/>
          <Route path='/inserecardapio' element={ <InsereCardapio/> }/>
          {/* <Route path='/pedidosdodia' element={ <PedidosDoDia/>}/> */}
          <Route path='/solicitaalmoco' element={ <SolicitaAlmoco/>}/>
        </Routes>

        <FooterElement year="2023" />
        </BrowserRouter>
    </CookiesProvider>
  </AuthProvider>
);
