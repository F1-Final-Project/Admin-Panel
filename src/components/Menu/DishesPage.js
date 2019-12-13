import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux'
import * as orderActions from '../../store/actions/orders'
import Snackbar from '@material-ui/core/Snackbar'
import Dish from './Dish'

const useStyles = makeStyles({
	wrap:{
		paddingTop: 60,
	},
});

export default function DishesPage(props) {
	const {category} = props;
	const classes = useStyles();
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);
	const [table, setTable] = React.useState(false);
	const [dishToOrder, setDishToOrder] = React.useState(false);
	const [coordinates, setCoordinates] = React.useState({x: 0, y: 0});

	const {activeOrder, orders, dishes} = useSelector(state =>
		({activeOrder: state.order.active,
			orders: state.order.orders,
			dishes: state.dish.dishes})
	);

	const addDishToOrder= (dish,event) => {
		setCoordinates({x:event.clientX, y:event.clientY});

		if(activeOrder) {
			const thisOrder = orders.find((item) => item._id === activeOrder);

			const newItem = {
				title: dish.title,
				description: dish.description,
				ingredients: dish.ingredients,
				additionalIngredients: dish.additionalIngredients,
				price: dish.price,
				weight: dish.weight,
			}

			thisOrder.orderPrice= +(thisOrder.orderPrice)+ +(dish.price);

			if(!thisOrder.onKitchen&&!thisOrder.completed){
				if (thisOrder.orderItems.length > 0) {
					(thisOrder.orderItems).push(newItem);
				} else {thisOrder.orderItems = [newItem];}

			} else if(thisOrder.onKitchen&&!thisOrder.completed){
				if (Array.isArray(thisOrder.newOrderItems)) {
					(thisOrder.newOrderItems).push(newItem);
				} else {thisOrder.newOrderItems = [newItem];}
			}
			else{alert('Order already completed')}

			if(!thisOrder.completed) {
				orderActions.updateOrder({
					// staff: thisOrder.staff,
					table: thisOrder.table,
					orderPrice: thisOrder.orderPrice,
					onKitchen: thisOrder.onKitchen,
					completed: thisOrder.completed,
					orderItems: thisOrder.orderItems,
					newOrderItems: thisOrder.newOrderItems,
				}, activeOrder)(dispatch);

				setTable(thisOrder.table);
				setDishToOrder(dish.title)
				setOpen(true);
				setTimeout(() => setOpen(false), 1800)
			}
		}
		else{alert('Choose the order')}
	}

	return (
		<>
			<Grid container className={classes.wrap} justify="center">
				{category.map((item)=>
					<Dish item={item} dishes={dishes} addDishToOrder={addDishToOrder}/>

				)}
			</Grid>
			<Snackbar style={{marginTop: coordinates.y, marginLeft: coordinates.x}}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={open}
								message={<span id="message-id">{dishToOrder} added to order table # {table}</span>}
			/>
		</>
	);
}