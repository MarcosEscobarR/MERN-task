import React, {useState, useContext, useEffect} from 'react'
import {Link} from "react-router-dom"
import alertasContex from "../../context/alertas/alertasContex"
import AuthContext from "../../context/auth/authContext"

const Login = props => {

    const alertaContext = useContext(alertasContex)
    const {alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext)
    const { mensaje, autenticado, iniciaSesion} = authContext;


    //state de datos del usuario
    const [DatosUsuario, setDatosUsuario] = useState({
        email:'',
        password:''
    });

    const onChange = e => {
        setDatosUsuario({
            ...DatosUsuario,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');

        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria )
        }
        
    },[mensaje, autenticado, props.history])

    const {email, password} = DatosUsuario;

    const onSubmit = e => {
        e.preventDefault()

        //validar 
        if(email.trim() === '' || password.trim() === ""){
            mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
            return;
        }

        //pasarlo al action
        iniciaSesion({email, password});

    }


    

    return (
        <div className="form-usuario ">
             {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={onSubmit}
                >
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
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesion"/>
                    </div>
                </form>

                <Link to={"/nueva-cuenta"} className="enlace-cuenta" >Obtener Cuenta</Link>
            </div>
        </div>
    )
}

export default Login;