import React, {useCallback, useEffect} from "react";
import {PostCard} from "./PostCard";
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {useParams} from 'react-router-dom'

export const PostCardContainer = (props) => {
    const {request, loading} = useHttp()
    const postId = useParams().id

    const likeHandler = useCallback(async () => {
        try {
            const fetched = await request(`/api/like/${postId}`, 'GET', null)
            alert('fetched.message')
        } catch (e) {
        }
    }, [postId, request])

    if (loading) {
        return <Loader/>
    }

    return <PostCard postTitle={props.postTitle} postText={props.postText} imageSrc={props.imageSrc}
                     postId={props.postId}
                     likeHandler={likeHandler}/>
}