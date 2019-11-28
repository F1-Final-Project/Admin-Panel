import clsx from 'clsx';import {useTheme} from '@material-ui/core/styles';import Drawer from '@material-ui/core/Drawer';import AppBar from '@material-ui/core/AppBar';import Toolbar from '@material-ui/core/Toolbar';import List from '@material-ui/core/List';import CssBaseline from '@material-ui/core/CssBaseline';import Typography from '@material-ui/core/Typography';import Divider from '@material-ui/core/Divider';import IconButton from '@material-ui/core/IconButton';import MenuIcon from '@material-ui/icons/Menu';import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';import ChevronRightIcon from '@material-ui/icons/ChevronRight';import ListItem from '@material-ui/core/ListItem';import ListItemIcon from '@material-ui/core/ListItemIcon';import ListItemText from '@material-ui/core/ListItemText';import {ExpandLess, ExpandMore} from "@material-ui/icons";import Collapse from "@material-ui/core/Collapse";import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';import PersonAddIcon from '@material-ui/icons/PersonAdd';import EqualizerIcon from '@material-ui/icons/Equalizer';import StorageIcon from '@material-ui/icons/Storage';import React, {useState} from 'react';import useStyles from './style';import * as CONSTANT from './constants'export default function MiniDrawer() {    const classes = useStyles();    const theme = useTheme();    const [openPanel, setOpenPanel] = useState({appBar: true, collapseList: false});    const [loadComponent, setLoadComponent] = useState(CONSTANT.STATISTIC);    const handleDrawerClick = () => {        setOpenPanel({...openPanel, ...{appBar: !openPanel.appBar}});    };    const handleCollapseListClick = () => {        setOpenPanel({...openPanel, ...{collapseList: !openPanel.collapseList}});    };    const handleListComponentClick = (e) => {        setLoadComponent(e.currentTarget.getAttribute('id'));    };    return (        <div className={classes.root}>            <CssBaseline/>            <AppBar                position="fixed"                className={clsx(classes.appBar, {                    [classes.appBarShift]: openPanel.appBar,                })}            >                <Toolbar>                    <IconButton                        color="inherit"                        aria-label="open drawer"                        onClick={handleDrawerClick}                        edge="start"                        className={clsx(classes.menuButton, {                            [classes.hide]: openPanel.appBar,                        })}                    >                        <MenuIcon/>                    </IconButton>                    <Typography variant="h6" noWrap>                        Admin Panel                    </Typography>                </Toolbar>            </AppBar>            <Drawer                variant="permanent"                className={clsx(classes.drawer, {                    [classes.drawerOpen]: openPanel.appBar,                    [classes.drawerClose]: !openPanel.appBar,                })}                classes={{                    paper: clsx({                        [classes.drawerOpen]: openPanel.appBar,                        [classes.drawerClose]: !openPanel.appBar,                    }),                }}                open={openPanel.appBar}            >                <div className={classes.toolbar}>                    <IconButton onClick={handleDrawerClick}>                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}                    </IconButton>                </div>                <Divider/>                <List>                    <ListItem button onClick={handleCollapseListClick} >                        <ListItemIcon>                            <QueuePlayNextIcon/>                        </ListItemIcon>                        <ListItemText primary="Add instance"/>                        {openPanel.collapseList ? <ExpandLess/> : <ExpandMore/>}                    </ListItem>                    <Collapse in={openPanel.collapseList} timeout="auto" unmountOnExit>                        <List component="div" disablePadding>                            <ListItem                                button                                className={classes.nested}                                onClick={handleListComponentClick}                                id={CONSTANT.NEW_USER}>                                <ListItemIcon>                                    <PersonAddIcon/>                                </ListItemIcon>                                <ListItemText primary='New User'/>                            </ListItem>                            <ListItem                                button                                className={classes.nested}                                onClick={handleListComponentClick}                                id={CONSTANT.NEW_DISH}>                            >                                <ListItemIcon>                                    <QueuePlayNextIcon/>                                </ListItemIcon>                                <ListItemText primary='New Dish'/>                            </ListItem>                        </List>                    </Collapse>                    <ListItem                        button                        onClick={handleListComponentClick}                        id={CONSTANT.STATISTIC}                    >                        <ListItemIcon>                            <EqualizerIcon/>                        </ListItemIcon>                        <ListItemText primary='Statistic'/>                    </ListItem>                    <ListItem                        button                        onClick={handleListComponentClick}                        id={CONSTANT.STORAGE}                    >                        <ListItemIcon>                            <StorageIcon/>                        </ListItemIcon>                        <ListItemText primary='Storage'/>                    </ListItem>                </List>                <Divider/>                <List>                    --TO DO (User capabilities)                </List>            </Drawer>            <main className={classes.content}>                <div className={classes.toolbar}/>            </main>        </div>    );}