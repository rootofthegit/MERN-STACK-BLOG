import React, {useCallback, useEffect, useState} from 'react';
import {PostsPage} from './PostsPage'
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import {connect, useDispatch} from "react-redux";
import {getPosts} from "../../../redux/actions";

const PostsPageContainer = ({posts}) => {
    const {loading} = useHttp()
    const dispatch = useDispatch()

    const fetchPosts = useCallback(async () => {
        try {
            dispatch(getPosts())
        } catch (e) {
        }
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

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