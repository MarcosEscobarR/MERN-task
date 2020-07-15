import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertasContex from "../../context/alertas/alertasContex"
import AuthContext from "../../context/auth/authContext"

const NuevaCuenta = (props) => {

    const alertaContext = useContext(alertasContex)
    const {alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, registraUsuario} = authContext;

    //en caso de que el usuario ya existe mostrar un mensaje y en caso qe ya 
    //este autenticado redirigir
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
    },[mensaje, autenticado, props.history])
    //state de datos del usuario
    const [DatosUsuario, setDatosUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: "",
    });

        //sacamos los datos del usuario
        const {nombre, email, password, confirmar } = DatosUsuario;

    const onChange = (e) => {
        setDatosUsuario({
            ...DatosUsuario,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //validar
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ) {
            mostrarAlerta("Todos los datos son Obligatorios", "alerta-error")
            return;
        }

        //validacio del password
        if(password.length < 6){
            mostrarAlerta("La constrasenha debe tener maximo 6 caracteres", "alerta-error")
            return;
        }

        //confirmar passweord
        if(password !== confirmar){
            mostrarAlerta("Las constrasenhas no coinciden", "alerta-error")
            return;
        }
        //pasarlo al action
        registraUsuario({nombre, email, password});
    };


    return (
        <div className="form-usuario ">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener Cuenta</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Confirmar Password</label>
                        <input
                            type="password"
                            name="confirmar"
                            placeholder="Repite tu password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarse"
                        />
                    </div>
                </form>

                <Link to={"/"} className="enlace-cuenta">
                    Volver a inicio de Sesion
                </Link>
            </div>
        </div>
    );
};

export default NuevaCuenta;
