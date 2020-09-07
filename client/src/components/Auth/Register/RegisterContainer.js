import React from "react";
import SignUp from "./Register"

export const RegisterContainer = () => {
    const registerNamePage = "Регистрация нового приколиста"
    const pih = () => {
        alert("pig!")
    }
    return <SignUp registerNamePage = {registerNamePage} ale={pih}/>
}