const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schemaUsuario = new schema(
    {
        nombre: String,
        contrasenia: String,
        descuento: Number,
        utilidad: Number,
        proveedor: String,
        idUsuario: String
    }
)

const ModeloUsuario = mongoose.model('usuarios', schemaUsuario);

module.exports = router;

/* router.get(
    '/test',
    (req, res) => {
        res.end('Ruta ejemplo en funcionamiento.')
    }
) */

//Agregar nuevo usuario
router.post(
    '/nuevo',
    (req, res) => {
        const nuevoUsuario = new ModeloUsuario(
            {
                nombre: req.body.nombre,
                contrasenia: req.body.contrasenia,
                descuento: req.body.descuento,
                utilidad: 0,
                proveedor: req.body.proveedor,
                idUsuario: req.body.idUsuario
            }
        )
        nuevoUsuario.save()
        .then(
            () => {
                console.log("Message has been saved successfully in the database.");
                console.log("This is a post request.");
                console.log("Req body: ", req.body.nombre);
                res.sendStatus(200);
            }
        ).catch(
            (err) => {
                console.log("There was an error saving the msg object to the database.");
                console.log("Sending 500 status code.");
                console.log(err.response.data);
                res.sendStatus(500);
            }
        );
    }
)

//Obtener lista de usuarios
router.get(
    '/',
    (req, res) => {
        ModeloUsuario.find(
            {            
                proveedor: req.query.proveedor
            }
        )
        .then(
            (docs) => {
                console.log("Message has been saved successfully in the database.");
                console.log("This is a post request.");
                console.log("Doc: ", docs);
                res.send(docs);
            }
        ).catch(
            (err) => {
                console.log("There was an error saving the msg object to the database.");
                console.log("Sending 500 status code.");
                res.sendStatus(500);
            }
        );
    }
)

//Agregar un usuario
router.post(
    '/',
    (req, res) => {
        ModeloUsuario.findOne(
            {            
                nombre: req.body.nombre,
                contrasenia: req.body.contrasenia
            }
        )
        .then(
            (docs) => {
                console.log("Message has been saved successfully in the database.");
                console.log("This is a post request.");
                console.log("Doc: ", docs);
                res.send(docs);
            }
        ).catch(
            (err) => {
                console.log("There was an error saving the msg object to the database.");
                console.log("Sending 500 status code.");
                res.sendStatus(500);
            }
        );
    }
)

//Modificar usuario
router.post(
    '/actualizar',
    (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        ModeloUsuario.findOneAndUpdate(
            {
                idUsuario: req.body.idUsuario
            },
            {
                nombre: req.body.nombre,
                contrasenia: req.body.contrasenia,
                descuento: req.body.descuento,
                utilidad: req.body.utilidad
            }
        )
        .then(
            () => {
                console.log("Message has been saved successfully in the database.");
                console.log("This is a post request.");
                console.log("Req body: ", req.body.nombre);
                res.sendStatus(200);
            }
        ).catch(
            (err) => {
                console.log("There was an error saving the msg object to the database.");
                console.log("Sending 500 status code.");
                res.sendStatus(500);
            }
        );
    }
)

//Eliminar usuario
router.post(
    '/eliminar',
    (req, res) => {
        ModeloUsuario.findOneAndDelete(
            {
                idUsuario: req.body.idUsuario
            }
        )
        .then(
            () => {
                console.log("Message has been saved successfully in the database.");
                console.log("This is a post request.");
                console.log("Req body: ", req.body.nombre);
                res.sendStatus(200);
            }
        ).catch(
            (err) => {
                console.log("There was an error saving the msg object to the database.");
                console.log("Sending 500 status code.");
                res.sendStatus(500);
            }
        );
    }
)
