import React from "react";
import { createRoot } from "react-dom/client";
import { NavBar } from "./components/navbar";
import { FooterElement } from "./components/footer";
import { CookiesProvider } from "react-cookie";
import Login from "./login/login";
import { AuthProvider } from "./functions/AuthProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import InsereCardapio from "./almocosgreatlakes/inserecardapio";
import SolicitaAlmoco from "./almocosgreatlakes/solicitaalmoco";
import PedidosDoDia from "./almocosgreatlakes/pedidosdodia";
import MyDocument from "./almocosgreatlakes/printcreator";
import RelatorioCobranca from "./almocosgreatlakes/relatoriocobranca";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <CookiesProvider>
        <BrowserRouter>
        <NavBar menu="Solicitação de Almoço, Inserir Cardápio, Pedidos do Dia, Relatório de Cobrança" />
        <Routes>
          <Route exact path="/*" element={<Login />}/>
          <Route exact path='glakes/inserecardapio' element={ <InsereCardapio/> }/>
          <Route exact path='glakes/pedidosdodia' element={ <PedidosDoDia/>}/> 
          <Route exact path='glakes/solicitaalmoco' element={ <SolicitaAlmoco/>}/>
          <Route exact path='glakes/printpedidos' element={ <MyDocument/>}/>
          <Route exact path='glakes/relatoriocobranca' element={ <RelatorioCobranca/>}/>
        </Routes>
        <FooterElement year="2023" />
        </BrowserRouter>
    </CookiesProvider>
  </AuthProvider>
);
