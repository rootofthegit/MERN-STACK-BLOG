import React, {useCallback, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {PostPage} from "./PostPage"
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {connect, useDispatch} from "react-redux";
import {getPostById, getUserData, toggleLikePost} from "../../../redux/actions";
import {useAuth} from "../../../hooks/auth.hook";

export const PostPageContainer = (props) => {
    const {loading} = useHttp()
    const dispatch = useDispatch()
    const postId = useParams().id

    const auth = useAuth()
    const token = auth.token

    const likedPosts = props.likedPosts
    const likeIndex = likedPosts.indexOf(postId)



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
            return alert("Чтобы ставить лайки, надо зарегистрироваться!")
        }

    }

    if (loading) {
        return <Loader />
    }

    return <> { !loading && <PostPage post = { props.post } likeIndex = { likeIndex } likeHandler={ likeHandler }/> }</>
}

const mapStateToProps = state => {
    return {
        post: state.post,
        likedPosts: state.userData.likedPosts
    }
}

export default connect(mapStateToProps, null)(PostPageContainer)