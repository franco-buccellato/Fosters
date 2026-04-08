const mongoose = require('mongoose');

const RecomendacionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    descripcion: { type: String, required: true },
    orden: { type: Number, default: 0 } // <--- SI NO ESTÁ ESTO, MONGO NO LO GUARDA
});

module.exports = mongoose.model('Recomendacion', RecomendacionSchema);