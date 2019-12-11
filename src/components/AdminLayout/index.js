import React, { useState, useReducer } from 'react'
import clsx from 'clsx'
import {useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import TableChartIcon from '@material-ui/icons/TableChart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ListAltIcon from '@material-ui/icons/ListAlt';

import FoodWareHouse from '../FoodWarehouse'
import Dishes from '../Dishes'
import OrderIngredients from '../OrderIngredients'
import reducer from './localAdminReduser'
import {useStyles} from './AdminLayoutCSS'



export default function MiniDrawer() {
	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen] = useState(false)


	const initState = {
		main: false,
		menu: false,
		foodWareHouse: true,
		statistics: false,
		orderIngredients: false,
	}

	const [state, dispatch] = useReducer(reducer, initState)


	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}


	const handleOpenCategories = (e, categories) => {
		dispatch({
			type: `open${categories}`,
			payload: true,

		})
	}


	const menuItem = () => {
		return [{ Main: 'Главная' },
			{ Menu: 'Меню' },
			{ FoodWareHouse: 'Учет товара' },
			{ Statistics: 'Статистика' },
			{ OrderIngredients: 'Заказ ингредиентов' }].map((text, index) => {
			return Object.entries(text).map(i => {
				return (
					<ListItem button key={text} onClick={e => handleOpenCategories(e, i[0])}>
						<ListItemIcon>
							{index === 0 && <HomeIcon/>}
							{index === 1 && <RestaurantMenuIcon/>}
							{index === 2 && <TableChartIcon/>}
							{index === 3 && <EqualizerIcon/>}
							{index === 4 && <ListAltIcon/>}
						</ListItemIcon>

						<ListItemText primary={i[1]}/>
					</ListItem>
				)
			})
		})

	}

	return (
		<div className={classes.rootAdminPanel}>
			<CssBaseline/>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
				open={open}
			>
				<div className={classes.toolbar}>
					{open && 'Admin panel'}
					{open ? (
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
							</IconButton>)
						: (
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								className={clsx(classes.menuButton, {
									[classes.hide]: open,
								})}
							>
								<ChevronRightIcon/>
							</IconButton>)
					}
				</div>
				<Divider/>
				<List>
					{menuItem()}
				</List>
			</Drawer>
			<main className={classes.content}>

				{state.foodWareHouse && <FoodWareHouse/>}
				{state.menu && <Dishes/>}
				{state.orderIngredients && <OrderIngredients/>}
			</main>
		</div>
	)
}

