import React from 'react';
import {PostsPage} from './PostsPage'

export const PostsPageContainer = () => {

    const postTitle = "Название поста как бы то нибыло !"
    const shortPostText = "ullam et saepe reiciendis voluptatem adipiscinsit amet autem assumenda provident rerum culpanquis hic commodi nesciunt rem tenetur doloremque ipsam iurenquis sunt voluptatem rerum illo velit"
        return <PostsPage postTitle={postTitle} shortPostText={shortPostText} />
}