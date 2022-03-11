const { response } = require('express');
const Evento = require('../models/Evento');

const obtenerEventos = async (req, res = response) => {
    try {
        const eventos = await Evento.find().populate('user', 'name');
        res.status(200).json({
            ok: true,
            msg: 'Obteniedo eventos',
            eventos,
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
        const nuevoEvento = new Evento(req.body);
        nuevoEvento.user = req.uid;
        const eventoDB = await nuevoEvento.save();
        res.status(200).json({
            ok: true,
            msg: 'Evento creado evento',
            eventoDB,
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
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento que desa modificar',
            });
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización para modificar este evento',
            });
        }
        const eventoNuevo = {
            ...req.body,
            user: uid,
        };
        const eventoActualizado = await Evento.findByIdAndUpdate(
            eventoId,
            eventoNuevo,
            { new: true }
        );
        res.status(200).json({
            ok: true,
            evento: eventoActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar evento',
        });
    }
};

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento que desa eliminar',
            });
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización para eliminar este evento',
            });
        }
        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado',
            evento: eventoEliminado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar evento',
        });
    }
};

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
};
