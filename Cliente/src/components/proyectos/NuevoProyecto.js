import React, { Fragment, useState, useContext } from "react";

//importamos el context para usarlo en este componente
//la idea es que cuando no pulsemos el boton de nuevo formulario
//no se muestre el formulario, para eso usamos el context
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
    const [proyecto, setpoyecto] = useState({
        nombre : ''
    });

    //extraemos el context de formulario
    const proyectosContext = useContext(proyectoContext);
    const {
        formulario,
        mostrarFormulario,
        agregarProyecto,    
        error,
        mostrarError,
    } = proyectosContext;

    const { nombre } = proyecto;
    const onChange = (e) => {
        setpoyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        ///validar
        if (nombre === '') {
            mostrarError()

            return;
        }
        //pasar al action
        agregarProyecto(proyecto);
    };
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={mostrarFormulario}
            >
                Nuevo Proyecto
            </button>

            {formulario ? (
                <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        onChange={onChange}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                        onSubmit={onSubmit}
                    />
                </form>
            ) : null}

            {error ? (
                <p className="mensaje error">
                    El nombre del proyecto es obligatorio
                </p>
            ) : null}
        </Fragment>
    );
};

export default NuevoProyecto;
