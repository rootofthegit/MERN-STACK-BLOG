import React, {useContext, useState} from "react";
import {PostCard} from "./PostCard";
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {AuthContext} from "../../../context/AuthContext";
import {connect, useDispatch} from "react-redux";
import {addLike} from "../../../redux/actions";

export const PostCardContainer = (props) => {
    const {loading} = useHttp()
    const auth = useContext(AuthContext)

    const dispatch = useDispatch()

    const likeHandler = () => {
        const likeData = {userId: auth.userId, postId: props.postId, token: auth.token}
        if (auth.isAuthenticated) {
            try {
                dispatch(addLike(likeData))
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

export default connect(null, null)(PostCardContainer)