import React from "react";
import { createRoot } from "react-dom/client";
import { NavBar } from "./components/navbar";
import { FooterElement } from "./components/footer";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./functions/AuthProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./login/login";
import MyDocument from "./almocosgreatlakes/printcreator";
import SelecionaServicos from "./almocosgreatlakes/selecionaservicos";
import SolicitaAlmocoFundamental from "./almocosgreatlakes/solicitaalmoco/solicitaalmocofund";
import InsereCardapio from "./almocosgreatlakes/inserecardapio/inserecardapio";
import PedidosDoDia_v1 from "./almocosgreatlakes/pedidosdodia/pedidosdodia";
import RelatorioDeCobranca from "./almocosgreatlakes/relatorios/relatoriodecobranca";
import SolicitaAlmocoInfantil from "./almocosgreatlakes/almocoinfantil/solicitaalmocoinfantil";
import Erro from "./almocosgreatlakes/erro";
import RelatorioDeCobrancaInfantil from "./almocosgreatlakes/relatorios/relatorioinfantil/relatoriodecobranca";
import AlmocosInfantis from "./almocosgreatlakes/almocosinfantisdiarios/almocoinfantil";
import EnviarRelatorios from "./almocosgreatlakes/almocosinfantisdiarios/enviarrelatorios";
import MenuAdministrativo from "./almocosgreatlakes/administrativo/menuadministrativo";
import InsereUsuario from "./almocosgreatlakes/administrativo/insereusuario";
import Demonstracao from "./almocosgreatlakes/demonstracao/controledeativos";

const container = document.getElementById("root");
const root = createRoot(container);
const basepath = "services/glakes/"
try {
  root.render(
    <AuthProvider>
      <CookiesProvider>
          <BrowserRouter basename="/services/">
          <NavBar menu="Solicitação de Almoço, Inserir Cardápio, Pedidos do Dia, Administração do sistema " />
          <Routes>
            <Route exact path="/*" element={<Login />}/>
            <Route exact path='glakes/inserecardapio' element={ <InsereCardapio/> }/>
            <Route exact path='glakes/pedidosdodia' element={ <PedidosDoDia_v1/>}/> 
            <Route exact path='glakes/solicitaalmocofundamental' element={ <SolicitaAlmocoFundamental/>}/>
            <Route exact path='glakes/printpedidos' element={ <MyDocument/>}/>
            <Route exact path='glakes/relatoriocobranca' element={ <RelatorioDeCobranca/>}/>
            <Route exact path='glakes/selecionaservicos' element={ <SelecionaServicos/>}/>
            <Route exact path='glakes/solicitaalmocoinfantil' element={ <SolicitaAlmocoInfantil/>}/>
            <Route exact path='glakes/relatorioalmocoinfantil' element={ <RelatorioDeCobrancaInfantil/>}/>
            <Route exact path='glakes/almocodiarioinfantil' element={ <AlmocosInfantis />}/>
            <Route exact path='glakes/enviarelatorioinfantil' element={ <EnviarRelatorios />}/>
            <Route exact path='glakes/menuadministrativo' element={ <MenuAdministrativo />}/>
            <Route exact path='glakes/insereusuario' element={ <InsereUsuario />}/>
            
          </Routes>
          <FooterElement month="October" year="2023" />
          </BrowserRouter>
      </CookiesProvider>
    </AuthProvider>
  );
} catch {
  root.render(
    <Erro />
  )
}

