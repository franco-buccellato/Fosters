import './ItemDetailContainer';
import './ItemDetailContainer.css'
import { useEffect, useState } from 'react';
import { getProductoById } from '../../listaDeProductos';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {

    const [producto, setProducto] = useState();

    const {productId} = useParams();

    useEffect(
        () => {
            getProductoById(productId).then(
                producto => {
                    setProducto(producto)
                }
            )
        }, [productId]
    )

    return (
        <div className="container-itemDetail">
            {
                producto ? <ItemDetail key={producto.id} {...producto}/> : <Loader />
            }
        </div>
    );
}
export default ItemDetailContainer;