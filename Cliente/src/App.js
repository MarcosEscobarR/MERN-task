import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NuevaCuenta from "./components/auth/NuevaCuenta";
import Login from "./components/auth/Login";
import Proyectos from "./components/proyectos/Proyectos";
import ProyectoState from "./context/proyectos/proyectoState";
import TareasState from "./context/tareas/tareasState";
import AlertasState from "./context/alertas/alertasState";
import AuthState from "./context/auth/authState";
import RutaPrivada from "./components/route/RutaPrivada";

//como cuando iniciamos un usuario este se guarda dentro de un state y este se carga solo
//en memoria entonces toda la informacion del usuario se borra al recargar la pagina
// lo que debemos hacer el llamar a la autenticacion cada vez que recargamos
//Para eso cargamos el token y lo autenricamos si es que existe
import tokenAuth from "../src/config/token";
const token = localStorage.getItem("token");
if (token) {
    tokenAuth(token);
}

function App() {
    return (
        <ProyectoState>
            <TareasState>
                <AlertasState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route
                                    exact
                                    path="/nueva-cuenta"
                                    component={NuevaCuenta}
                                />
                                <RutaPrivada
                                    exact
                                    path="/proyectos"
                                    component={Proyectos}
                                />
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertasState>
            </TareasState>
        </ProyectoState>
    );
}

export default App;
