const express = require('express');
const userRouter = require('./user.router');
const caracterizationRouter = require('./caracterization.router');
const capitalizationRouter = require('./capitalization.router');
const formulationRouter = require('./formulation.router');
const descargaMasivaRouter = require('./descargaMasiva.router');  
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter);
router.use(caracterizationRouter);
router.use(capitalizationRouter);
router.use(formulationRouter);
router.use(descargaMasivaRouter); 




module.exports = router;