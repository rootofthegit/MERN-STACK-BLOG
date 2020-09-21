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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {Comment} from "@material-ui/icons";

import image from "../../../aseets/images/img1.jpg"


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
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.imageSrc}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="subtitle2" gutterBottom color="secondary">
                        {props.postTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.shortPostText}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="add comment">
                    <Comment/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>

                <Button size="large" color="default" className={classes.marginL}
                             >
                         Подробнее...
                     </Button>
            </CardActions>

        </Card>
    );
}