//importar los modelos
const Tarea = require("../model/Tarea");
const Proyecto = require("../model/Proyecto");
const { validationResult } = require("express-validator");

//crea nueva tarea
exports.nuevaTarea = async (req, res) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(401).json({ msg: errores.array() });
    }

    //extraer el proyecto y verificar si existe
    try {
        const { proyecto } = req.body;

        const proyectoEncontrado = await Proyecto.findById(proyecto);

        //verificar si existe
        if (!proyectoEncontrado) {
            return res.status(401).json({ msg: "Proyecto no encontrado " });
        }

        //verificar si el usuario esta autenticado
        if (proyectoEncontrado.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "Accion no Permitida" });
        }

        //guardar la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();

        res.json({ tarea });
    } catch (error) {
        console.log(errores);
        res.send("Error en el servidor");
    }
};

exports.actualizaTarea = async (req, res) => {
    //verificar los errores
    const errores = validationResult(req.body);

    if (!errores.isEmpty()) {
        return res.status(401).json({ msg: errores.array() });
    }

    try {
        const { proyecto, nombre, estado } = req.body;

        //sacar la tarea por su id
        const existeTarea = await Tarea.findById(req.params.id);

        //verificar si la tarea existe
        if (!existeTarea) {
            return res.status(404).json({ msg: "Tarea no Encontrada" });
        }

        //sacar el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //comprobar si el proyecto pertenece a un usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado " });
        }

        let tareaNueva = {};

        tareaNueva.nombre = nombre;

        tareaNueva.estado = estado;

        //guardas la tarea
        tarea = await Tarea.findOneAndUpdate(
            { _id: req.params.id },
            tareaNueva,
            { new: true }
        );
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del Servidor");
    }
};

exports.obtieneTareas = async (req, res) => {
    try {
        /* como pasamos el id deste el tareasState para que pueda encontrar las tareas
        de casa proyecto, debemos sacar ese id, y lo hacemos de la sgnte manera...
        en el state pasamos como param el id y aqui leemos como un query de la consulta
        por eso el destructuring diferente (no es body) */
        const { proyecto } = req.query;

        //sacar el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //verificar si el proyecto existe
        if (!existeProyecto) {
            return res.status(404).json({ msg: "No se enontro proyeto" });
        }

        //comprobar si el proyecto pertenece a un usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado " });
        }

        const tareas = await Tarea.find({
            proyecto: existeProyecto.id,
        });

        res.json(tareas);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del Servidor");
    }
};

exports.eliminaTarea = async (req, res) => {
    const { proyecto } = req.query;

    //sacar la tarea por su id
    const existeTarea = await Tarea.findById(req.params.id);

    //verificar si la tarea existe
    if (!existeTarea) {
        return res.status(404).json({ msg: "Tarea no Encontrada" });
    }

    //sacar el proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //comprobar si el proyecto pertenece a un usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
        return res.status(401).json({ msg: "No autorizado " });
    }

    //eliminas la tarea
    await Tarea.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: " Tarea Eliminadas " });
};
