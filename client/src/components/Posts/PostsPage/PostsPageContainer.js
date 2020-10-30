import React, {useCallback, useEffect} from 'react';
import {PostsPage} from './PostsPage'
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {connect, useDispatch} from "react-redux";
import {getPosts, getUserData} from "../../../redux/actions";
import {useAuth} from "../../../hooks/auth.hook";


const PostsPageContainer = ({posts, alert, currentPage}) => {
    const {loading} = useHttp()
    const dispatch = useDispatch()
    const auth = useAuth()

    const token = auth.token

    const fetchPosts = useCallback(() => {
        dispatch(getPosts(currentPage))
        if (!!token) {
            dispatch(getUserData(token))
        }
    }, [dispatch, token])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    if (loading) {
        return <Loader/>
    }

    return (<> {!loading && <PostsPage posts={posts} alert={alert} />} </>)
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        alert: state.app.alert,
        currentPage: state.posts.currentPage
    }
}

export default connect(mapStateToProps, null)(PostsPageContainer)