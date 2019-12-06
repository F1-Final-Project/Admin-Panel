import React, { useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles/index'
import AppBar from '@material-ui/core/AppBar/index'
import Toolbar from '@material-ui/core/Toolbar/index'
import CssBaseline from '@material-ui/core/CssBaseline/index'
import Typography from '@material-ui/core/Typography/index'
import IconButton from '@material-ui/core/IconButton/index'
import MenuIcon from '@material-ui/icons/Menu'
import grey from '@material-ui/core/colors/grey'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryActions from '../../store/actions/categories'
import DishesPage from './DishesPage'
import ChangeActiveOrderButton from './Buttons/ChangeActiveOrderButton'
import ActiveOrderButton from './Buttons/ActiveOrderButton'
import CreateNewOrderButton from './Buttons/CreateNewOrderButton'
import MenuDrawer from './MenuDrawer'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function SideBar() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	const {loaded, categories, dishLoaded, dishes} = useSelector(state =>
		({categories: state.categories.categories,
			loaded: state.categories.loaded,
			dishes: state.dish.dishes,
			dishLoaded: state.dish.loaded})
	);

	useEffect(() => categoryActions.getCategories()(dispatch), []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			{loaded?(
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				style={{background: grey[400]}}
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap className={classes.title}>
						MENU
					</Typography>
					<CreateNewOrderButton/>
					<ActiveOrderButton/>
					<ChangeActiveOrderButton/>
				</Toolbar>
			</AppBar>
			<MenuDrawer categories={categories} open={open} handleDrawerClose={handleDrawerClose}/>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{dishLoaded?(<DishesPage dishes={dishes}/>):null}
			</main>
		</div>)
			: null}
			</>
	);
}

















