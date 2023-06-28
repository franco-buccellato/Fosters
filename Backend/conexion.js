const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/usuariosFosters');
mongoose.connect(
    'mongodb+srv://fosters:fosters1234@fosters.ar2aaie.mongodb.net/?retryWrites=true&w=majority'
    ).then(
        result => console.log('Conexión exitosa! ' + result)
    ).catch(
        err => console.log('Error al conectarse: ' + err)
    )

const objetoBD = mongoose.connection;

objetoBD.on(
    'connected',
    () => {
        console.log('Conexión exitosa con MongoDB.')
    }
);
objetoBD.on(
    'error',
    () => {
        console.log('Conexión fallida con MongoDB.')
    }
);

module.exports = mongoose;