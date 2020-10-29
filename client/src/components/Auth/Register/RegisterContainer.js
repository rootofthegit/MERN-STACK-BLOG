import React, {useContext, useEffect, useState} from "react";
import SignUp from "./Register"
import {useHttp} from "../../../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {showAlert} from "../../../redux/actions";
import {connect} from 'react-redux'



const RegisterContainer = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({name: '', email: '', password: ''})

    let data = {}

    useEffect(() => {
        error&&props.showAlert(error, 'error')
    }, [error, clearError])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            data = await request('/api/auth/register', 'POST', {...form})
            props.showAlert(data.message, 'success')

            // data.redirect ? history.push("/login") : console.log("хуй!")
        } catch (e) {
        }
    }
    if (auth.isAuthenticated === true) {
        history.push("/")
    }
    return <SignUp registerHandler={registerHandler} changeHandler={changeHandler} loading={loading} alert={props.alert}/>

}

const mapStateToProps = state => ({
    alert: state.app.alert
})

const mapDispatchToProps = {
    showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)