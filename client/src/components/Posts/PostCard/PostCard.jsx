import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from '@material-ui/icons/Share';
import {Comment, Facebook, FavoriteBorder, LinkedIn, Twitter} from "@material-ui/icons";
import {useHistory} from "react-router-dom"
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 393,
    },
    media: {
        height: 280,
    },
    marginL: {
        marginLeft: 'auto'
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

export const PostCard = (props) => {
    const classes = useStyles();
    const shortTitle = (props.postTitle.length > 81) ? (`${props.postTitle.substring(0, 81)}...`) : (props.postTitle)
    const shortText = (props.postText.length > 289) ? (`${props.postText.substring(0, 289)}...`) : (props.postText)
    const history = useHistory()

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

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => {
                history.push(`posts/${props.postId}`)
            }}>
                <CardHeader
                    title={<Typography variant="subtitle2" gutterBottom color="error">{shortTitle}</Typography>}
                />
                <CardMedia
                    className={classes.media}
                    image={props.imageSrc}
                    title={shortTitle}
                />
                <CardContent>
                    <Typography variant="body2" color="initial" component="p">
                        {shortText}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton title="Like!" onClick={props.likeHandler}>
                    <Badge badgeContent={props.postLikes}
                           color={((props.likeIndex !== -1) && "secondary") || "default"}>
                        {((props.likeIndex !== -1) && <FavoriteIcon/>) || <FavoriteBorder/>}
                    </Badge>
                </IconButton>
                <IconButton title="Добавить комментарий" onClick={() => {
                    history.push(`posts/${props.postId}`)
                }}>
                    <Badge badgeContent={props.comments.length}
                           color="secondary">
                        <Comment/>
                    </Badge>
                </IconButton>
                <IconButton title="Показать друзьям!" aria-describedby={id} onClick={handleClick}>
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

                <Button size="large" color="default" className={classes.marginL}
                        onClick={() => {
                            history.push(`posts/${props.postId}`)
                        }}>
                    Подробнее...
                </Button>
            </CardActions>

        </Card>
    );
}
