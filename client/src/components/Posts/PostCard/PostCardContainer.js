import React, {useCallback, useContext, useEffect, useState} from "react";
import {PostCard} from "./PostCard";
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {AuthContext} from "../../../context/AuthContext";

export const PostCardContainer = (props) => {
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)

    const likeBody = {userId: auth.userId, postId: props.postId}
    const likeHandler = async () => {
        if (auth.isAuthenticated) {
            try {
                const data = await request('/api/posts/like/', 'POST', {...likeBody})
                alert(data.message)
            } catch (e) {
            }
        }

    }

    if (loading) {
        return <Loader/>
    }

    return <PostCard postTitle={props.postTitle} postText={props.postText} imageSrc={props.imageSrc}
                     postId={props.postId} postLikes={props.postLikes}
                     likeHandler={likeHandler}/>
}