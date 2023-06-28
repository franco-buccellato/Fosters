import './App.css';
/* import NavBarGestor from './components/NavBar/NavBarGestor'; */
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {CartContextProvider} from './components/Context/CartContext';
import { UsuarioContextProvider } from './components/Context/UsuarioContext';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import LandingPage from './components/LandingPage/LandingPage';
/* import Footer from './components/Footer/Footer'; */
import CartListContainer from './components/CartListContainer/CartListContainer';
import Login from './components/Login/Login';
import Usuarios from './components/Usuarios/Usuarios';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

import Encabezado from './components/Encabezado/Encabezado';

function App() {

  const [cantidad, setCantidad] = useState(0);

  const handleOnAdd = (nuevaCantidad) => {
    setCantidad(cantidad + nuevaCantidad);
  }
  return (
    <UsuarioContextProvider>
      <CartContextProvider onAdd={handleOnAdd}>
        <BrowserRouter>
          {/* <NavBarGestor/> */}
          <Encabezado/>
{          <Routes>
            <Route exact path = '/' element = {<LandingPage/>}/>
            <Route exact path = '/productos' element = {<div className='section-item-list-container' id='section-productos'><ItemListContainer/></div>}/>
            <Route exact path = '/usuarios' element = {<div className='section-usuarios' id='section-productos'><Usuarios/></div>}/>
            <Route exact path = '/carrito' element = {<CartListContainer/>}/>
            <Route exact path = '/login' element = {<Login/>}/>
            <Route exact path = '/detail/:productId' element = {<ItemDetailContainer/>}/>
          </Routes>}
        </BrowserRouter>
      </CartContextProvider>
    </UsuarioContextProvider>
  );
}

export default App;
