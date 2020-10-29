import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import BasicPagination from "../../Pagination/Pagination";
import {Footer} from "../../Footer/Footer";
import PostCardContainer from "../PostCard/PostCardContainer";
import CustomizedSnackbars from "../../Alerts/Alert";

export const PostsPage = ({posts, alert}) => {
    if (!posts.length) {
        return <p>Постов пока нет</p>
    }

    return (
        <>
            {alert && <CustomizedSnackbars />}
            <Container maxWidth="lg" style={{marginTop: 90}}>
                <Grid container spacing={4}>
                    {posts.map((post) => {
                        return (
                            <Grid item xs key={post._id}>
                                <PostCardContainer postTitle={post.title} postText={post.postText}
                                                   imageSrc={post.imageSrc} postId={post._id} postLikes={post.likes} comments={post.comments}/>
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