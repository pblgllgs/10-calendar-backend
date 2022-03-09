const express = require('express');
const { dbConnection } = require('./db/config');

//variables de entorno
require('dotenv').config();

//inicio de la app
const app = express();

//DB
dbConnection();

//permite que sean leidos los datos del body
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));


//escucha del puerto donde se ejecutará
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

//directorio publico
app.use(express.static('public'));
