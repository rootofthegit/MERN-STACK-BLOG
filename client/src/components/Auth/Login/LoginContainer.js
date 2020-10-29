import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/AuthContext";
import SignIn from "./Login";
import {getUserData, showAlert} from "../../../redux/actions";
import {connect} from "react-redux";


const LoginContainer = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {loading, request, clearError, error} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        error&&props.showAlert(error, 'warning')
        // clearError()
    }, [error,clearError])

    const changeHandler = event => {
            setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userName)
            props.getUserData(data.token)
        } catch (e) {
        }
    }
    if (auth.isAuthenticated===true) {
        history.push("/")
    }
    return <SignIn loginHandler={loginHandler} changeHandler={changeHandler} loading={loading} alert={props.alert}/>
}

const mapStateToProps = state => ({
    alert: state.app.alert
})

const mapDispatchToProps = {
    showAlert, getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)