import './NavBarMobile.css';
import {Link} from 'react-router-dom';
import logoPrincipalTexto from '../../imagenes/ISOTIPO-FOSTERS-NEGRO.png';
import CartWidget from '../CartWidget/CartWidget';
import UserLogin from '../User/User';   

function NavBarMobile({cantidadCarrito, estaEnSupPage}) {
    function DesplegarMenu() {
        document.getElementById('navbar-list-responsive').style.display = 'flex';
        document.getElementById('open').style.display = 'none';
        document.getElementById('close').style.display = 'flex';
    }

    function GuardarMenu() {
        if(document.getElementById('navbar-list-responsive')) {
            document.getElementById('navbar-list-responsive').style.display = 'none';
            document.getElementById('open').style.display = 'flex';
            document.getElementById('close').style.display = 'none';
        }
    }

    //Si se detecta un click guardar el menú
    document.addEventListener("click", GuardarMenu());

    if(estaEnSupPage !== '/') {
        return (
            <div className="navbar" id='top-landig-page'>
                <div className="background"></div>
                <div className="container-navigation">
                    <nav id='navigation-responsive' className='navigation-responsive'>
                        <div className='navbar-responsive-fijo'>
                            <div className='container-logo-marca-responsive' id='logo-nav-bar'>
                                <Link to = {'/'}>
                                    <img className='logo-pagina-responsive' alt='Logo' src={logoPrincipalTexto}></img>
                                </Link>
                            </div>
                            <div id='open' className='container-open' onClick={() => DesplegarMenu()}>
                                <div className="open">
                                    <ion-icon name="menu-outline" size='large'></ion-icon>
                                </div>
                            </div>
                            <div id='close' className='container-close' onClick={() => GuardarMenu()}>
                                <div className="cerrar">
                                    <ion-icon name="close-outline" size='large'></ion-icon>
                                </div>
                            </div>
                        </div>
                        <ul className='navbar-list-responsive' id='navbar-list-responsive'>
                            <li className="list-responsive" id='title-clientes' >
                                <Link to = {'/'}>
                                    <h2 className='list-text-responsive'><ion-icon name="file-tray-full-outline"></ion-icon>Nosotros</h2>
                                </Link>
                            </li>
                            <li className="list-responsive" id='title-productos' >
                                <Link to = {'/productos'}>
                                    <h2 className='list-text-responsive'><ion-icon name="hammer-outline"></ion-icon>Productos</h2>
                                </Link>
                            </li>
                            <li className="list-responsive" id='title-nosotros' >
                                <Link to = {'/'}>
                                    <h2 className='list-text-responsive'><ion-icon name="people-outline"></ion-icon>Contacto</h2>
                                </Link>
                            </li>
                            <li className="list-responsive" id='title-carrito'>
                                <Link to = {'/carrito'}>
                                    <h2 className='list-text-responsive'><Link to = {'/carrito'}><CartWidget inicial={cantidadCarrito}/></Link>Carrito</h2>
                                </Link>
                            </li>
                            <li className="list-responsive" id='title-login'>
                                <Link to = {'/login'}>
                                    <h2 className='list-text-responsive'><Link to = {'/login'}><UserLogin/></Link>Sesión</h2>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="bottom-gradiente"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="navbar" id='top-landig-page'>
            <div className="background"></div>
            <div className="container-navigation">
                <nav id='navigation-responsive' className='navigation-responsive'>
                    <div className='navbar-responsive-fijo'>
                        <div className='container-logo-marca-responsive' id='logo-nav-bar'>
                            <a href='#top-landig-page'>
                                <img className='logo-pagina-responsive' alt='Logo' src={logoPrincipalTexto}></img>
                            </a>
                        </div>
                        <div id='open' className='container-open' onClick={() => DesplegarMenu()}>
                            <div className="open">
                                <ion-icon name="menu-outline" size='large'></ion-icon>
                            </div>
                        </div>
                        <div id='close' className='container-close' onClick={() => GuardarMenu()}>
                            <div className="cerrar">
                                <ion-icon name="close-outline" size='large'></ion-icon>
                            </div>
                        </div>
                    </div>
                    <ul className='navbar-list-responsive' id='navbar-list-responsive'>
                        <li className="list-responsive" id='title-clientes' >
                            <a href='#section-nosotros'>
                                <h2 className='list-text-responsive'><ion-icon name="file-tray-full-outline"></ion-icon>Nosotros</h2>
                            </a>
                        </li>
                        <li className="list-responsive" id='title-productos' >
                            <Link to = {'/productos'}><h2 className='list-text-responsive'><ion-icon name="hammer-outline"></ion-icon>Productos</h2></Link>
                        </li>
                        <li className="list-responsive" id='title-nosotros' >
                            <a href='#section-footer'>
                                <h2 className='list-text-responsive'><ion-icon name="people-outline"></ion-icon>Contactanos</h2>
                            </a>
                        </li>
                        <li className="list-responsive" id='title-carrito'>
                            <h2 className='list-text-responsive'><Link to = {'/carrito'}><CartWidget inicial={cantidadCarrito}/></Link>Carrito</h2>
                        </li>
                        <li className="list-responsive" id='title-login'>
                            <Link to = {'/login'}>
                                <h2 className='list-text-responsive'><Link to = {'/login'}><UserLogin/></Link>Sesión</h2>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="bottom-gradiente"></div>
            </div>
        </div>
    );
}

export default NavBarMobile;