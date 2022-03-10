const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/jwt');

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
        const token = await generarJWT(user.uid, user.name);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar',
        });
    }
};

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas',
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credensiales incorrectas',
            });
        }
        const token = await generarJWT(user.uid, user.name);
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al inicial sesión',
        });
    }
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
