const { response } = require('express');

const obtenerEventos = async (req, res = response) => {
    try {
        res.status(200).json({
            ok: true,
            msg: 'Obteniedo eventos',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener eventos',
        });
    }
};

const crearEvento = async (req, res = response) => {
    try {
        res.status(200).json({
            ok: true,
            msg: 'Creando evento',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear evento',
        });
    }
};

const actualizarEvento = async (req, res = response) => {

    const id = req.params;
    try {
        res.status(200).json({
            ok: true,
            msg: 'Actualizar  evento',
            id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar eventos',
        });
    }
};

const eliminarEvento = async (req, res = response) => {
    const id = req.params;
    try {
        res.status(200).json({
            ok: true,
            msg: 'Eliminar  evento',
            id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar eventos',
        });
    }
};

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
};
