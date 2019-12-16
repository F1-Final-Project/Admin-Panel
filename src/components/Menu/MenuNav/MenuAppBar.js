import React from 'react'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar/index'
import Toolbar from '@material-ui/core/Toolbar/index'
import MenuButton from '../Buttons/MenuButton'
import IconButton from '@material-ui/core/IconButton/index'
import MenuIcon from '@material-ui/icons/Menu'
import ChangeActiveOrderButton from '../Buttons/ChangeActiveOrderButton'
import ActiveOrderButton from '../Buttons/ActiveOrderButton'
import CreateNewOrderButton from '../Buttons/CreateNewOrderButton'
import ShowAllTablesButton from '../Buttons/ShowAllTablesButton'
import { makeStyles, useTheme } from '@material-ui/core/styles/index';
import useStyles from './styleAppBar'

export default function MenuAppBar(props) {
	const classes = useStyles();

	return (

		<AppBar
			position="fixed"
			className={`${classes.app} ${clsx(classes.appBar, {
				[classes.appBarShift]: props.open,
			})}`}
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

















