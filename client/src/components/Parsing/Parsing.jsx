import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ArtTrack} from "@material-ui/icons";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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

export default function Parsing(props) {
    const classes = useStyles();

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ArtTrack/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Парсинг постов
                </Typography>
                <form className={classes.form} onSubmit={props.onSubmitHandler} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="postName"
                        label="Ссылка для парсинга"
                        name="parseLink"
                        autoComplete="parseLink"
                        autoFocus
                        onChange={props.changeTextHandler}
                    />

                    <RadioGroup aria-label="parseCategory" name="parseCategory" onChange={props.changeTextHandler}>
                        <FormControlLabel value="news" control={<Radio />} label="Новости" />
                        <FormControlLabel value="jumor" control={<Radio />} label="Юмор" />
                        <FormControlLabel value="photo" control={<Radio />} label="Фото" />
                        <FormControlLabel value="stories" control={<Radio />} label="Истории" />
                        <FormControlLabel value="FunnyPictures" control={<Radio />} label="Смешные картинки" />
                        <FormControlLabel value="animals" control={<Radio />} label="Животные" />
                        <FormControlLabel value="wildNature" control={<Radio />} label="Дикая природа" />
                        <FormControlLabel value="sport" control={<Radio />} label="Спорт" />
                        <FormControlLabel value="military" control={<Radio />} label="Военное" />
                    </RadioGroup>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={props.loading}
                    >
                        Запарсить еще новостей
                    </Button>
                </form>
            </div>
        </Container>
    );
}