const express = require('express');
const router = express.Router();
const Recomendacion = require('../modelos/recomendaciones');

// 🔍 GET - listar
router.get('/', async (req, res) => {
    try {
        const data = await Recomendacion.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener recomendaciones' });
    }
});

// ➕ POST - crear
router.post('/', async (req, res) => {
    try {
        const { id, descripcion } = req.body;

        if (!id || !descripcion) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const nueva = new Recomendacion({ id, descripcion });
        const guardada = await nueva.save();

        res.status(201).json(guardada);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear recomendación' });
    }
});

// ✏️ PUT - editar (por _id)
router.put('/:_id', async (req, res) => {
    try {
        const actualizada = await Recomendacion.findByIdAndUpdate(
            req.params._id,
            {
                id: req.body.id,
                descripcion: req.body.descripcion
            },
            { new: true }
        );

        res.json(actualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
});

// 🗑 DELETE - eliminar (por _id)
router.delete('/:_id', async (req, res) => {
    try {
        await Recomendacion.findByIdAndDelete(req.params._id);
        res.json({ mensaje: 'Eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

module.exports = router;