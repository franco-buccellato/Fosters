const express = require('express');
const router = express.Router();
const Recomendacion = require('../modelos/recomendaciones');

// GET recomendaciones
router.get('/', async (req, res) => {
    try {
        const recomendaciones = await Recomendacion.find();
        res.json(recomendaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener recomendaciones' });
    }
});

module.exports = router;