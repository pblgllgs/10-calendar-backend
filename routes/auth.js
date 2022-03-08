/*
host + '/api/auth'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login, renewToken } = require('../controllers/auth');
const router = Router();

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({
            min: 6,
        }),
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
    ],
    login
);

router.get('/renew', renewToken);

module.exports = router;
