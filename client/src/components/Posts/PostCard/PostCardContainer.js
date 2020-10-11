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

    const likeHandler = () => {
        const likeData = {postId: props.postId, token: auth.token, likedPosts: props.likedPosts}
        if (auth.isAuthenticated) {
            try {
                dispatch(toggleLike(likeData))
                /*const likedPosts = props.likedPosts
                const likeIndex = likedPosts.indexOf(props.postId)
                if (likeIndex !== -1) {
                    console.log("УБРАТЬ!")
                    dispatch(addLike(likeData))
                } else {
                    console.log("ДОБАВИТЬ!")
                    dispatch(addLike(likeData))
                }*/
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
const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        likedPosts: state.userData.likedPosts
    }
}

export default connect(mapStateToProps, null)(PostCardContainer)