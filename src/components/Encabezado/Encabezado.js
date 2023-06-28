import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CartWidget from '../CartWidget/CartWidget';
import UserLogin from '../User/User';
import '../Encabezado/Encabezado.css';
import { useContext, useState, useEffect } from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UsuarioContext from '../Context/UsuarioContext';
import logoFosters from '../../imagenes/LOGO-FOSTERS.png';
import logoSKF from '../../imagenes/SKF-LOGO.png';
import ExportExcel from 'react-export-excel';
import { listaDeProductos } from '../../listaDeProductos';
import axios from 'axios';

function Encabezado({cantidadCarrito}) {

    const ExcelFile = ExportExcel.ExcelFile;
    const ExcelSheet = ExportExcel.ExcelSheet;
    const ExcelColumn= ExportExcel.ExcelColumn;

    const {usuario, estaLogueado, esAdministrador, esClienteDirecto} = useContext(UsuarioContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showListaDePrecios, setShowListaDePrecios] = useState(false);
    const handleCloseListaDePrecios = () => setShowListaDePrecios(false);
    const handleShowListaDePrecios = () => setShowListaDePrecios(true);

    /* MODAL Fallida*/
    const [showFallida, setShowFallida] = useState(false);
    const handleCloseFallida = () => setShowFallida(false);
    const handleShowFallida= () => setShowFallida(true);

    const configurarNuevaGanancia = () => {
        let nuevaGanancia = document.getElementById("nuevaGanancia").value;
        guardarNUevaGanancia(nuevaGanancia);
        setShow(false);
    };

    const [utilidadUsuario, setUtilidadUsuario] = useState();

    useEffect( 
        () => {
            if(usuario !== undefined) {
                setUtilidadUsuario(usuario.utilidad);
            }
        }, [usuario]
    )

    //Guardar nuevos datos del usuario
    const guardarNUevaGanancia = (ganancia) => {
        console.log('Modificar ganancia: ' + ganancia);
        const usuarioActualizado = {
            utilidad: ganancia !== '' ? ganancia : usuario.utilidad,
            idUsuario: usuario.idUsuario
        };
        axios.post('/api/usuario/actualizar', usuarioActualizado)
            .then(
                res => {
                    console.log('Modificación correcta: ' + res);
                    setUtilidadUsuario(usuarioActualizado.utilidad);
                }
            )
            .catch(
                err => {
                    console.log('Error:' + err);
                    handleShowFallida();
                }
            )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='fixed-top'>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <LinkContainer to = {'/'}>
                    <Navbar.Brand>
                        <img
                            alt="logo-fosters"
                            src={logoFosters}
                            width="100"
                            className="d-inline-block align-center"
                        />{' '}
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to = '/'><Nav.Link>Inicio</Nav.Link></LinkContainer>
                        <LinkContainer to = '/'><Nav.Link>Nosotros</Nav.Link></LinkContainer>
                        <LinkContainer to = '/productos'><Nav.Link>Productos</Nav.Link></LinkContainer>
                        {
                            (esAdministrador() /* || esClienteDirecto() */) &&
                            <LinkContainer to = '/usuarios'><Nav.Link>Usuarios</Nav.Link></LinkContainer>
                        }
                        {
                            (estaLogueado() && esClienteDirecto()) &&
                            <LinkContainer to = '/carrito'><Nav.Link><CartWidget inicial={cantidadCarrito}/></Nav.Link></LinkContainer>
                        }
                    </Nav>
                    <Nav>
                    <Nav.Link>Tensores fabricados con rodamientos                      
                        <img
                            alt="logo-skf"
                            src={logoSKF}
                            width="50"
                            className="d-inline-block align-center imagen-skf"
                        />{' '}</Nav.Link>
                        {
                            (estaLogueado() && esClienteDirecto()) && <Nav.Link><Button variant="info" onClick={handleShow}>Utilidad {utilidadUsuario !== undefined ? utilidadUsuario : ''} %</Button></Nav.Link>
                        }
                        <LinkContainer to = '/login'><Nav.Link><UserLogin/></Nav.Link></LinkContainer>
                        {
                            (estaLogueado() && esClienteDirecto())
                            && 
                            <Nav.Link><Button variant="warning" onClick={handleShowListaDePrecios}>Descargar Precios</Button></Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Configurar Utilidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Configuración de Utilidad actual: {usuario.utilidad !== undefined ? usuario.utilidad : ''} %</Form.Label>
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Porcentaje de utilidad</Form.Label>
                    <Form.Control
                        id='nuevaGanancia'
                        type="number"
                        placeholder="Ej: 10"
                        autoFocus
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={configurarNuevaGanancia}>
                    Configurar Valor
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showListaDePrecios} onHide={handleCloseListaDePrecios}>
                <Modal.Header closeButton>
                <Modal.Title>¿Desea descarga la lista de precios?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseListaDePrecios}>
                    No
                </Button>
                <ExcelFile 
                    element={<Button variant="primary" onClick={handleCloseListaDePrecios}>Si</Button>} 
                    fileName="Lista de Precios Foster's"
                >
                    <ExcelSheet data={listaDeProductos} name="Lista de Precios">
                        <ExcelColumn label="Código Foster's" value="id"/>
                        <ExcelColumn label="Medida" value="nombre"/>
                        <ExcelColumn label="Código SKF o INA" value="codigoFabrica"/>
                        <ExcelColumn label="Marca" value="marca"/>
                        <ExcelColumn label="Precio Bruto" value="precio"/>
                    </ExcelSheet>
                </ExcelFile>
                </Modal.Footer>
            </Modal>
            <Modal show={showFallida} onHide={handleCloseFallida}>
                    <Modal.Header closeButton>
                    <Modal.Title>Operación fallida!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>La operación falló, vuelva a intentarlo.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseFallida}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </Navbar>
    );
}

export default Encabezado;