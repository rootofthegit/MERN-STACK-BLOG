import React, {useContext, useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import PostAdding from "./PostAdding"
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";

export const PostAddingContainer = () => {
    const {loading} = useHttp()
    const [form, setForm] = useState({postName: '', postText: ''})
    const [file, setFile] = useState('');

    const auth = useContext(AuthContext)
    const token = auth.token
    const changeTextHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onChangeFileHandler = e => {
        setFile(e.target.files[0])
    }

    const {postText, postName} = form
    const onSubmitHandler = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('postText', postText)
        formData.append('postName', postName)

        try {
            const res = await axios.post('/api/posts/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                }

            )
            console.log(res)
        } catch (err) {
            console.log(err)
        }

    }

    return <PostAdding changeTextHandler={changeTextHandler}
                       onChangeFileHandler={onChangeFileHandler}
                       onSubmitHandler={onSubmitHandler}
                       loading={loading}/>
}