import MBTLogo from '../assets/images/logoMaple.png';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';


export function NavBar(props) {
  let [cookies, removeCookie] = useCookies();
  
  const navigate = useNavigate();
  const handleClick = ()=> {

    removeCookie('accessToken', { path: '/' })
    removeCookie('userData', { path: '/' })
    navigate('/');
   
  }
  const menu = props.menu.split(",");
  let userLevel;
  if (cookies.userData) {
    userLevel = cookies.userData.userLevel;
  }

  if(userLevel > 101) {
    return (
      <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-alert shadow p-3 mb-5 bg-white rounded">
          {" "}
          <a href="/">
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
              <Link to={'glakes/solicitaalmoco'} className="nav-link active">{menu[0]}</Link>
              </li>
              <li key="navBooks" className="nav-item">
              <Link to={'glakes/inserecardapio'} className="nav-link active">{menu[1]}</Link>
              </li>{" "}
              <li key="navStudent" className="nav-item">
              <Link to={'glakes/pedidosdodia'} className="nav-link active">{menu[2]}</Link>
              </li>{" "}
              <li key="navRelatorioFund" className="nav-item">
              <Link to={'glakes/relatoriocobranca'} className="nav-link active">{menu[3]}</Link>
              </li>
              <li key="navRelatorioInf" className="nav-item">
              <Link to={'glakes/relatorioalmocoinfantil'} className="nav-link active">{menu[4]}</Link>
              </li>{" "}
              <li key="navAlmocoDiarioInf" className="nav-item">
              <Link to={'glakes/almocodiarioinfantil'} className="nav-link active">{menu[5]}</Link>
              </li>{" "}

            </ul>{" "}
            </div>
            <div>
            <button
            className={cookies.accessToken ? "p-3 mb-2 bg-danger text-white rounded-pill float-right" : "d-none"} onClick={handleClick}>
            Sair do sistema
          </button>
            </div>
  
        </nav>{" "}
      </div>
      </>
    );
  } else {
    return (
      <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-alert shadow p-3 mb-5 bg-white rounded">
          {" "}
          <a href="/">
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
              <Link to={'glakes/solicitaalmoco'} className="nav-link active">{menu[0]}</Link>
              </li>
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
  
}
