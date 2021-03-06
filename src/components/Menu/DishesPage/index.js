import React from 'react'
import useStyles from './style'
import Grid from '@material-ui/core/Grid/index'
import { useDispatch, useSelector } from 'react-redux'
import * as orderActions from '../../../store/actions/orders'
import Snackbar from '@material-ui/core/Snackbar/index'
import Dish from './Dish'
import * as alertActions from "../../../store/actions/alert";
import SnackbarContent from "@material-ui/core/SnackbarContent";

export default function Index(props) {
	const {category} = props;
	const classes = useStyles();
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);
	const [table, setTable] = React.useState(false);
	const [dishToOrder, setDishToOrder] = React.useState(false);
	const [coordinates, setCoordinates] = React.useState({x: 0, y: 0});

	const {order, dishes} = useSelector(state =>
		({order: state.order.active,
			dishes: state.dish.dishes})
	);

	const addDishToOrder= (dish,event) => {
		setCoordinates({x:event.clientX, y:event.clientY});

		if(order) {
			const newItem = {
				title: dish.title,
				description: dish.description,
				ingredients: dish.ingredients,
				additionalIngredients: dish.additionalIngredients,
				price: dish.price,
				weight: dish.weight,
			};

			order.orderPrice= +(order.orderPrice)+ +(dish.price);

			if(!order.onKitchen&&!order.completed){
				if (order.orderItems.length > 0) {
					(order.orderItems).push(newItem);
				} else {order.orderItems = [newItem];}

			} else if(order.onKitchen&&!order.completed){
				if (Array.isArray(order.newOrderItems)) {
					(order.newOrderItems).push(newItem);
				} else {order.newOrderItems = [newItem];}
			}
			else{alertActions.openAlert({open: true, message: 'Order already completed'})(dispatch)}

			if(!order.completed) {
				orderActions.updateOrder({
					staff: order.staff,
					table: order.table,
					orderPrice: order.orderPrice,
					onKitchen: order.onKitchen,
					completed: order.completed,
					orderItems: order.orderItems,
					newOrderItems: order.newOrderItems,
				}, order._id)(dispatch);

				setTable(order.table);
				setDishToOrder(dish.title);
				setOpen(true);
				setTimeout(() => setOpen(false), 2200)
			}
		}
		else{alertActions.openAlert({open: true, message: 'Choose the order'})(dispatch)}
	};

	return (
		<>
			{(category)?(
				<Grid container className={classes.wrap} justify="center">
					{category.map((item)=>
						<Dish key={item._id} item={item} dishes={dishes} addDishToOrder={addDishToOrder}/>
					)}
				</Grid>
			): null}
			<Snackbar style={{marginTop: coordinates.y, marginLeft: coordinates.x}}
					  anchorOrigin={{
						  vertical: 'top',
						  horizontal: 'left',
					  }}
					  open={open}
					  className={classes.snackbar}>
				<SnackbarContent
					className={classes.snackbarContent}
					message={<span id="message-id">{dishToOrder} added to order table # {table}</span>}
				/>
			</Snackbar>
		</>
	);
}