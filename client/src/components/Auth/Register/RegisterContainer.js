import React, {useContext, useEffect, useState} from "react";
import SignUp from "./Register"
import {useMessage} from "../../../hooks/message.hook";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
// import {useHistory} from "react-router-dom";
// import Test from "../../Test/Test";


export const RegisterContainer = () => {
    // const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)

            // return <><Test show={true} text={data.message}/></>
        } catch (e) {
        }
    }

    return <SignUp registerHandler={registerHandler} changeHandler={changeHandler}/>
}