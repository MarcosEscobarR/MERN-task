const express = require("express");
const tareasController = require("../controller/tareasController");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//api/tareas

//nueva tarea
router.post(
    "/",
    auth,
    [check("nombre", "El nombre es obligatorio").not().isEmpty()],
    tareasController.nuevaTarea
);

//atualiza tarea
router.put(
    "/:id",
    auth,
    [check("nombre", "El nombre es obligatorio").not().isEmpty()],
    tareasController.actualizaTarea
);

//obtiene tareas
router.get("/", auth, tareasController.obtieneTareas);

//elimina tarea
router.delete("/:id", auth, tareasController.eliminaTarea);

module.exports = router;
