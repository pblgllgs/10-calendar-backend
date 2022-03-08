const { response } = require('express');
const { validationResult } = require('express-validator');

const newUser = (req, res = response) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password,
    });
};

const login = (req, res = response) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    res.status(200).json({
        ok: true,
        msg: 'registro',
        email,
        password,
    });
};

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
};

module.exports = {
    newUser,
    login,
    renewToken,
};
