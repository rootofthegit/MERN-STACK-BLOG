import React, {useCallback, useEffect} from 'react';
import {PostsPage} from './PostsPage'
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {connect, useDispatch} from "react-redux";
import {getPosts, getUserData} from "../../../redux/actions";
import {useAuth} from "../../../hooks/auth.hook";


const PostsPageContainer = ({posts, alert, currentPage, categoryName}) => {
    const {loading} = useHttp()
    const dispatch = useDispatch()
    const auth = useAuth()

    const token = auth.token

    const fetchPosts = useCallback(() => {
        dispatch(getPosts(1))
        if (!!token) {
            dispatch(getUserData(token))
        }
    }, [dispatch, token])

    useEffect(() => {
        fetchPosts()
        window.scrollTo(0, 0);
    }, [fetchPosts])

    if (loading) {
        return <Loader/>
    }

    return (<> {!loading && <PostsPage posts={posts} alert={alert} categoryName={categoryName}/>} </>)
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        alert: state.app.alert,
        currentPage: state.posts.currentPage,
        categoryName: state.posts.categoryName
    }
}

export default connect(mapStateToProps, null)(PostsPageContainer)