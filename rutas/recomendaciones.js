const express = require('express');
const router = express.Router();
const Recomendacion = require('../modelos/recomendaciones');

// 🔍 GET - Listar ordenados por prioridad
router.get('/', async (req, res) => {
    try {
        // .sort({ orden: 1 }) hace que el 1 aparezca primero, luego el 2, etc.
        const data = await Recomendacion.find().sort({ orden: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener recomendaciones' });
    }
});

// ➕ POST - Crear con orden
router.post('/', async (req, res) => {
    try {
        const { id, descripcion, orden } = req.body;

        if (!id || !descripcion) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        // Creamos la recomendación incluyendo el campo orden
        const nueva = new Recomendacion({ 
            id, 
            descripcion, 
            orden: orden || 0 // Si no viene, por defecto es 0
        });
        
        const guardada = await nueva.save();
        res.status(201).json(guardada);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear recomendación' });
    }
});

// ✏️ PUT - Editar incluyendo el orden
router.put('/:_id', async (req, res) => {
    try {
        const actualizada = await Recomendacion.findByIdAndUpdate(
            req.params._id,
            {
                id: req.body.id,
                descripcion: req.body.descripcion,
                orden: req.body.orden // 🆕 Ahora el backend guarda el cambio de orden
            },
            { new: true }
        );

        if (!actualizada) {
            return res.status(404).json({ error: 'No se encontró la recomendación' });
        }

        res.json(actualizada);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
});

// 🗑 DELETE - Eliminar
router.delete('/:_id', async (req, res) => {
    try {
        const eliminada = await Recomendacion.findByIdAndDelete(req.params._id);
        if (!eliminada) {
            return res.status(404).json({ error: 'No existe esa recomendación' });
        }
        res.json({ mensaje: 'Eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

module.exports = router;