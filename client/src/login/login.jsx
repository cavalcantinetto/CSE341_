import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../functions/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useCookies} from 'react-cookie';

const BASE_URL = 'http://127.0.0.1:3000'
const LOGIN_URL = "/login/login";


const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [cookie, setCookie] = useCookies(['accessToken', 'userData'])

  //use Effect will react when something happens
  //set focus onLoad
  useEffect(() => {
    userRef.current.focus();
  }, []);
  //clean message when login or pass changes
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            setAuth('');
            return
            
        }

        if(result?.body?.token && result?.body?.userData) {
          const accessToken = result?.body?.token;
          const userData = result?.body?.userData
          
          setAuth( {accessToken, userData} )
          setCookie('accessToken', accessToken, { path: '/' });
          setCookie('userData', userData, { path: '/' });
          navigate('/schedule')

        } else {
          setErrMsg('Login Falhou');
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
        errRef.current.focus();
    }
  }

  return (
    <div className="container d-flex justify-content-around">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
        crossorigin="anonymous"></link>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "p-3 mb-2 bg-danger text-white" : "d-none"}
          aria-live="assertive">
          {errMsg}
        </p>
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
          <p>
            Ainda não tem cadastro? <br />
            <span className="registerbutton">
              <Link to='/register'>Criar Cadastro</Link>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};
export default Login;
