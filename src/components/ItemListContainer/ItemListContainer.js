import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList';
import { useState, useEffect } from 'react';
import { getProductos, filtrarProductosSiHayFiltros } from '../../listaDeProductos';
import { useParams } from 'react-router-dom';
import SectionNovedades from '../SectionNovedades/SectionNovedades';
import Background from '../Background/Background';

const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);

    const {id, nombre, fabrica, rubro, modificacion, marca, modelo} = useParams();

    const [hayFiltros, setHayFiltros] = useState(false);

    useEffect(
        () => {
            getProductos(id, nombre, fabrica, rubro, modificacion, marca, modelo).then(
                productos => {
                    setProductos(productos)
                }
            )
        }, [id, nombre, fabrica, rubro, modificacion, marca, modelo]
    )

    const aplicarFiltro = () => {
        let id = document.getElementById("filtro_codigo_prodcuto").value;
        let nombre = document.getElementById("filtro_descripcion").value;
        let fabrica = document.getElementById("filtro_codigo_frabrica").value;
        let marca = document.getElementById("filtro_marca").value;
        let modelo = document.getElementById("filtro_modelo").value;
        id = id === '' ? undefined : id;
        nombre = nombre === '' ? undefined : nombre;
        fabrica = fabrica === '' ? undefined : fabrica;
        marca = marca === '' ? undefined : marca;
        modelo = modelo === '' ? undefined : modelo;
        setHayFiltros(true);
        setProductos(filtrarProductosSiHayFiltros(id, nombre, fabrica, marca, modelo));
        let productoFiltrado = filtrarProductosSiHayFiltros(id, nombre, fabrica, marca, modelo);
        if(productoFiltrado.length === 1) {
            document.getElementById("filtro_codigo_prodcuto").placeholder = productoFiltrado[0].id;
            document.getElementById("filtro_descripcion").placeholder = productoFiltrado[0].nombre;
            document.getElementById("filtro_codigo_frabrica").placeholder = productoFiltrado[0].codigoFabrica;
            document.getElementById("filtro_marca").placeholder = productoFiltrado[0].marca;
            document.getElementById("filtro_modelo").placeholder = productoFiltrado[0].modelos.toString();
        } else {
            document.getElementById("filtro_codigo_prodcuto").placeholder = '';
            document.getElementById("filtro_descripcion").placeholder = '';
            document.getElementById("filtro_codigo_frabrica").placeholder = '';
            document.getElementById("filtro_marca").placeholder = '';
            document.getElementById("filtro_modelo").placeholder = '';
        }
    }

    const limpiarFiltro = () => {
        document.getElementById("filtro_codigo_prodcuto").value = '';
        document.getElementById("filtro_descripcion").value = '';
        document.getElementById("filtro_codigo_frabrica").value = '';
        document.getElementById("filtro_marca").value = '';
        document.getElementById("filtro_modelo").value = '';
        document.getElementById("filtro_codigo_prodcuto").placeholder = 'Ej: 84690';
        document.getElementById("filtro_descripcion").placeholder = 'Ej: 17x60x26';
        document.getElementById("filtro_codigo_frabrica").placeholder = 'Ej: VKM-36018';
        document.getElementById("filtro_marca").placeholder = 'Ej: Peugeot';
        document.getElementById("filtro_modelo").placeholder = 'Ej: 306';
        setHayFiltros(false);
        setProductos(filtrarProductosSiHayFiltros(undefined, undefined, undefined, undefined, undefined));
    }

    const handleKeyPress = (evento) => {
        let e = evento || window.event;
        if(e.keyCode === 13){
            aplicarFiltro();
        }
    }

    return (
        <div className="container" onKeyDown={() => handleKeyPress()}>
            <div className='container-titulo'>
                <h4>Nuestros Productos</h4>
            </div>
            <div className='container-filtros-productos'>
                <div className='container-input-filtros'>
                    <label>Código Foster's:</label>
                    <input type="search" id="filtro_codigo_prodcuto" placeholder='Ej: 84690'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Por Medida:</label>
                    <input type="search" id="filtro_descripcion" placeholder='Ej: 17x60x26'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Código SKF o INA:</label>
                    <input type="search" id="filtro_codigo_frabrica" placeholder='Ej: VKM-36018'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Marca:</label>
                    <input type="search" id="filtro_marca" placeholder='Ej: Peugeot'></input>
                </div>
                <div className='container-input-filtros'>
                    <label>Modelo:</label>
                    <input type="search" id="filtro_modelo" placeholder='Ej: 306'></input>
                </div>
            </div>
            <div className='container-filtros-botones'>
                <div id='container-input-submit-aplicar' className='container-input-submit'onClick={() => aplicarFiltro()}>
                    <div id="aplicar_filtro">Buscar</div>
                </div>
                <div className='container-input-submit'onClick={() => limpiarFiltro()}>
                    <div id="limpiar_filtro">Limpiar</div>
                </div>
            </div>
            {
                (hayFiltros && productos.length > 0) ? <ItemList productos={productos}/> : <div className='informacion-filtros'><h3>No hay productos disponibles con esos filtros de búsqueda o no realizó ninguna búsqueda.</h3></div>
            }
            <SectionNovedades/>
            <Background/>
        </div>
    );
}
export default ItemListContainer;