import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import HomeIcon from '@material-ui/icons/Home'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import TableChartIcon from '@material-ui/icons/TableChart'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ListAltIcon from '@material-ui/icons/ListAlt'

import FoodWareHouse from '../FoodWarehouse'
import Dishes from '../Dishes'
import OrderIngredients from '../OrderIngredients'
import { useStyles, TableIconButton, CssTab, CssTabs } from './AdminLayoutCSS'
import TabPanel from '../common/TabPanel'
import useTheme from '@material-ui/core/styles/useTheme'
import { CssDivider } from '../OrderIngredients/OrderIngredientsCSS'
import Header from '../Header'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import RevenueSchedule from '../RevenueSchedule'


export default function MiniDrawer(props) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const theme = useTheme()

	const { window } = props

	const grey = {
		'--color': '#d0cdc7',
	}

	const defaultColor = {
		'--color': '#212121',
	}

	const [color, setColor] = React.useState(defaultColor)

	const handleDrawerOpen = () => {
		setOpen(true)
		setColor(grey)
	}

	const handleDrawerClose = () => {
		setOpen(false)
		setColor(defaultColor)
	}

	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	function handlePropsTabs(index) {
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`,
		}
	}


	const menuItem = () => {
		return [{ Main: 'Главная' },
			{ Menu: 'Редактирования блюд' },
			{ FoodWareHouse: 'Склад товара' },
			{ Statistics: 'Статистика' },
			{ OrderIngredients: 'Заказ ингредиентов' }].map((text, index) => {
			return Object.entries(text).map(i => {
				return (
					<CssTab key={text}
									{...handlePropsTabs(index)}
									label={i[1]}
									icon={TabIcon(index)}
									style={color}
					/>
				)
			})
		})
	}

	const TabIcon = index => {
		switch (index) {
			case 0:
				return <HomeIcon className={classes.adminIcon}/>
			case 1 :
				return <RestaurantMenuIcon className={classes.adminIcon}/>
			case 2 :
				return <TableChartIcon className={classes.adminIcon}/>
			case 3 :
				return <EqualizerIcon className={classes.adminIcon}/>
			case 4 :
				return <ListAltIcon className={classes.adminIcon}/>
			default:
				break
		}
	}

	const trigger = useScrollTrigger({ target: window ? window() : undefined })

	const [visible, setVisible] = useState(false)

	const headerRef = useCallback(node => {

		if (node !== null) {
			const rowHeight = node.style.transform

			setVisible(rowHeight === '' || rowHeight === 'none')
		}
	}, [trigger])

	return (
		<>
			<Header headerRef={headerRef}/>
			<div className={classes.rootAdminPanel}>
				<CssBaseline/>
				<Drawer
					variant="permanent"
					className={clsx(visible ? classes.drawer : classes.drawerHidden, {
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
								<TableIconButton onClick={handleDrawerClose}>
									{theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
								</TableIconButton>)
							: (
								<TableIconButton
									color="inherit"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									edge="start"
									className={clsx(classes.menuButton, {
										[classes.hide]: open,
									})}
								>
									<ChevronRightIcon/>
								</TableIconButton>)
						}
					</div>
					<CssDivider/>

					<CssTabs
						orientation="vertical"
						variant="scrollable"
						value={value}
						onChange={handleChange}
						aria-label="Vertical tabs example"
						className={classes.tabs}
					>
						{menuItem()}
					</CssTabs>
				</Drawer>
				<main className={classes.content}>

					<TabPanel value={value} index={0}>
						<RevenueSchedule/>
					</TabPanel>

					<TabPanel value={value} index={1}>
						<Dishes/>
					</TabPanel>

					<TabPanel value={value} index={2}>
						<FoodWareHouse/>
					</TabPanel>

					<TabPanel value={value} index={4}>
						<OrderIngredients/>
					</TabPanel>

				</main>
			</div>
		</>
	)
}

