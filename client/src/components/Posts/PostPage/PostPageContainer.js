import React, {useCallback, useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {PostPage} from "./PostPage"
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {connect, useDispatch} from "react-redux";
import {addComment, deletePostById, getPostById, getUserData, showAlert, toggleLikePost} from "../../../redux/actions";
import {useAuth} from "../../../hooks/auth.hook";


export const PostPageContainer = (props) => {
    const {loading} = useHttp()
    const dispatch = useDispatch()
    const postId = useParams().id

    const auth = useAuth()
    const token = auth.token

    const likedPosts = props.likedPosts
    const likeIndex = likedPosts.indexOf(postId)

    const [comment, setComment] = useState('')


    const getPost = useCallback(async () => {
        dispatch(getPostById(postId))
        if (!!token) {
            dispatch(getUserData(token))
        }
    }, [postId, token, dispatch])

    useEffect(() => {
        getPost()
    }, [getPost])

    const likeHandler = () => {
        const likeData = {postId: postId, token: auth.token, likedPosts: props.likedPosts}
        if (!!token) {
            try {
                dispatch(toggleLikePost(likeData))
            } catch (e) {
            }
        } else {
            dispatch(showAlert("Чтобы ставить лайки, надо зарегистрироваться!", 'info'))
        }

    }

    const changeHandler = event => {
        setComment(event.target.value)
    }

    const commentHandler = () => {
        if (!!token) {
            let dateNow = new Date();
            let date = `${dateNow.toLocaleTimeString()}, ${dateNow.toLocaleDateString("ua-UA")}`
            dispatch(addComment(comment, props.userName, postId, date, token))
        } else {
            dispatch(showAlert("Чтобы писать комменты, надо войти на сайт, дружок!", 'info'))
        }
    }

    const deletePost = () => {
        dispatch(deletePostById(postId, auth.token))
    }


    if (loading) {
        return <Loader/>
    }

    return <> {!loading && <PostPage post={props.post} likeIndex={likeIndex} likeHandler={likeHandler}
                                     commentHandler={commentHandler}
                                     changeHandler={changeHandler} role={props.role}
                                     deletePost={deletePost}
                                     alert={props.alert}/>
    }
    </>
}

const mapStateToProps = state => {
    return {
        post: state.post,
        likedPosts: state.userData.likedPosts,
        userName: state.userData.name,
        role: state.userData.role,
        alert: state.app.alert
    }
}

export default connect(mapStateToProps, null)(PostPageContainer)