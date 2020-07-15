import React, {useContext, useEffect} from "react";
import Sidebar from "../layout/Sidebar"
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTarea from "../tareas/ListadoTarea";

//ahora es donde importamos la funcion que guarda el usuario
import AuthContext from "../../context/auth/authContext";

const Proyectos = () => {
    const authContext = useContext(AuthContext);
    const {obtieneUsuario} = authContext

    useEffect(() => {
        obtieneUsuario()
    }, [])

    return (
        <div className="contenedor-app">
        <Sidebar />

        <div className="seccion-principal">
        <Barra />
            <main>
                <FormTarea />
                <div className="contenedor-tareas">
                    <ListadoTarea />
                </div>
            </main>
        </div>
    </div>
    )
};

export default Proyectos;
