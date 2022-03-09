/*
host + '/api/auth'
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { newUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({
            min: 6,
        }),
        validarCampos
    ],
    newUser
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({
            min: 6,
        }),
        validarCampos,
    ],
    login
);

router.get('/renew', renewToken);

module.exports = router;
