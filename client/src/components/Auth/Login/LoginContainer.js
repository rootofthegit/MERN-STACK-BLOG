import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom";

import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/AuthContext";
import SignIn from "./Login";
import {getUserData} from "../../../redux/actions";
import {useDispatch} from "react-redux";


export const LoginContainer = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {loading, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const dispatch = useDispatch()

    useEffect(() => {
        clearError()
    }, [clearError])

    const changeHandler = event => {
            setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userName)
            dispatch(getUserData(data.token))
        } catch (e) {
        }
    }
    if (auth.isAuthenticated===true) {
        history.push("/")
    }
    return <SignIn loginHandler={loginHandler} changeHandler={changeHandler} loading={loading}/>
}