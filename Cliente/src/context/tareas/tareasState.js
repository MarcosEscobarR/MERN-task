import React, { useReducer } from "react";

import TareasContext from "./tareasContext";
import TareasReducer from "./tarasReducer";
import clienteAxios from "../../config/axios";
import {
    OBTERNER_TAREAS,
    AGREGAR_TAREAS,
    ERROR_TAREAS,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
} from "../../type/index";

const TareasState = (props) => {
    const initialState = {
        tareasProyecto: [],
        errorFormularioTarea: null,
        tareaSeleccionada: null,
    };

    const [state, dispatch] = useReducer(TareasReducer, initialState);

    //series de funciones
    const obtenerTareas = async (proyecto) => {
        try {
            const respuesta = await clienteAxios.get("/api/tareas", {
                params: { proyecto },
            });

            dispatch({
                type: OBTERNER_TAREAS,
                payload: respuesta.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const agregarTareas = async (tarea) => {
        try {
            const respuesta = await clienteAxios.post("api/tareas", tarea);

            console.log(respuesta);

            dispatch({
                type: AGREGAR_TAREAS,
                payload: respuesta.data.tarea,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const errorTarea = (valor) => {
        dispatch({
            type: ERROR_TAREAS,
            payload: valor,
        });
    };

    const elimiarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {
                params: { proyecto },
            });

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const tareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea,
        });
    };

    const actualizarTarea = async (tarea) => {
        try {
            const respuesta = await clienteAxios.put(
                `/api/tareas/${tarea._id}`,
                tarea
            );
            console.log(respuesta);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: respuesta.data.tarea,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TareasContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorFormularioTarea: state.errorFormularioTarea,
                tareaSeleccionada: state.tareaSeleccionada,

                obtenerTareas,
                agregarTareas,
                errorTarea,
                elimiarTarea,
                tareaActual,
                actualizarTarea,
            }}
        >
            {props.children}
        </TareasContext.Provider>
    );
};

export default TareasState;
