import React, {useCallback, useEffect} from 'react';
import {PostsPage} from './PostsPage'
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {connect, useDispatch} from "react-redux";
import {getPosts, getUserData} from "../../../redux/actions";
import {useAuth} from "../../../hooks/auth.hook";


const PostsPageContainer = ({posts}) => {
    const {loading} = useHttp()
    const dispatch = useDispatch()
    const auth = useAuth()

    const token = auth.token

    const fetchLinks = useCallback(() => {
        dispatch(getPosts())
        if (!!token) {
            dispatch(getUserData(token))
        }
    }, [dispatch, token])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (<> {!loading && <PostsPage posts={posts}/>} </>)
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps, null)(PostsPageContainer)