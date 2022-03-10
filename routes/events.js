/*
host + '/api/events'
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//todas las peticiones tienen que pasar por el validaro de JWT
//todas las peticiones que se encuentran despuese de este llamado
//si deseo poner una peticion sin esta ejecución se pone antes de esto
router.use(validarJWT);

router.get('/', obtenerEventos);

router.post('/', crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
