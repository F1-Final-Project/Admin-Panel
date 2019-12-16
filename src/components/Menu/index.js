import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline/index'
import { useDispatch, useSelector } from 'react-redux'
import * as categoryActions from '../../store/actions/categories'
import * as dishActions from '../../store/actions/dish'
import DishesPage from './DishesPage'
import MenuDrawer from './MenuNav/MenuDrawer'
import Tables from './Tables'
import Order from '../Order'
import * as orderActions from '../../store/actions/orders'
import MenuAppBar from './MenuNav/MenuAppBar'
import Snackbar from '@material-ui/core/Snackbar'
import useStyles from './style'

export default function Menu() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [category, setCategory] = React.useState(false);
	const [view, setView] = React.useState('tables');
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [table, setTable] = React.useState(false);
	const dispatch = useDispatch();

	const {loaded, categories} = useSelector(state =>
		({categories: state.categories.categories,
			loaded: state.categories.loaded, })
	);

	useEffect(() => categoryActions.getCategories()(dispatch), []);
	useEffect(() => dishActions.getDishes()(dispatch), []);

	const getDishes=(category)=>{
		setView('dishes');
		setCategory([category])
	};

	const onMenuClick=()=>{
		setCategory(categories);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const createNewOrder=(table)=>{
		setTable(table);
		setOpenSnackbar(true);
		setTimeout(()=>setOpenSnackbar(false), 1800);

		orderActions.addOrder(
			{
				orderPrice: 0,
				onKitchen: false,
				completed: false,
				table: table,
				orderItems: [],
				newOrderItems: [],
				// staff:{},
			}
		)(dispatch);
	};

	return (
		<>
			{loaded?(
		<div className={classes.root}>
			<CssBaseline />
			<MenuAppBar
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				setView={setView}
				onMenuClick={onMenuClick}
				createNewOrder={createNewOrder}/>
			<MenuDrawer categories={categories} open={open} handleDrawerClose={handleDrawerClose}  getDishes={getDishes}/>
			<main className={classes.content}>
				{view==='dishes'?(<DishesPage category={category}/>):<Tables createNewOrder={createNewOrder}/>}
			</main>
		</div>)
			: null}
			<Order/>
			<Snackbar className={classes.snackbar}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={openSnackbar}
								message={<span id="message-id">New order table # {table} was created</span>}
			/>
			</>
	);
}

















