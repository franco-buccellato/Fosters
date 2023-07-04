const express  = require('express');
/* const { request } = require('http'); */
const app = express();
require('dotenv').config()

//Importar conexión con MongoDB
const usuariosBD = require('./conexion')

//Importar archivo de rutas y modelo usuario
const rutaUsuario = require('./rutas/usuario');

//Puerto
const PORT = process.env.PORT;

//Importacion body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}));

app.use('/api/usuario/', rutaUsuario)

app.get(
    '/',
    (req, res) => {
        res.end('Bienvenido al servidor Backend');
    }
)

//Configuración de servido básico
app.listen(
    PORT,
    function() {
        console.log('El servidor Node esta corriendo en el puerto: ' + PORT);
    }
)