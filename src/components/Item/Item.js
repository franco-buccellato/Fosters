import './Item.css';
import { Link } from 'react-router-dom';
import ItemPrecio from '../ItemPrecio/ItemPrecio';

const Item = ({id, nombre, marca, modelos, precio, linkImagen, codigoFabrica}) => {

    return (
        <Link to ={`/detail/${id}`}>
            <div className="container-item">
                <div className="container page-wrapper">
                    <div className="page-inner">
                        <div className="row">
                            <div className="el-wrapper">
                                <div className="box-up">
                                    <img className="img" src={linkImagen} alt={codigoFabrica}></img>
                                    <div className="img-info">
                                        <div className="info-inner">
                                            <span className="p-name">{id}</span>
                                            <span className="p-company">Marca: {marca}</span>
                                            <span className="p-company">Modelos: {
                                                modelos.map(
                                                    unModelo => {return <span>{unModelo} </span>}
                                                )
                                            }</span>
                                        </div>
                                        <div className="a-size">
                                            {nombre}<ItemPrecio precioProducto={precio}></ItemPrecio>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-down">
                                    <div className="h-bg">
                                        <div className="h-bg-inner"></div>
                                    </div>
                                    <div className="cart" href="#">
                                        <ItemPrecio precioProducto={precio}></ItemPrecio>
                                        {
                                            codigoFabrica !== ''
                                            ?
                                            <span className="add-to-cart">
                                                <span className="txt">Código SKF o INA:</span>
                                                <span className="txt">{codigoFabrica}</span>
                                            </span>
                                            :
                                            <span className="add-to-cart">
                                            <span className="txt">Sin código SKF o INA</span>
                                        </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default Item;