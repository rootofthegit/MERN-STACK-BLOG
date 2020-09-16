import React, {useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import PostAdding from "./PostAdding";

export const PostAddingContainer = () => {
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        postName: '', postText: ''
    })
    let message = useMessage()

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const postAddingHandler = async () => {
        try {
            const data = await request('/api/posts/addnewpost', 'POST', {...form})
            alert(data.message)
        } catch (e) {
        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    return <PostAdding changeHandler = {changeHandler} postAddingHandler = {postAddingHandler} loading = {loading}/>
}