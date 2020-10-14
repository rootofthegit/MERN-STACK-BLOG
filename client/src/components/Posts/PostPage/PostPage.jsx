import React from "react";
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {FavoriteBorder, Reply} from "@material-ui/icons";
import {useHistory} from 'react-router-dom'
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export const PostPage = (props) => {
    const classes = useStyles();

    const history = useHistory()
    const {title, postText, imageSrc, date} = props.post

    return <Container maxWidth="lg" style={{marginTop: 90}}>
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={() => {
                        history.goBack()
                    }}>
                        <Reply/>
                    </IconButton>
                }
                title={title}
                subheader={`Добавленно: ${date.substring(11, 19)}, ${date.substring(0, 10)}`}
            />
            <CardMedia
                className={classes.media}
                image={imageSrc}
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {postText}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton title="Like!" onClick={props.likeHandler}>
                    <Badge badgeContent={props.post.likes}
                           color={((props.likeIndex !== -1) && "secondary") || "default"}>
                        {((props.likeIndex !== -1) && <FavoriteIcon/>) || <FavoriteBorder/>}
                    </Badge>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>
        <Card className={classes.root} style={{marginTop: 20, backgroundColor: "#f5f5f5"}}>
            <CardHeader title="Комментарии" style={{backgroundColor:"#E3E3E3"}}/>
            <CardContent>
                {props.post.comments.map((comment) => {
                    return (
                        <Card className={classes.root} key={comment._id} style={{marginBottom: 20}}>
                            <CardHeader style={{borderBottom: "1px solid #C8C8C8", backgroundColor: "#fafafa"}}
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {comment.userName.substring(0, 1)}
                                    </Avatar>
                                }
                                title={comment.userName}
                                subheader={ comment.date }
                            />
                            <CardContent >
                                <Typography variant="subtitle2">
                                    {comment.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
                <TextField
                    id="postText"
                    label="Введите свой комментарий"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="comment"
                    fullWidth
                    onChange={props.changeHandler}
                    margin="normal"
                />
                <Button variant="contained" color="secondary" onClick={props.commentHandler}>
                    Добавить комментарий
                </Button>
            </CardContent>
        </Card>
    </Container>

}