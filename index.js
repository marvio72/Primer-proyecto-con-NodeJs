// const express = require('express');
import express from 'express';
import router from './routes/index.js'; //importante poner la extensión
import db from './config/db.js'; //importante poner la extensión

import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const app = express();

// Conectar la base de datos
db.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch((error) => console.log(error));

// Definir pueto
// const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) => {
  // res.locals.unaVariable = 'Una Nueva Variable';
  // console.log(res.locals);

  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = 'Agencia de Viajes';

  return next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar Router
app.use('/', router); //use soporta get, post, delete etc.

// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
  console.log(`El Servidor esta funcionando en el puerto ${port}`);
});
