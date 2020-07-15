import React, { useState, useContext, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/tareas/tareasContext";

const FormTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const TareasContexts = useContext(TareasContext);
    const {
        agregarTareas,
        errorTarea,
        obtenerTareas,
        errorFormularioTarea,
        tareaSeleccionada,
        actualizarTarea,
    } = TareasContexts;

    useEffect(() => {
        if (tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada);
        }
    }, [tareaSeleccionada]);
    //state de tareas
    const [Tarea, setTarea] = useState({
        nombre: "",
        estado: false,
        proyecto: null,
    });

    const { nombre } = Tarea;

    if (!proyecto) return null;
    const [proyectoActual] = proyecto;

    const onChangeForm = (e) => {
        setTarea({
            ...Tarea,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        //validar
        if (nombre.trim() === "") {
            errorTarea(true);
            return;
        }

        //comporbar si hay que editar o agregar
        if (!tareaSeleccionada) {
            //cargar la tarea
            Tarea.proyecto = proyectoActual._id;
            agregarTareas(Tarea);
        }else{
            actualizarTarea(Tarea)
            
        }

        //pasar validacion
        errorTarea(false);

        //obterner de vuelta las tareas para que muestre en el state
        obtenerTareas(proyectoActual._id);

        //vaciar formulario
        setTarea({
            ...Tarea,
            nombre: "",
        });
    };

    //si no existe ningun proyecto ocultamos el formulario

    return (
        <div className="formulario">
            <form onSubmit={onSubmitForm}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={onChangeForm}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={
                            tareaSeleccionada ? "Editar tarea" : "Agragar Tarea"
                        }
                    />
                </div>
            </form>
            {errorFormularioTarea ? (
                <h2 className="mensaje error">El nombre es obligatorio</h2>
            ) : null}
        </div>
    );
};

export default FormTarea;
