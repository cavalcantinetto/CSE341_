import { useContext } from 'react';
import MBTLogo from '../assets/images/logoMaple.png';
import AuthContext from "../functions/AuthProvider";
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';
import SolicitaAlmoco from '../almocosgreatlakes/solicitaalmoco';


export function NavBar(props) {
  const {auth, setAuth} = useContext(AuthContext);
  let [cookies, setCookie] = useCookies();
  
  const navigate = useNavigate();
  const handleClick = ()=> {
    setAuth('')
    setCookie('accessToken', '')
    setCookie('userData', '')
    navigate('/');
   
  }
  const menu = props.menu.split(",");
  return (
    <>
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-alert shadow p-3 mb-5 bg-white rounded">
        {" "}
        <a href="http://localhost:3001/">
          <img
            src={MBTLogo}
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block align-text-center me-5"
          />
        </a>{" "}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {" "}
            <li key="navHome" className="nav-item">
            <Link to={'solicitaalmoco'} className="nav-link active">{menu[0]}</Link>
            </li>
            <li key="navBooks" className="nav-item">
            <Link to={'inserecardapio'} className="nav-link active">{menu[1]}</Link>
            </li>{" "}
            <li key="navStudent" className="nav-item">
            <Link to={'pedidosdodia'} className="nav-link active">{menu[2]}</Link>
            </li>{" "}
          </ul>{" "}
          </div>
          <div className=''>
          <button
          className={cookies.accessToken ? "p-3 mb-2 bg-danger text-white rounded-pill float-right" : "d-none"} onClick={handleClick}>
          Sair do sistema
        </button>
          </div>

      </nav>{" "}
    </div>
    </>
  );
}
