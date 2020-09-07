import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Grid from "@material-ui/core/Grid";
import {PostCard} from "../Posts/PostCard/PostCard";
import Tabs from "@material-ui/core/Tabs";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function BasicPagination() {
    const classes = useStyles();
    return (
            <Tabs centered>
                <div className={classes.root} style={{margin: 30}}>
                    <Pagination count={10} color="secondary"/>
                </div>
            </Tabs>
    );
}
