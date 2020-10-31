import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import BasicPagination from "../../Pagination/Pagination";
import {Footer} from "../../Footer/Footer";
import PostCardContainer from "../PostCard/PostCardContainer";
import CustomizedSnackbars from "../../Alerts/Alert";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Rating from "@material-ui/lab/Rating";
import HoverRating from "../../RatingStars/rating";

export const PostsPage = ({posts, alert, categoryName}) => {
    if (!posts.length) {
        return <p style={{margin:80}}>Постов пока нет</p>
    }

    return (
        <>
            {alert && <CustomizedSnackbars/>}
            <Container maxWidth="lg" >
                <Grid container spacing={3} style={{marginTop: 80}}>
                    <Grid item xs>
                        <Typography variant="h5">
                            {categoryName}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{marginTop: -18}}>
                        <BasicPagination/>
                    </Grid>
                    <Grid item xs>
                        <HoverRating />
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    {posts.map((post) => {
                        return (
                            <Grid item xs key={post._id}>
                                <PostCardContainer postTitle={post.title} postText={post.postText}
                                                   imageSrc={post.imageSrc} postId={post._id} postLikes={post.likes}
                                                   comments={post.comments}/>
                            </Grid>
                        )
                    })}

                </Grid>
                <div style={{margin: 30}}>
                    <BasicPagination/>
                </div>
            </Container>
            <Footer/>
        </>

    )
}