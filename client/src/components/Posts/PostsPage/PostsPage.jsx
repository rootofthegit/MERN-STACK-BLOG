import React from 'react';
import Container from '@material-ui/core/Container';
import {PostCard} from "../PostCard/PostCard";
import Grid from "@material-ui/core/Grid";
import BasicPagination from "../../Pagination/Pagination";
import {Footer} from "../../Footer/Footer";

export const PostsPage = ({posts}) => {
    if (!posts.length) {
        return <p>Постов пока нет</p>
    }
    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {posts.map((post) => {
                        return (
                            <Grid item xs key={post._id}>
                                <PostCard postTitle={post.title} shortPostText={post.postText} imageSrc={post.imageSrc}/>
                            </Grid>
                        )
                    })}

                </Grid>
                <BasicPagination/>
            </Container>
            <Footer/>
        </>

    )
}
