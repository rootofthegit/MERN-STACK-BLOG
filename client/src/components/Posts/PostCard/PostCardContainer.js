import React, {useContext} from "react";
import {PostCard} from "./PostCard";
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {AuthContext} from "../../../context/AuthContext";
import {connect, useDispatch} from "react-redux";
import {showAlert, toggleLike} from "../../../redux/actions";


export const PostCardContainer = (props) => {
    const {loading} = useHttp()
    const auth = useContext(AuthContext)

    const dispatch = useDispatch()
    const likedPosts = props.likedPosts
    const likeIndex = likedPosts.indexOf(props.postId)

    const likeHandler = () => {
        const likeData = {postId: props.postId, token: auth.token, likedPosts: props.likedPosts}
        if (auth.isAuthenticated) {
            try {
                dispatch(toggleLike(likeData))
            } catch (e) {
            }
        } else {
            dispatch(showAlert("Чтобы ставить лайки, надо зарегистрироваться!", 'info'))
        }

    }

    if (loading) {
        return <Loader/>
    }

    return <PostCard postTitle={props.postTitle} postText={props.postText} imageSrc={props.imageSrc}
                     postId={props.postId} postLikes={props.postLikes} likeIndex={likeIndex}
                     comments={props.comments}
                     likeHandler={likeHandler}
                     alert={props.alert}/>

}
const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        likedPosts: state.userData.likedPosts,
    }
}

export default connect(mapStateToProps, null)(PostCardContainer)