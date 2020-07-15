import React, {useContext} from "react";
import TareasContext from "../../context/tareas/tareasContext";

const Tarea = ({ tarea }) => {
    
    //de tareas
    const tareasContexts = useContext(TareasContext);
    const { elimiarTarea, obtenerTareas, actualizarTarea, tareaActual } = tareasContexts;


    const { nombre, estado, proyecto,  } = tarea;

    const onClickElminar = (id) => {
        elimiarTarea(id, proyecto)
        obtenerTareas(proyecto)
    }

    const cambiarEstadoTarea = tarea => {
        if(tarea.estado === true){
            tarea.estado = false;
        }else {
            tarea.estado = true;
        }

        actualizarTarea(tarea)
    }

    return (
        <div className="tarea sombra">
            <p>{nombre}</p>

            <div className="estado">
                {estado ? (
                    <button type="button" className="completo" onClick={()=>cambiarEstadoTarea(tarea)}>
                        Completo
                    </button>
                ) : (
                    <button type="button" className="incompleto"  onClick={()=>cambiarEstadoTarea(tarea)}>
                        Incompleto
                    </button>
                )}
            </div>

            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => tareaActual(tarea)}>
                    Editar
                </button>

                <button type="button" className="btn btn-secundario" onClick={() => onClickElminar(tarea._id)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Tarea;
