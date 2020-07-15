import React, {useContext, useEffect} from 'react'
//ahora es donde importamos la funcion que guarda el usuario
import AuthContext from "../../context/auth/authContext";

const Barra = () => {
    const authContext = useContext(AuthContext);
    const {obtieneUsuario, usuario, cerrarSesion} = authContext

    useEffect(() => {
        obtieneUsuario()


    }, [])

    return (
        <header className="app-header">
            {usuario ?  <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
           
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={cerrarSesion}
                >Cerrar Sesion</button>
            </nav>
        </header>
    );
}

export default Barra;