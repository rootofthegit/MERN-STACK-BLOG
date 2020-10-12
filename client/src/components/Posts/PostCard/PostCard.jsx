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
import {Comment, FavoriteBorder} from "@material-ui/icons";
import {useHistory} from "react-router-dom"
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    root: {
        maxWidth: 393,
    },
    media: {
        height: 250,
    },
    marginL: {
        marginLeft: 'auto'
    }
});

export const PostCard = (props) => {
    const classes = useStyles();
    const shortTitle = (props.postTitle.length > 81) ? (`${props.postTitle.substring(0, 81)}...`) : (props.postTitle)
    const shortText = (props.postText.length > 289) ? (`${props.postText.substring(0, 289)}...`) : (props.postText)
    const history = useHistory()
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => {
                history.push(`posts/${props.postId}`)
            }}>
                <CardMedia
                    className={classes.media}
                    image={props.imageSrc}
                    title={shortTitle}
                />
                <CardContent>
                    <Typography variant="subtitle2" gutterBottom color="secondary">
                        {shortTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {shortText}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton title="Like!" onClick={props.likeHandler}>
                    <Badge badgeContent={props.postLikes} color={((props.likeIndex!==-1)&&"secondary")||"default"}>
                        {((props.likeIndex!==-1)&&<FavoriteIcon/>)||<FavoriteBorder/>}
                    </Badge>
                </IconButton>
                <IconButton title="Добавить комментарий">
                    <Comment/>
                </IconButton>
                <IconButton title="Показать друзьям!">
                    <ShareIcon/>
                </IconButton>

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
