import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../functions/AuthProvider";
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie';
import {BASE_URL, LOGIN_URL, RECUPERASENHA, SENDEMAIL} from '../functions/urlbase';
import Loading from '../components/loading'


const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies()
  const [loading, setLoading] = useState();



  //use Effect will react when something happens
  //set focus onLoad
  useEffect(() => {
    userRef.current.focus();
    removeCookie('accessToken', { path: '/' })
    removeCookie('userData', { path: '/' });

  }, []);
  //clean message when login or pass changes
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(oldValue => oldValue = true);
    try {
        const data = {
            'email': user,
            'password': pwd
        }
        const response = await fetch(BASE_URL+LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = (await response.json());
        if (!result.Headers) {
            const errMessage = result?.message
            setErrMsg(errMessage)
            setLoading(oldValue => oldValue = false);
            removeCookie('accessToken', { path: '/' })
            removeCookie('userData', { path: '/' });
            return
            
        }

        if(result?.body?.token && result?.body?.userData) {
          const accessToken = result?.body?.token;
          const userData = result?.body?.userData

          removeCookie('accessToken')
          removeCookie('userData');

          setAuth( {accessToken, userData} )
          setCookie('accessToken', accessToken, { path: '/' });
          setCookie('userData', userData, { path: '/' });
          
          //if considerando o nível do usuário começando pelo 100 - usuário padrão
          
         if (userData.userLevel > 110) {
          setLoading(oldValue => oldValue = false);
          return navigate('glakes/inserecardapio')
         } 
         if (userData.userLevel == 110){
          setLoading(oldValue => oldValue = false);
          return navigate('glakes/pedidosdodia')
         } 
         if (userData.userLevel < 110) {
          setLoading(oldValue => oldValue = false);
          return navigate('glakes/solicitaalmoco')
         }
        } else {
          setErrMsg('Login Falhou');
          setLoading(oldValue => oldValue = false);
          errRef.current.focus();
        } 

    } catch (error) {
        if(!error?.response) {
            setErrMsg('O servidor não está respondendo');
        } else if(error?.response?.status === 400) {
            setErrMsg("O email ou o password inválidos");
        } else if(error?.response?.status === 401) {
            setErrMsg("Não autorizado");
        } else {
            setErrMsg('Login Falhou');
        }
        setLoading(oldValue => oldValue = false);
        errRef.current.focus();
    }
  }

  const handleEsqueciASenha = async(e) => {
    setLoading(oldValue => oldValue = true)
    e.preventDefault();
    if(!user) {
      setErrMsg('Precisa digitar um e-mail válido');
      // errRef.current.focus();
    } else {
      try {
        const data = {
          'email': user
          
      }
      const response = await fetch(BASE_URL + RECUPERASENHA, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if(response.ok) {
        const result = await response.json();
          const data = {
            'emailto': user,
            'message': `Você solicitou a recuperação da sua senha.\n
            Sua senha é: ${result.userPass}.\n
            Caso não tenha sido você o solicitante da senha, por favor entre em contato com a secretaria da escola.`
        }
        try {

        const response = await fetch(BASE_URL + SENDEMAIL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!result) {
            const errMessage = result?.message
            setErrMsg(errMessage)
            setAuth('');
            // errRef.current.focus();
        
        } else {
            const errMessage = result?.message
            setErrMsg(errMessage)
            setAuth('');
            // errRef.current.focus();
        }
            
        } catch(err) {
          setErrMsg('A recuperação de senha falhou');
          // errRef.current.focus();
        }
      } else {
        setErrMsg('Esse endereço de email não foi encontrado na base de dados.\n Confirme se você digitou corretamente ou entre em contato com a secretaria da escola.');
        // errRef.current.focus();
      }

      } catch(err) {
        setErrMsg('A recuperação de senha falhou');
        // errRef.current.focus();
      }
    }
    setLoading(oldValue => oldValue = false);
  }

  if (loading) {
    return <Loading/>
  } else {
    return (<>
      <div>
         <p
            ref={errRef}
            className={errMsg ? "p-3 mb-2 bg-danger text-white d-flex justify-content-center" : "d-none"}
            aria-live="assertive">
            {errMsg}
          </p>

      </div>
      <div className="container d-flex justify-content-around">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossorigin="anonymous"></link>
        <section>
          <form className="form-signin" onSubmit={handleSubmit}>
            
            <div className="d-flex justify-content-around">
              <h1>Login</h1>
            </div>

            <label htmlFor="username" className="sr-only">
              Email:
            </label>
            <input
              className="form-control mt-2"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              required
            />
            <label htmlFor="username" className="sr-only">
              Password:
            </label>
            <input
              className="form-control mt-2"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="btn btn-lg btn-primary btn-block mt-2">
              Sign In
            </button>
          </form>
          <div className="d-flex justify-content-around mt-3">
              <span className="registerbutton">
              <button type="submit" onClick={handleEsqueciASenha}>Recuperar Senha</button>
              </span>
          </div>
        </section>
      </div></>
    );
  };
}
export default Login;
