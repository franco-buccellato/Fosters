const mongoose = require('mongoose');

const recomendacionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Recomendaciones', recomendacionSchema);