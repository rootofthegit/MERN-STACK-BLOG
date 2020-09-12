import React, {useContext} from "react";
import {NavBar} from "./NavBar";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

export const NavBarContainer = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = () => {
        auth.logout()
    }

    return <NavBar logoutHandler={logoutHandler} isAuthenticated={auth.isAuthenticated} userName={auth.userName}/>
}