const Proyecto = require("../model/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyectos = async (req, res) => {
    //verificamos si no haye errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        res.status(401).json({ msg: errores.array() });
    }
    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar el crador via jwt
        proyecto.creador = req.usuario.id;

        // guardamos el proyecto
        proyecto.save();

        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({
            creador: req.usuario.id,
        }).sort({ creado: -1 });
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

exports.atualizaProyecto = async (req, res) => {
    //verificamos si no haya errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        res.status(401).json({ msg: errores.array() });
    }
    //extraemos el nombre del proyecto
    const { nombre } = req.body;

    const nuevoProyecto = {};

    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        //revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);

        //revisar si exista el proyecto
        if (!proyecto) {
            return res.statue(404).json({ msg: "Proyecto no encontrado" });
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado " });
        }

        //actualizar
        //al findByIdAndUpdate le decimos que encuentre un proyecto y lo actualice
        //le pasamos como parametro el id para que encuentre, el campo que va a actualizar y new: true
        proyecto = await Proyecto.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: nuevoProyecto },
            { new: true }
        );

        res.json({ proyecto });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
};

exports.eliminaProyecto = async (req, res) => {
    try {
        //extraer el proyecto por su id
        let proyecto  = await Proyecto.findById(req.params.id);

        //revisar si existe el proyecto
        if(!proyecto){
            return res.status(404).json({msg: "Proyecto no encontrado"})

        }

        //revisar si el usuario es el mismo
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No autorizado"})
        }

        //eliminar
        await Proyecto.findOneAndDelete({_id: req.params.id})
        res.json({msg: "Proyecto Eliminado"})
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error en el servidor")
        
    }
}
