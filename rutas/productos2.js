const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schemaProducto = new schema(
    {
        id: String,
        descripcion: String,
        medida: String,
        codigoFabrica: String,
        marca: String,
        precio: Number,
        modelos: Array,
        linkImagen: String,
        categoria: String,
        idProducto: String
    },
    {
        timestamps: true
    }
)

const ModeloProducto = mongoose.model('productos2', schemaProducto);

module.exports = router;

//Agregar nuevo producto
router.post(
    '/nuevo',
    (req, res) => {
        const nuevoProducto = new ModeloProducto(
            {
                id: req.body.id,
                descripcion: req.body.descripcion,
                medida: req.body.medida,
                codigoFabrica: req.body.codigoFabrica,
                marca: req.body.marca,
                precio: req.body.precio,
                modelos: req.body.modelos,
                categoria: req.body.categoria,
                linkImagen: req.body.linkImagen
            }
        )
        nuevoProducto.save()
        .then(
            () => {
                console.log("Message has been saved successfully in the database.");
                console.log("This is a post request.");
                console.log("Req body: ", req.body.descripcion);
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

// Endpoint de búsqueda predictiva
router.get(
    '/search', 
    (req, res) => {
        // const query = req.query.query;
        // const regex = new RegExp(query, 'i');
        const { id, codigoFabrica, marca, modelos, descripcion } = req.query;

        // Mostrar en consola los parámetros recibidos
        console.log('Parámetros de búsqueda:', req.query);
    
        // Construir el objeto de búsqueda
        let searchCriteria = {};
        if (id) {
          searchCriteria.id = { $regex: id, $options: 'i' };
        }
        if (codigoFabrica) {
          searchCriteria.codigoFabrica = { $regex: codigoFabrica, $options: 'i' };
        }
        if (marca) {
          searchCriteria.marca = { $regex: marca, $options: 'i' };
        }
        if (modelos) {
          searchCriteria.modelos = { $regex: modelos, $options: 'i' };
        }
        if (descripcion) {
          searchCriteria.descripcion = { $regex: descripcion, $options: 'i' };
        }

        // Mostrar en consola el objeto de búsqueda
        console.log('Criterios de búsqueda:', searchCriteria);
        ModeloProducto.find({searchCriteria}).limit(10)
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
);

//Agregar un producto
router.post(
    '/',
    (req, res) => {
        ModeloProducto.findOne(
            {            
                id: req.body.id,
                descripcion: req.body.descripcion,
                medida: req.body.medida,
                codigoFabrica: req.body.codigoFabrica,
                marca: req.body.marca,
                precio: req.body.precio,
                modelos: req.body.modelos,
                categoria: req.body.categoria,
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
                id: req.body.id,
                descripcion: req.body.descripcion,
                medida: req.body.medida,
                codigoFabrica: req.body.codigoFabrica,
                marca: req.body.marca,
                precio: req.body.precio,
                modelos: req.body.modelos,
                categoria: req.body.categoria,
                linkImagen: req.body.linkImagen
            },
            {
                new:true,
                upsert: true,
                timestamps:
                    {
                        createdAt:false,
                        updatedAt:true
                    }
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

// Ruta para actualizar precios masivamente
router.post('/aumento2', async (req, res) => {
    try {
      // Validar que venga un array
      if (!Array.isArray(req.body.productos) || req.body.productos.length === 0) {
        return res.status(400).json({ error: 'Debe enviar un array "productos" con id y nuevoPrecio.' });
      }
  
      // Filtrar solo productos con id y nuevoPrecio válido
      const productosValidos = req.body.productos.filter(
        p => p.id && typeof p.nuevoPrecio === 'number'
      );
  
      if (productosValidos.length === 0) {
        return res.status(400).json({ error: 'No hay productos válidos para actualizar.' });
      }
  
      // Armar operaciones bulk
      const operaciones = productosValidos.map(producto => ({
        updateOne: {
          filter: { id: producto.id },
          update: { $set: { precio: producto.nuevoPrecio } }
        }
      }));
  
      // Ejecutar actualización masiva
      const resultado = await ModeloProducto.bulkWrite(operaciones);
  
      console.log(`Precios actualizados: ${resultado.modifiedCount} de ${productosValidos.length}`);
      res.status(200).json({
        message: 'Precios actualizados correctamente.',
        totalSolicitados: productosValidos.length,
        modificados: resultado.modifiedCount
      });
    } catch (err) {
      console.error('Error al actualizar los precios masivamente:', err);
      res.status(500).json({ error: 'Error al actualizar precios masivamente.' });
    }
  });