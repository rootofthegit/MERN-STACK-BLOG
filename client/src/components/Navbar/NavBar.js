import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../aseets/images/logos.png'
import rofl from '../../aseets/images/rofl.gif'
import {AccountCircle, AddCircle, Apps} from "@material-ui/icons";
import {NavLink, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export const NavBar = () => {
    const history = useHistory()
    const classes = useStyles();
    const aler = () => alert("Пасхальный... хуй!")
    return (
        <div className={classes.root}>

            <AppBar position="static" style={{background: "white"}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="black" aria-label="menu">
                        <Apps/>
                    </IconButton>
                    <div>
                        <NavLink to="/"><img src={logo} width={350} style={{position: "absolute", top: 1, left: 76}} /></NavLink>
                        <img src={rofl} width={29} style={{position: "absolute", top: 41, left: 326}} onClick={aler}/>
                    </div>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                    <Button size="large" color="default" startIcon={<AccountCircle/>} onClick={() => {
                        history.push("/login")
                    }}>
                        Войти</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddCircle />}
                        onClick={() => {
                            history.push("/register")
                        }}
                    >
                        Зарегаться

                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}