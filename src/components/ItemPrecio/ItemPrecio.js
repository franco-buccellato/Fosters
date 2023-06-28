import './ItemPrecio.css';
import { useContext, useEffect } from 'react';
import UsuarioContext from '../Context/UsuarioContext';

const ItemPrecio = ({precioProducto}) => {
    
    const {usuario, estaLogueado, esClienteDirecto} = useContext(UsuarioContext);
    let descuentoFinal = usuario !== undefined ? usuario.descuento : 1;


    if(esClienteDirecto() && usuario.descuento === 1) {
        return(
            <div className='price-container'>
                <span className="price-span-descuento">
                    {
                        'Precio Bruto: $' + (precioProducto).toFixed(2)
                    }
                </span>
                <span className="price-span-ganancia">
                    {
                        'Precio Final: $' + ((precioProducto * descuentoFinal) + ((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                    }
                </span>
            </div>
        )
    } else if(esClienteDirecto()) {
        return(
            <div className='price-container'>
                <span className="price-span-normal">
                    {
                        'Precio Bruto: $' + (precioProducto).toFixed(2)
                    }
                </span>
                <span className="price-span-descuento">
                    {
                        'Precio c/Descuento: $' + (precioProducto * descuentoFinal).toFixed(2)
                    }
                </span>
                <span className="price-span-ganancia">
                    {
                        'Precio Final: $' + ((precioProducto * descuentoFinal) + ((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                    }
                </span>
            </div>
        )
    }else if(estaLogueado() && !esClienteDirecto()) {
        return(
            <div className='price-container'>
                <span className="price-span-ganancia">
                    {
                        'Precio Final: $' + ((precioProducto * descuentoFinal) + ((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                    }
                </span>
            </div>
        )
    } else {
        return(
            <div className='price-container'>
                <span className="price">Consultanos!</span>
            </div>
        )
    }
}

export default ItemPrecio;