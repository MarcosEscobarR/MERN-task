// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { check }  = require('express-validator');
///Crea un usuario
///api/usuarios

router.post('/',
    //agregamos todas las reglas de validacion
    [
       check("nombre", "El nombre es obligatorio").not().isEmpty(),
       check("email", "Ingresa un email valido").isEmail(),
       check("password", "La contrasenha debe de ser de minimo 6 caracteres").isLength({min: 6})
        
    ],
    usuarioController.crearUsuario
)

module.exports = router