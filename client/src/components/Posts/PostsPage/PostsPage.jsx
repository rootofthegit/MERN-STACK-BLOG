import React from 'react';
import Container from '@material-ui/core/Container';
import {PostCard} from "../PostCard/PostCard";
import Grid from "@material-ui/core/Grid";
import BasicPagination from "../../Pagination/Pagination";
import {Footer} from "../../Footer/Footer";

export const PostsPage = (props) => {

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs>
                        <PostCard postTitle={props.postTitle} shortPostText={props.shortPostText}/>
                    </Grid>
                </Grid>
                <BasicPagination/>
            </Container>
            <Footer/>
        </>

    )
}
