import React from "react";
import {BrowserRouter} from "react-router-dom";

import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {NavBar} from "./components/Navbar/NavBar";



function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes()

    return (
        <BrowserRouter>
            <NavBar />
            {routes}
        </BrowserRouter>
    )
}

export default App;
