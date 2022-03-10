const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const newUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let estaRegistrado = await User.findOne({ email });
        if (estaRegistrado) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ingresado ya esta registrado',
            });
        }
        const user = new User(req.body);
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar'
        });
    }
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
