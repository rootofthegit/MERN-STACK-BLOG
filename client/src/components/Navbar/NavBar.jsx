import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../aseets/images/logos.png'
import rofl from '../../aseets/images/rofl.gif'
import {AccountCircle, AddCircle, Apps, PostAdd, SpeakerNotes, Star} from "@material-ui/icons";
import {NavLink, useHistory} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {fade} from "@material-ui/core";
import {AuthContext} from "../../context/AuthContext"
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    broot: {
        backgroundColor: "#f2f5f6",
        marginRight: '30px'
    }
}));


export const NavBar = (props) => {
    const auth = useContext(AuthContext)
    const logoutHandler = () => {
        auth.logout()
        handleMenuClose()
    }

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Мой аккаунт</MenuItem>
            <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <SpeakerNotes/>
                    </Badge>
                </IconButton>
                <p>Ответы на комменты</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="default">
                        <Star/>
                    </Badge>
                </IconButton>
                <p>Понравившиеся</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>{props.userName}</p>
            </MenuItem>
        </Menu>
    );
    const history = useHistory()
    const ale = () => alert("Пасхальный... xy!")
    return (
        <div className={classes.root}>

            <AppBar position="fixed" style={{background: "#eceff1", borderBottom: "solid #90a4ae 1px"}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
                        <Apps/>
                    </IconButton>
                    <div>
                        <NavLink to="/"><img src={logo} width={350} alt={"=))"}
                                             style={{position: "absolute", top: 1, left: 76}}/></NavLink>
                        <img src={rofl} width={29} style={{position: "absolute", top: 41, left: 326}} onClick={ale} alt={"ROFL"}/>                    </div>

                    <div className={classes.grow}/>

                    <div hidden={props.isAuthenticated}>
                    <div className={classes.sectionDesktop}>
                        <Button size="large" color="default" startIcon={<AccountCircle/>} onClick={() => {
                            history.push("/login")
                        }}>
                            Войти</Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<AddCircle/>}
                            onClick={() => {
                                history.push("/register")
                            }}
                        >
                            Зарегаться

                        </Button>
                    </div>
                    </div>
                    <div hidden={!props.isAuthenticated}>
                        <div className={classes.sectionDesktop}>
                            <Paper component="form" className={classes.broot}>
                                <IconButton className={classes.iconButton} aria-label="menu">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Поиск"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                            </Paper>
                            <IconButton color="default" title="Добавить пост" onClick={() => {
                                history.push("/addpost")
                            }}>
                                <PostAdd/>
                            </IconButton>
                            <IconButton color="default" title="Понравившиеся">
                                <Badge badgeContent={17} color="default">
                                    <Star/>
                                </Badge>
                            </IconButton>
                            <IconButton color="default" title="Ответы на комментарии">
                                <Badge badgeContent={4} color="secondary">
                                    <SpeakerNotes/>
                                </Badge>
                            </IconButton>
                            <Button size="large" color="default" startIcon={<AccountCircle/>}
                                    onClick={handleProfileMenuOpen}>
                                {props.userName}
                            </Button>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="default"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </div>

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}