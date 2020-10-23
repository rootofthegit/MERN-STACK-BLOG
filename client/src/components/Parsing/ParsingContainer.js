import React, {useContext, useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import Parsing from "./Parsing"
import {AuthContext} from "../../context/AuthContext";

export const ParsingContainer = () => {
    const {loading, request} = useHttp()
    const [form, setForm] = useState({parseLink: ''})

    const auth = useContext(AuthContext)
    const token = auth.token
    const changeTextHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = async e => {
        e.preventDefault()

        try {
            const res = await request('/api/posts/parsing', 'POST', {...form},
                {Authorization: `Bearer ${token}`}
        )
            console.log(res)
        } catch (err) {
            console.log(err)
        }

    }

    return <Parsing changeTextHandler={changeTextHandler}
                    onSubmitHandler={onSubmitHandler}
                    loading={loading}/>
}