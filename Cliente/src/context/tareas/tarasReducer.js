import {
    OBTERNER_TAREAS,
    AGREGAR_TAREAS,
    ERROR_TAREAS,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from "../../type/index";

export default (state, action) => {

    switch (action.type) {

    case OBTERNER_TAREAS:
        return {
            ...state,
            tareasProyecto: action.payload
        }

    case AGREGAR_TAREAS:
        return {
            ...state,
            tareasProyecto: [action.payload, ...state.tareasProyecto]

        }

    case ERROR_TAREAS: 
        return {
            ...state,
            errorFormularioTarea: action.payload
        }
    
    case ELIMINAR_TAREA:
        return {
            ...state,
            tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload)
        }
    case ACTUALIZAR_TAREA:
        return {
            ...state,
            tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload.id ? action.payload : tarea),
            tareaSeleccionada: null,
        }

    case TAREA_ACTUAL:
        return {
            ...state,
            tareaSeleccionada: action.payload 
        }
        default:
            return state;
    }
}