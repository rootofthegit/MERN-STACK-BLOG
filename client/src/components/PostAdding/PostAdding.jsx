import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ArtTrack} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: "none"
    }
}));

export default function PostAdding(props) {
    const classes = useStyles();

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ArtTrack/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Добавление нового поста
                </Typography>
                <form className={classes.form} onSubmit={props.onSubmitHandler}>
                    {/*<TextField*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    required*/}
                    {/*    fullWidth*/}
                    {/*    id="postName"*/}
                    {/*    label="Название поста"*/}
                    {/*    name="postName"*/}
                    {/*    autoComplete="postName"*/}
                    {/*    autoFocus*/}
                    {/*    // onChange={props.changeTextHandler}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    required*/}
                    {/*    fullWidth*/}
                    {/*    name="postText"*/}
                    {/*    label="Текст поста"*/}
                    {/*    type="text"*/}
                    {/*    id="postText"*/}
                    {/*    autoComplete="postText"*/}
                    {/*    onChange={props.changeTextHandler}*/}
                    {/*/>*/}
                    <input
                        accept="*/*"
                        className={classes.input}
                        id="contained-button-file"
                        name="postImage"
                        type="file"
                        onChange={props.onChangeFileHandler}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Выберите фотографии
                        </Button>
                    </label>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={props.onSubmitHandler}
                        disabled={props.loading}
                    >
                        Добавить новый пост
                    </Button>
                </form>
            </div>
        </Container>
    );
}