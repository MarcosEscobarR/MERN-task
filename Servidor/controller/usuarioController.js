//importar los modelos
const Usuario = require("../model/Usuario");
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        res.status(400).json({errores: errores.array()})
    }

    const {email, password} = req.body
    try {

        // validacion si existe un email igual
        let usuario = await Usuario.findOne( { email });
        if(usuario) {
            return res.status(400).json({ msg: "El usuario ya existe" })
        }

        //crea el usuario segun el modelo
        usuario = new Usuario(req.body);

        //hashear password
        //salt va a tener las propiedades de el hasheo, an genSalt se le pasa la cantidad 
        //de caracteres que va a tener tu nuevo pass
        const salt = await bcryptjs.genSalt(10);

        //cambiamos el password actual por el salt pasando el password que nos viene del
        //form y el salt que hicimos
        usuario.password = await bcryptjs.hash(password, salt)

        
        //guarda el usuario
        await usuario.save();

        //crear y firmar el json web token
        const payload = {
            usuario: {
                id: usuario.id,
            }
        }

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token })
        })


    } catch (error) {
        console.log(error);

        res.status(400).send("hubo un error")
        
    }
};
