const express = require("express");
const proyectoController = require("../controller/proyectosController");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crea Proyetos
//api/proyectos

router.post(
    "/",
    auth,
    //validamos el proyecto
    [check("nombre", "El campo de nombre es obligatorio").not().isEmpty()],

    proyectoController.crearProyectos
);

router.get("/", auth, proyectoController.obtenerProyectos);

router.put(
    "/:id",
    auth, //validamos el proyecto
    [check("nombre", "El campo de nombre es obligatorio").not().isEmpty()],
    proyectoController.atualizaProyecto
);

router.delete(
    "/:id",
    auth, 
    proyectoController.eliminaProyecto
);


module.exports = router;
