import './SectionNovedades.css';
import { getUltimosProductos } from '../../listaDeProductos';
import ItemNovedad from '../ItemNovedad/ItemNovedad';
import { useEffect, useState } from 'react';

function SectionNovedades() {

    const [productos, setProductos] = useState([]);

    useEffect(
        () => {
            getUltimosProductos().then(
                productos => {
                    setProductos(productos)
                }
            )
        }
    )

    return (
        <div className="container-section-novedades" id='section-novedades'>
            <div className='container-novedades-title'>
                <h4>Últimos ingresos:</h4>
            </div>
            <div className="container-itemList">
                {productos.map(producto => <ItemNovedad key={producto.id} {...producto}/>)}
            </div>
        </div>
    )
}

export default SectionNovedades;