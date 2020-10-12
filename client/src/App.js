import React from "react";
import {BrowserRouter} from "react-router-dom";

import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import Loader from "./components/Loader/Loader";
import {AuthContext} from "./context/AuthContext";
import NavBarContainer from "./components/Navbar/NavBarContainer";


function App() {
    const {token, login, logout, userId, userName, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userId, userName, isAuthenticated}}>
            <BrowserRouter>
                <NavBarContainer/>
                {routes}
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
