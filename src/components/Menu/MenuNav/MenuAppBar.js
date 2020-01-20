import React, {useState, useEffect} from 'react'
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
import Logout from '../../common/Logout'
import useStyles from './styleAppBar'
import AdminButtons from "../Buttons/AdminButtons";

export default function MenuAppBar(props) {
	const classes = useStyles();
	const width=window.screen.availWidth;
	const permission=sessionStorage.getItem('permission');

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
				{width>446|| (permission === 'waiter'&& width>336)?
					(<MenuButton setView={props.setView} onMenuClick={props.onMenuClick}/>)
					: null}
				<ShowAllTablesButton setView={props.setView}/>
				<CreateNewOrderButton createNewOrder={props.createNewOrder}/>
				{width>519|| (permission === 'waiter'&& width>410)?
					(<ChangeActiveOrderButton/>)
					: null}
				{width>609|| (permission === 'waiter'&& width>492)?
					(<ActiveOrderButton/>)
					: null}
				<div className={classes.headerToolBar}>
					{permission === 'admin'?
						(<AdminButtons/>)
						:null}
					<Logout/>
				</div>
			</Toolbar>
		</AppBar>
	);
}

















