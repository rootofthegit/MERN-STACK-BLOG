import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
    0.5: 'НеСмешно',
    1: 'Ну такое',
    1.5: 'Поедет',
    2: 'Пайдет',
    2.5: 'Пабежид',
    3: 'Прикольно!',
    3.5: 'Угар!',
    4: 'Азазаза=)',
    4.5: 'До слез!',
    5: 'GreatJob!',
};

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

export default function HoverRating() {
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
        </div>
    );
}
