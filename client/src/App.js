import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {NavBar} from "./components/Navbar/NavBar";
import React from "react";


function App() {

    const routes = useRoutes()

    return (
        <BrowserRouter>
            <NavBar />
            {routes}
        </BrowserRouter>
    )
}

export default App;
