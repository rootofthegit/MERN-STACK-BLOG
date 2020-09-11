import React from "react";
import {BrowserRouter} from "react-router-dom";

import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {NavBar} from "./components/Navbar/NavBar";
import Loader from "./components/Loader/Loader";



function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader  />
    }

    return (
        <BrowserRouter>
            <NavBar />
            {routes}
        </BrowserRouter>
    )
}

export default App;
