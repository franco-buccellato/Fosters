import './ItemPrecioDetail.css';
import { useContext } from 'react';
import UsuarioContext from '../Context/UsuarioContext';
/* import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; */

const ItemPrecioDetail = ({precioProducto}) => {
    
    const {usuario, estaLogueado, esClienteDirecto, esClienteIndirecto} = useContext(UsuarioContext);
    let descuentoFinal = usuario !== undefined ? usuario.descuento : 1;

    if(esClienteDirecto() && usuario.descuento === 0) {
        return(
            <div className='price-container-detail'>
                <span className="price-span-descuento">
                    {
                        'Precio Bruto: $' + (precioProducto).toFixed(2)
                    }
                </span>
                <div className='container-ganancia'>
                    <span className="price-span-ganancia">
                        {
                            'Precio Final: $' + ((precioProducto * descuentoFinal) + ((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                        }
                    </span>
                </div>
            </div>
        )
    } else if(esClienteDirecto()) {
        return(
            <div className='price-container-detail'>
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
                <div className='container-ganancia'>
                    <span className="price-span-ganancia">
                        {
                            'Precio Final: $' + ((precioProducto * descuentoFinal) + ((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                        }
                    </span>
                </div>
            </div>
        )
    } else if(esClienteIndirecto()) {
        return(
            <div className='price-container-detail'>
                <div className='container-ganancia'>
                    <span className="price-span-ganancia">
                        {
                            'Precio Final: $' + ((precioProducto * descuentoFinal) + ((precioProducto * descuentoFinal)*usuario.utilidad/100)).toFixed(2)
                        }
                    </span>
                </div>
            </div>
        )
    } else {
        return(
            <div className='price-container-detail'>
                <span className="price">Consultanos!</span>
            </div>
        )
    }
}

export default ItemPrecioDetail;