import React, {useContext, useEffect, useState} from "react";
import SignUp from "./Register"
import {useMessage} from "../../../hooks/message.hook";
import {useHttp} from "../../../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";


export const RegisterContainer = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({name: '', email: '', password: ''})

    let data = {}

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)

            data.redirect ? history.push("/login") : console.log("хуй!")
        } catch (e) {
        }
    }
    if (auth.isAuthenticated === true) {
        history.push("/")
    }
    return <SignUp registerHandler={registerHandler} changeHandler={changeHandler} loading={loading}/>

}