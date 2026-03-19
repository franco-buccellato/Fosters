const express = require('express');
const router = express.Router();
const Recomendacion = require('../modelos/recomendaciones');


// ✅ GET - listar todas
router.get('/', async (req, res) => {
    try {
        const recomendaciones = await Recomendacion.find();
        res.json(recomendaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener recomendaciones' });
    }
});


// ✅ POST - crear nueva
router.post('/', async (req, res) => {
    try {
        const nueva = new Recomendacion({
            id: req.body.id,
            descripcion: req.body.descripcion
        });

        const guardada = await nueva.save();
        res.status(201).json(guardada);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear recomendación' });
    }
});


// ✅ PUT - actualizar
router.put('/:id', async (req, res) => {
    try {
        const actualizada = await Recomendacion.findOneAndUpdate(
            { id: req.params.id }, // ⚠️ usamos tu id, no _id
            {
                descripcion: req.body.descripcion
            },
            { new: true }
        );

        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar recomendación' });
    }
});


// ✅ DELETE - eliminar
router.delete('/:id', async (req, res) => {
    try {
        await Recomendacion.findOneAndDelete({ id: req.params.id });
        res.json({ mensaje: 'Recomendación eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar recomendación' });
    }
});

module.exports = router;