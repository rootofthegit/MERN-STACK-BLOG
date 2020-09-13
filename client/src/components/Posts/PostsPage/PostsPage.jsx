import React from 'react';
import Container from '@material-ui/core/Container';
import {PostCard} from "../PostCard/PostCard";
import Grid from "@material-ui/core/Grid";
import BasicPagination from "../../Pagination/Pagination";
import {Footer} from "../../Footer/Footer";

export const PostsPage = () => {

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <PostCard/>
                    </Grid>

                </Grid>
                <BasicPagination/>
            </Container>
            <Footer/>
        </>

    )
}
