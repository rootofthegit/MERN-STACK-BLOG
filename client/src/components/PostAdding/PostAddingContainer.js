import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../../hooks/http.hook"
import PostAdding from "./PostAdding"
import axios from 'axios'
import {AuthContext} from "../../context/AuthContext";

export const PostAddingContainer = () => {
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({postName: '', postText: ''})
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('')
    const [message, setMessage] = useState('')
    const auth = useContext(AuthContext)
    const token = auth.token
    const changeTextHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onChangeFileHandler = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
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
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }

    }


    // const [selectedFile, setSelectedFile] = useState({
    //     sFile: null
    // })
    //
    //
    // const addImgHandler = (event) => {
    //     setSelectedFile({selectedFile: event.target.files[0]})
    // }
    //
    //
    // const changeTextHandler = event => {
    //     setForm({...form, [event.target.name]: event.target.value})
    // }
    // const {postName, postText} = form
    // const postAddingHandler = async (e) => {
    //     e.preventDefault();
    //
    //     try {
    //         const data = await request('/api/posts/addnewpost', 'POST', FormData)
    //         alert(data.message)
    //     } catch (e) {
    //     }
    // }
    //
    //
    // useEffect(() => {
    //     message(error)
    //     clearError()
    // }, [error, message, clearError])


    return <PostAdding changeTextHandler={changeTextHandler}
                       onChangeFileHandler={onChangeFileHandler}
                       onSubmitHandler={onSubmitHandler}
                       loading={loading}/>
}