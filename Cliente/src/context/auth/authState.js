import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import clienteAxios from "../../config/axios"
import tokenAuth from "../../config/token";
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    
} from "../../type";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registraUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post("/api/usuarios", datos);
             console.log(respuesta);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data

            })

            obtieneUsuario()
            
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta-error"
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    };

    //obtiene todo sobre el usuario autenticado
    const obtieneUsuario = async () => {
        const token = localStorage.getItem('token')

        if(token){
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error)

            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //cuando el usuario inicia sesion
    const iniciaSesion = async datos => {
        try {
            
            const respuesta = await clienteAxios.post("/api/auth", datos)
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            obtieneUsuario()
            
        } catch (error) {
            console.log(error);
             const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta-error"
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });         
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando:state.cargando,

                registraUsuario,
                iniciaSesion,
                obtieneUsuario,
                cerrarSesion,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
