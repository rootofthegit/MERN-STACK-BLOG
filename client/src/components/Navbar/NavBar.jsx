import React, {useContext} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../aseets/images/logos.png'
import rofl from '../../aseets/images/rofl.gif'
import {
    AccountCircle,
    AddCircle,
    AddToQueue,
    EmojiNature,
    FiberNew, ImageSearch,
    InsertEmoticon, Pets,
    PostAdd, Reddit,
    SpeakerNotes, SportsKabaddi, SportsTennis,
    Star, Subject, Wallpaper
} from "@material-ui/icons";
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import {NavLink, useHistory} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {fade} from "@material-ui/core";
import {AuthContext} from "../../context/AuthContext"
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from "clsx";


const drawerWidth = 240;

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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
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

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
    )
    const history = useHistory()
    const ale = () => alert("Пасхальный... xy!")
    return (
        <div className={classes.root}>

            <AppBar position="fixed" style={{background: "#eceff1", borderBottom: "solid #90a4ae 1px"}}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu"
                                title="Разделы прикольные =)" onClick={handleDrawerOpen}>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavLink to="/"><img src={logo} width={350} alt={"=))"} title="Самый гуманный в мире!"
                                             style={{position: "absolute", top: 1, left: 76}}/></NavLink>
                        <img src={rofl} width={29} style={{position: "absolute", top: 41, left: 326}} onClick={ale}
                             alt={"ROFL"}/></div>

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
                            {/*<Paper component="form" className={classes.broot}>
                                <IconButton className={classes.iconButton} aria-label="menu">
                                    <SearchIcon/>
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Поиск"
                                    inputProps={{'aria-label': 'search google maps'}}
                                />
                            </Paper>*/}
                            <div hidden={props.role!=='admin'}>
                                <IconButton color="default" title="Добавить пост" onClick={() => {
                                    history.push("/addpost")
                                }}>
                                    <PostAdd/>
                                </IconButton>
                                <IconButton color="default" title="Запарсить еще новостей" onClick={() => {
                                    history.push("/parsing")
                                }}>
                                    <AddToQueue/>
                                </IconButton>
                            </div>
                            <IconButton color="default" title="Понравившиеся">
                                <Badge badgeContent={props.likedPosts.length} color="default">
                                    <Star/>
                                </Badge>
                            </IconButton>
                            <IconButton color="default" title="Мои комментарии">
                                <Badge badgeContent={props.comments.length} color="secondary">
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
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('jumor'))} alignItems={"center"}>
                        <ListItemIcon><InsertEmoticon color="inherit"/></ListItemIcon>
                        <ListItemText primary="Юмор"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('photo'))}>
                        <ListItemIcon><MonochromePhotosIcon color="inherit"/></ListItemIcon>
                        <ListItemText primary="Фотоприколы"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('stories'))}>
                        <ListItemIcon><Subject color="inherit"/></ListItemIcon>
                        <ListItemText primary="Истории"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('demotivation'))}>
                        <ListItemIcon><Wallpaper color="inherit"/></ListItemIcon>
                        <ListItemText primary="Демотиваторы"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('anekdot'))}>
                        <ListItemIcon><Reddit color="inherit"/></ListItemIcon>
                        <ListItemText primary="Анекдоты"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('FunnyPictures'))}>
                        <ListItemIcon><ImageSearch color="inherit"/></ListItemIcon>
                        <ListItemText primary="Смешные картинки"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('animals'))}>
                        <ListItemIcon><Pets color="inherit"/></ListItemIcon>
                        <ListItemText primary="Животные"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('wildNature'))}>
                        <ListItemIcon><EmojiNature color="inherit"/></ListItemIcon>
                        <ListItemText primary="Дикая природа"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('sport'))}>
                        <ListItemIcon><SportsTennis color="inherit"/></ListItemIcon>
                        <ListItemText primary="Спорт"/>
                    </ListItem>
                    <ListItem button onClick={() => (props.categoryChoosingHandler('military'))}>
                        <ListItemIcon><SportsKabaddi color="inherit"/></ListItemIcon>
                        <ListItemText primary="Военное"/>
                    </ListItem>

                </List>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemIcon><FiberNew color="error"/></ListItemIcon>
                        <ListItemText primary="Свежие приколы"/>
                    </ListItem>
                </List>
            </Drawer>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}