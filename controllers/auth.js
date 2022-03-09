const { response } = require('express');

const newUser = (req, res = response) => {
    const { name, email, password } = req.body;
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
