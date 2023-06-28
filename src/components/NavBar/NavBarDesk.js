import './NavBarDesk.css';
import {Link} from 'react-router-dom';
import logoPrincipal from '../../imagenes/ISOLOGO-FOSTERS.png';
import logoPrincipalTexto from '../../imagenes/LOGO-FOSTERS.png';
import CartWidget from '../CartWidget/CartWidget';
import UserLogin from '../User/User';

function NavBarDesk({cantidadCarrito, estaEnSupPage}) {

    const HideNavBar = () => {
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (150 > currentScrollPos) {
                document.getElementById('navBar').style.background = '';
                document.getElementById('navBar').style.height = '135px';
                document.getElementById('navBar').style.paddingBottom = '0';
                document.getElementById('navBar').style.borderRadius = '0'
                document.getElementById('logo-navBar').src = logoPrincipal;
                document.getElementById('logo-navBar').style.marginBottom = '0';
            } else {
                document.getElementById('navBar').style.background = '#a9a0a0ea';
                document.getElementById('navBar').style.height = '120px';
                document.getElementById('navBar').style.paddingBottom = '20px';
                document.getElementById('navBar').style.borderBottomLeftRadius = '30px';
                document.getElementById('navBar').style.borderBottomRightRadius = '30px';
                document.getElementById('logo-navBar').src = logoPrincipalTexto;
                document.getElementById('logo-navBar').style.marginBottom = '-20px';
                document.getElementById('navBar').style.boxShadow = '-12px 15px 35px -4px #afafaf40';
                /* document.getElementsByClassName('list-text').style.color = '#000000' */
            }
        }
    }
    HideNavBar();

    if(estaEnSupPage !== '/') {
        return(
            <div className="navbar" id='top-landig-page'>
                <div className="background"></div>
                <div className="container-navigation" id='navigation'>
                <nav className="navigation" id='navBar'>
                        <div className='container-logo-marca' id='logo-nav-bar'>
                            <Link to = {'/'}>
                                <img id='logo-navBar' className='logo-pagina' alt='Logo' src={logoPrincipal}></img>
                            </Link>
                        </div>
                        <ul className='navbar-style'>
                            <li className="list" id='title-clientes' >
                                <Link to = {'/'}>
                                    <h2 className='list-text'>Nosotros</h2>
                                </Link>
                            </li>
                            <li className="list" id='title-productos' >
                                <Link to = {'/productos'}>
                                    <h2 className='list-text'>Productos</h2>
                                </Link>
                            </li>
                            <li className="list" id='title-nosotros' >
                                <Link to = {'/'}>
                                    <h2 className='list-text'>Contacto</h2>
                                </Link>
                            </li>
                            <li className='list-carrito'>
                                <Link to = {'/carrito'}>
                                    <CartWidget inicial={cantidadCarrito}/>
                                </Link>
                            </li>
                            <li className='list-user'>
                                <Link to = {'/login'}>
                                    <UserLogin/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
    return (
        <div className="navbar" id='top-landig-page'>
            <div className="background"></div>
            <div className="container-navigation">
            <nav className="navigation" id='navBar'>
                    <div className='container-logo-marca' id='logo-nav-bar'>
                        <a href='#top-landig-page'>
                            <img id='logo-navBar' className='logo-pagina' alt='Logo' src={logoPrincipal}></img>
                        </a>
                    </div>
                    <ul className='navbar-style'>
                        <li className="list" id='title-clientes' >
                            <a href='#section-nosotros'>
                                <h2 className='list-text'>Nosotros</h2>
                            </a>
                        </li>
                        <li className="list" id='title-productos' >
                            <Link to = {'/productos'}>
                                <h2 className='list-text'>Productos</h2>
                            </Link>
                        </li>
                        <li className="list" id='title-nosotros' >
                            <a href='#section-footer'>
                                <h2 className='list-text'>Contacto</h2>
                            </a>
                        </li>
                        <li className="list" id='title-carrito'>
                            <Link to = {'/carrito'}>
                                <CartWidget inicial={cantidadCarrito}/>
                            </Link>
                        </li>
                        <li className="list-user" id='title-user'>
                            <Link to = {'/login'}>
                                <UserLogin/>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NavBarDesk;