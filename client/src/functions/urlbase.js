//const BASE_URL = 'http://127.0.0.1:3000'
const BASE_URL = 'https://greatlakes.onrender.com'
const LOGIN_URL = "/login/login";
const ESCOLHASDODIA_URL = "/pedidos/getfortheday/";
const CARDAPIO_URL = "/cardapios/getall";
const INSEREALMOCO = "/pedidos/register";
const ESCOLHAS_URL = "/pedidos/getkidschoice/";
const REGISTER_URL = "/cardapios/register";
const ACOMPANHAMENTOS_URL = "/acompanhamentos/getall";
const REGISTRAACOMPANHAMENTOS_URL = "/acompanhamentos/register";
const ALTERASTATUS = "/pedidos/alterastatus/"
const RECUPERASENHA = "/login/recuperasenha"
const SENDEMAIL = "/sendmail"
const GETTURMA = "/getturma/"
const DELETE_URL = "/cardapios/remove/";
const DELETE_URL_ESCOLHAS = "/pedidos/remove/";
const DELETE_URL_ACOMPANHAMENTOS = "/acompanhamentos/deleta/"
const REGISTRA_COBRANCA = "/inserecobranca/register"
const CONSULTA_COBRANCA = "/inserecobranca/getdata"
const DELETA_COBRANCA = "/inserecobranca/remove/"
const STATUS_COBRANCA = "/inserecobranca/alterastatus"
const SUPORTE_EMAILS = "administracao@maplebeartaubate.com.br, rmoreira@maplebeartaubate.com.br, ihauke@maplebeartaubate.com.br"
const LISTADESERVICOS = "/listadeservicos/getall"
const GETALLKIDS = "/login/getallkids"
const GETALLESCOLHAS_V1 = "/escolhas/getall"
const DELETE_URL_V1 = "/escolhas/remove/"
const ESCOLHAS_URL_V1 = "/escolhas/getkidschoice/";
const INSEREALMOCO_v1 = "/escolhas/register";
const ESCOLHASDODIA_V1 = "/escolhas/escolhasdodia/";
const CONSULTACOBRANCA_V1 = "/escolhas/cobranca/";
const ALTERASTATUS_V1 = "/escolhas/alterastatus"
const REGISTRAALMOCOINFANTIL_V1 = "/almocoinfantil/register"
const GETKIDSINFANTILCHOICES_V1 = "/almocoinfantil/getkidschoice/"
const CONSULTACOBRANCAINFANTIL_V1 = "/almocoinfantil/cobranca/"
const ALTERASTATUSINFANTIL_V1 = "/almocoinfantil/alterastatus"
const CONSULTAALMOCOINFANTIL_V1 = "/almocoinfantil/escolhasdodia/"
const ALTERACOMEU_V1 = "/almocoinfantil/alterastatuscomeu/"

module.exports = {
  BASE_URL,
  LOGIN_URL,
  ESCOLHASDODIA_URL,
  CARDAPIO_URL,
  INSEREALMOCO,
  ESCOLHAS_URL,
  REGISTER_URL,
  ACOMPANHAMENTOS_URL,
  REGISTRAACOMPANHAMENTOS_URL,
  ALTERASTATUS,
  RECUPERASENHA,
  SENDEMAIL,
  GETTURMA,
  DELETE_URL,
  DELETE_URL_ESCOLHAS,
  REGISTRA_COBRANCA,
  DELETA_COBRANCA,
  SUPORTE_EMAILS,
  CONSULTA_COBRANCA,
  STATUS_COBRANCA,
  LISTADESERVICOS,
  GETALLKIDS,
  ESCOLHAS_URL_V1,
  INSEREALMOCO_v1,
  DELETE_URL_V1,
  DELETE_URL_ACOMPANHAMENTOS,
  GETALLESCOLHAS_V1,
  ESCOLHASDODIA_V1,
  CONSULTACOBRANCA_V1,
  ALTERASTATUS_V1,
  REGISTRAALMOCOINFANTIL_V1,
  GETKIDSINFANTILCHOICES_V1,
  CONSULTACOBRANCAINFANTIL_V1,
  ALTERASTATUSINFANTIL_V1,
  CONSULTAALMOCOINFANTIL_V1,
  ALTERACOMEU_V1 
};