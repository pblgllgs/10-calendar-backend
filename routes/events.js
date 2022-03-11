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
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//todas las peticiones tienen que pasar por el validaro de JWT
//todas las peticiones que se encuentran despuese de este llamado
//si deseo poner una peticion sin esta ejecución se pone antes de esto
router.use(validarJWT);

router.get('/', obtenerEventos);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento
);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
