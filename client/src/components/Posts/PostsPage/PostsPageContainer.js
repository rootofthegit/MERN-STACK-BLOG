import React, {useCallback, useEffect, useState} from 'react';
import {PostsPage} from './PostsPage'
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";

export const PostsPageContainer = () => {
    const [posts, setPosts] = useState([])
    const {loading, request} = useHttp()

    const fetchPosts = useCallback(async () => {
        try {
            const fetched = await request('/api/posts/', 'GET' )
            setPosts(fetched)
        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const postTitle = "Название поста как бы то нибыло !"
    const shortPostText = "ullam et saepe reiciendis voluptatem adipiscinsit amet autem assumenda provident rerum culpanquis hic commodi nesciunt rem tenetur doloremque ipsam iurenquis sunt voluptatem rerum illo velit"

    if (loading) {
        return <Loader/>
    }
    return ( <> {!loading && <PostsPage posts = {posts} />} </> )
}