const express = require('express');

//variables de entorno
require('dotenv').config();

//inicio de la app
const app = express();

//escucha del puerto donde se ejecutará
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

//directorio publico
app.use(express.static('public'));
