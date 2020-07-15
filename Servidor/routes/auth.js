//rutas de auenticacion
const express = require('express');
const router = express.Router();
const { check }  = require('express-validator');
const authController = require('../controller/authController');
const auth = require("../middleware/auth");

///inicia sesion
///api/auth

router.post('/',

    authController.autenticarUsuario

)

//obtiene usuario
router.get('/',
    auth,
    authController.obtieneUsuario
)

module.exports = router