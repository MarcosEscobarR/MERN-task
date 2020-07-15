import React, {useContext, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

///creamos esta ruta privada para que solo los usuarios autenticados puedan ingresar
//si nos fijamos bien es solo un componente que resive como props otro componente
//con una compia de los props que teniamos 
//Esta verifica si esta autenticado atravez del state Autenticado y despliega un codigo
//dependiendo de eso lo que significa qeu si o si tenemos que tener un state que guarde 
//si el usuario esta autenticado o no
const RutaPrivada = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext)
    const {autenticado, cargando, obtieneUsuario} = authContext;

    useEffect(() => {
        obtieneUsuario()
    }, [])

    return (
        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} /> 
        )} 

        />
    )
}

export default RutaPrivada