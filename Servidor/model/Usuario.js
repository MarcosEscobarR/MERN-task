
//requerimos mongoose ya que este se va a encargar del ORM de la DB
const mongoose = require('mongoose');

//creamos es Schema con los campos que va a tener cada campo de la tabla
const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    }
})


//exportamos como el modelo pasando como parametro el nombre del modelo y el Schema
module.exports = mongoose.model('Usuario', UsuariosSchema)