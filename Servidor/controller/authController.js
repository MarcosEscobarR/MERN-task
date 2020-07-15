const Usuario = require("../model/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {

    
    //destructuring a el request
    const { email, password } = req.body;

    
    try {
        //verificar si existe el email
        let usuario = await Usuario.findOne({email})
        
        if(!usuario){
            return res.status(400).json({msg: "El usuario no existe "})
        }

        //verificar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)

        if(!passCorrecto){
            return res.status(400).json({msg: "El password es incorrecto"})
        }

        //si todo es correcto hay que crear el token
        //en el payload se carga el dato unico en el que vas a poder buscar la informacion
        //que necesitas de la base de datos
        const payload = {
            usuario: {
                id: usuario.id,
            }
        }

        //aqui cargamos el password  usamos una  clave secreta que va a estar comparandose
        //en toda la app
        jwt.sign(payload, process.env.SECRETA, {
            //el token se borra despues de una hora
            expiresIn: 3600

            //si hay error manda el error y si no envia el token
        }, (error, token) => {
            if(error) throw error;
            res.json({token})
        })
    } catch (error) {
        console.log(error);
        
    }
};

exports.obtieneUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select("-password")

        res.json({usuario})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error del Servidor"})
        
    }
}