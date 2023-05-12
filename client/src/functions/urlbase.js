const BASE_URL = 'http://127.0.0.1:3000'
// const BASE_URL = 'https://greatlakes.onrender.com'
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

module.exports = {BASE_URL, LOGIN_URL, ESCOLHASDODIA_URL, CARDAPIO_URL, INSEREALMOCO, ESCOLHAS_URL, REGISTER_URL, ACOMPANHAMENTOS_URL, REGISTRAACOMPANHAMENTOS_URL, ALTERASTATUS, RECUPERASENHA, SENDEMAIL, GETTURMA, DELETE_URL}