import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {connect} from "react-redux";
import {getPosts, getPostsByCategory, setCurrentPage} from "../../redux/actions";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function BasicPagination(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        props.setCurrentPage(value)
        !!props.category?props.getPostsByCategory(props.category, value):props.getPosts(value)
    };

    return (
        <div className={classes.root} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 30
        }}>
            <Pagination count={props.totalPages} page={props.currentPage} onChange={handleChange} color="secondary"/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentPage: state.posts.currentPage,
        totalPages: state.posts.totalPages,
        category: state.posts.category
    }
}

const mapDispatchToProps = {
    setCurrentPage, getPosts, getPostsByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicPagination)
