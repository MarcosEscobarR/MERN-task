import React, {useContext} from 'react'
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareasContext from "../../context/tareas/tareasContext";

const Proyecto = ({proyecto}) => {
    
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual} = proyectosContext; 

    const TareasContexts = useContext(TareasContext)
    const {obtenerTareas} = TareasContexts;

    //funcion que selecciona los proyectos
    const seleccionaProyecto = id => {
        proyectoActual(id) //que selecciona el proyecto
        obtenerTareas(id) //que obtiene las tareas
    }

    
    return (
        <li>
            <button
                type="button"
                className="btn btn-black"
                onClick={() => seleccionaProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
}

export default Proyecto;