import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import PostAdding from "./PostAdding";
import {useMessage} from "../../hooks/message.hook";

export const PostAddingContainer = () => {
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        postName: '', postText: ''
    })
    const message = useMessage()

    const [selectedFile, setSelectedFile] = useState({
        sFile: null
    })

    const addImgHandler = (event) => {
        setSelectedFile({selectedFile: event.target.files[0]})
    }


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
     const {postName, postText} = form
    const postAddingHandler = async (e) => {
        e.preventDefault();



        // let formData = new FormData()
        // formData.append('image', selectedFile.sFile, selectedFile.sFile.name)
        // formData.append('postName', postName, postName.name)
        // formData.append('postText', postText, postText.name)
        try {
            const data = await request('/api/posts/addnewpost', 'POST', FormData.)
            alert(data.message)
        } catch (e) {
        }
    }


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    return <PostAdding changeHandler={changeHandler}
                       addImgHandler={addImgHandler}
                       postAddingHandler={postAddingHandler}
                       loading={loading}/>
}