import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {NavBar} from "./components/Navbar/NavBar";


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
