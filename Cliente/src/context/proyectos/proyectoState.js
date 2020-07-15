//aqui definimos todos los state que vamos a hacer correr por el proyecto junto con las
//diferentes funciones

import React, { useReducer } from "react";
import proyectoReducer from "./proyectoReducer";
//importamos el context que creamos
import ProyectoContext from "./proyectoContext";
import clienteAxios from "../../config/axios";

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTO,
    AGREGAR_PROYECTO,
    ERROR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    ERROR_PROYECTO,
} from "../../type/index";

//aqui definimos el state inicial junto con todos los props
const ProyectoState = (props) => {
    const initialState = {
        proyetos: [],

        formulario: false,
        error: false,
        proyecto: null,
        mensaje: null,
    };

    // Dispach para ejecutar las acciones.
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //serie de funciones para el CRUD
    //*funcion que cambia el estado del formulario
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
        });
    };

    const obtenerProyectos = async (proyectos) => {
        const alerta = {
            msg: "Hubo un Error",
            categoria: "alerta-error",
        };
        try {
            const respuesta = await clienteAxios.get("api/proyectos");

            dispatch({
                type: OBTENER_PROYECTO,
                payload: respuesta.data.proyectos,
            });
        } catch (error) {
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta,
            });
        }
    };

    const agregarProyecto = async (proyecto) => {
        const alerta = {
            msg: "Hubo un Error",
            categoria: "alerta-error",
        };
        try {
            const respuesta = await clienteAxios.post(
                "/api/proyectos",
                proyecto
            );
            console.log(respuesta);

            //insertar proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data,
            });
        } catch (error) {
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta,
            });
        }
    };
    const mostrarError = () => {
        dispatch({
            type: ERROR_FORMULARIO,
        });
    };

    const proyectoActual = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId,
        });
    };

    const eliminarProyecto = async (proyectoId) => {
        const alerta = {
            msg: "Hubo un Error",
            categoria: "alerta-error",
        };

        try {
            await clienteAxios.delete(`api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId,
            });
        } catch (error) {
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta,
            });
        }
    };
    //en el return ponemos lo que seria el componente principal que vamos a estar importando
    //durante el proyecto
    return (
        <ProyectoContext.Provider
            //pasamos un value que seria el valor inicial del state
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                error: state.error,
                proyecto: state.proyecto,
                mensaje: state.mensaje,

                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
            }}
        >
            {/* esta linea dice que va a estar pasando todo el state dentro del sus hijos */}
            {props.children}
        </ProyectoContext.Provider>
    );
};

export default ProyectoState;
