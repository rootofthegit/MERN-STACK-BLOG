import React, {useContext} from "react";
import {PostCard} from "./PostCard";
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {AuthContext} from "../../../context/AuthContext";
import {connect, useDispatch} from "react-redux";
import {toggleLike} from "../../../redux/actions";


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
            return alert("Чтобы ставить лайки, надо зарегистрироваться!")
        }

    }

    if (loading) {
        return <Loader/>
    }

    return <PostCard postTitle={props.postTitle} postText={props.postText} imageSrc={props.imageSrc}
                     postId={props.postId} postLikes={props.postLikes} likeIndex={likeIndex}
                     likeHandler={likeHandler}/>

}
const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        likedPosts: state.userData.likedPosts
    }
}

export default connect(mapStateToProps, null)(PostCardContainer)