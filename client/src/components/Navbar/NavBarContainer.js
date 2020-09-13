import React, {useContext} from "react";
import {NavBar} from "./NavBar";
import {AuthContext} from "../../context/AuthContext";

export const NavBarContainer = () => {
    const auth = useContext(AuthContext)

    return <NavBar isAuthenticated={auth.isAuthenticated} userName={auth.userName}/>
}