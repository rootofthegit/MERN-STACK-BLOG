import React, {useCallback, useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {PostPage} from "./PostPage"
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";

export const PostPageContainer = () => {
    const {request, loading} = useHttp()
    const [post, setPost] = useState(null)
    const postId = useParams().id

    const getPost = useCallback(async () => {
        try {
            const fetched = await request(`/api/posts/${postId}`, 'GET', null)
            setPost(fetched)
        } catch (e) {
        }
    }, [postId, request])

    useEffect(() => {
        getPost()
    }, [getPost])

    if (loading) {
        return <Loader />
    }

    return <> { !loading && post && <PostPage post = { post } /> } </>
}