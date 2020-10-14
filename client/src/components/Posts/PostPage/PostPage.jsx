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
import {Facebook, FavoriteBorder, LinkedIn, Reply, Twitter} from "@material-ui/icons";
import {useHistory} from 'react-router-dom'
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";


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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

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
                <IconButton aria-label="share" title="Показать друзьям!" aria-describedby={id} onClick={handleClick}>
                    <ShareIcon/>
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <LinkedIn color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="LinkedIn" />
                        </ListItem>
                        <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <Twitter color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="Twitter" />
                        </ListItem>
                        <ListItem
                            button
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <Facebook color="primary"/>
                            </ListItemIcon>
                            <ListItemText primary="Facebook" />
                        </ListItem>
                    </List>
                </Popover>
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