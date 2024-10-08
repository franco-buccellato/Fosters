const express  = require('express');
var cors = require('cors');
const app = express();
require('dotenv').config()

//Importar conexión con MongoDB
const usuariosBD = require('./conexion')

//Importar archivo de rutas y modelo usuario
const rutaUsuario = require('./rutas/usuario');
const rutasProductos = require('./rutas/productos2');

//Puerto
const PORT = process.env.PORT;

//Importacion body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}));
//Router
app.use('/api/usuario/', rutaUsuario);
app.use('/api/productos2/', rutasProductos);

app.get(
    '/',
    (req, res) => {
        res.end('Bienvenido al servidor Backend');
    }
)

//Habilitando peticiones de culquier lado; si no setear url de front
const corsOptions ={
    origin:true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
/* app.use(cors({origin:true})); */

//Configuración de servido básico
app.listen(
    PORT,
    function() {
        console.log('El servidor Node esta corriendo en el puerto: ' + PORT);
    }
)
