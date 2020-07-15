import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/tareas/tareasContext";

const ListadoTarea = () => {
    //de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //de tareas
    const tareasContexts = useContext(TareasContext);
    const { tareasProyecto } = tareasContexts;

    if (!proyecto) return <h2>Selecciona Proyecto</h2>;

    const [proyectoActual] = proyecto;

    const onClickElimina = () => {
        eliminarProyecto(proyectoActual._id);
    };

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul>
                <div className="listado-tareas">
                    {tareasProyecto.length === 0 ? (
                        <li className="tarea">
                            <p>No hay tareas</p>
                        </li>
                    ) : (
                        <TransitionGroup>
                            {tareasProyecto.map((tarea) => (
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={200}
                                    classNames="tarea"
                                >
                                    <Tarea tarea={tarea} />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    )}
                </div>
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickElimina}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
};

export default ListadoTarea;
