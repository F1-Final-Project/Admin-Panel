import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles/index'
import AppBar from '@material-ui/core/AppBar/index'
import Toolbar from '@material-ui/core/Toolbar/index'
import MenuButton from './Buttons/MenuButton'
import IconButton from '@material-ui/core/IconButton/index'
import MenuIcon from '@material-ui/icons/Menu'
import grey from '@material-ui/core/colors/grey'
import ChangeActiveOrderButton from './Buttons/ChangeActiveOrderButton'
import ActiveOrderButton from './Buttons/ActiveOrderButton'
import CreateNewOrderButton from './Buttons/CreateNewOrderButton'
import ShowAllTablesButton from './Buttons/ShowAllTablesButton'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
}));

export default function MenuAppBar(props) {
	const classes = useStyles();

	return (
			<AppBar
				position="fixed"
				style={{background: grey[400]}}
				className={clsx(classes.appBar, {
					[classes.appBarShift]: props.open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={props.handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: props.open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<MenuButton setView={props.setView} onMenuClick={props.onMenuClick}/>
					<ShowAllTablesButton setView={props.setView}/>
					<CreateNewOrderButton createNewOrder={props.createNewOrder}/>
					<ActiveOrderButton/>
					<ChangeActiveOrderButton/>
				</Toolbar>
			</AppBar>
	);
}

















