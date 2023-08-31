const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schemaProducto = new schema(
    {
        id: String,
        nombre: String,
        precio: Number,
        rubro: String,
        codigoFabrica: String,
        tipoModificacion: String,
        marca: String,
        modelos: Array,
        linkImagen: String,
        idProducto: String
    }
)

const ModeloProducto = mongoose.model('productos', schemaProducto);

module.exports = router;

//Agregar nuevo producto
router.post(
    '/nuevo',
    (req, res) => {
        const nuevoProducto = new ModeloProducto(
            {
                id: req.body.id,
                nombre: req.body.nombre,
                precio: req.body.precio,
                rubro: req.body.rubro,
                codigoFabrica: req.body.codigoFabrica,
                tipoModificacion: req.body.tipoModificacion,
                marca: req.body.marca,
                modelos: req.body.modelos,
                linkImagen: req.body.linkImagen
            }
        )
        nuevoProducto.save()
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

//Obtener lista de productos
router.get(
    '/',
    (req, res) => {
        ModeloProducto.find(
            {            
                
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

//Obtener lista de productos
router.get(
    '/detail',
    (req, res) => {
        ModeloProducto.findOne(
            {            
                id: req.query.id
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

//Agregar un producto
router.post(
    '/',
    (req, res) => {
        ModeloProducto.findOne(
            {            
                id: req.body.id,
                nombre: req.body.nombre,
                precio: req.body.precio,
                rubro: req.body.rubro,
                codigoFabrica: req.body.codigoFabrica,
                tipoModificacion: req.body.tipoModificacion,
                marca: req.body.marca,
                modelos: req.body.modelos,
                linkImagen: req.body.linkImagen
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

//Modificar producto
router.post(
    '/actualizar',
    (req, res) => {
        ModeloProducto.findOneAndUpdate(
            {
                id: req.body.id
            },
            {
                nombre: req.body.nombre,
                precio: req.body.precio,
                rubro: req.body.rubro,
                codigoFabrica: req.body.codigoFabrica,
                tipoModificacion: req.body.tipoModificacion,
                marca: req.body.marca,
                modelos: req.body.modelos,
                linkImagen: req.body.linkImagen
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

//Eliminar producto
router.post(
    '/eliminar',
    (req, res) => {
        ModeloProducto.findOneAndDelete(
            {
                id: req.body.id
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

//Modificar precios masivamente
router.post(
    '/aumento',
    (req, res) => {
            ModeloProducto.findOneAndUpdate(
            {
                id: req.body.id
            },
            {
                precio: req.body.nuevoPrecio,
            }
/*             ModeloProducto.updateMany({}, [{
                $set: {
                    "id": {
                        $toString: "$id"
                    }
                }
            }] */
        ).then(
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