import React, {useReducer} from 'react'
import alertasReducer from "./alertasReducer"
import alertasContex from "./alertasContex";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../type";

const AlertasState = props => {

    const initialState = {
        alerta: null
    }
    const [state, dispatch] = useReducer(alertasReducer, initialState)

    // funciones\
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,

            })
        },3000)
    }

    
    return (
        <alertasContex.Provider
            value={{
                alerta: state.alerta,

                mostrarAlerta
            }}
        >
            {props.children}
        </alertasContex.Provider>
    )
}

export default AlertasState;