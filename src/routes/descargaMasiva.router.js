const express = require('express');
const router = express.Router();
const { obtenerCampos, descargarDatos } = require('../controllers/descargaMasiva.controllers'); 
const verifyJWT = require('../utils/verifyJWT'); 

// Ruta para obtener los campos disponibles
router.get('/campos', obtenerCampos); 

// Ruta para la descarga masiva
router.post('/descargar', verifyJWT, descargarDatos); 

module.exports = router;
