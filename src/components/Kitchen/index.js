import React, { useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as orderActions from '../../store/actions/orders'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CompletedButton from './CompletedButton'
import Box from '@material-ui/core/Box'
import Header from '../Header'
import useStyles from './style'
import OrderDish from "./Dish";
import * as dishActions from "../../store/actions/dish";

export default function KitchenPage() {
	const dispatch = useDispatch();

	useEffect(() => orderActions.getOrders()(dispatch), []);
	useEffect(() => dishActions.getDishes()(dispatch), []);

	const classes = useStyles();

	const {orders, dishes} = useSelector(state =>
		({ orders: state.order.orders,
			dishes: state.dish.dishes}));

	const showDate=(date)=>{
		return ` ${new Date(date).getHours()} : ${new Date(date).getMinutes()} , ${new Date(date).getDate()}.${new Date(date).getMonth()+1}.${new Date(date).getFullYear()}`
	};

	const onKitchen=orders.filter(item=>
		item.onKitchen===true&&item.completed===false
	);

	return (
		<>
		<Header/>
		<Grid container className={classes.grid} justify="center">
			{onKitchen.length>0?onKitchen.map(order=>
				<Box key={order._id} className={classes.box} border={1} borderColor='#7a6c5b' borderRadius={5}>
			<Card key={order._id} className={classes.card}>
				<CardContent className={classes.content}>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						table # {order.table}
					</Typography>
					<Typography className={classes.content} variant="body2" component="p">
						onKitcnen from: {showDate(order.updated_at||order.created_at)}
					</Typography>
					<div className={classes.pos} color="textSecondary">
						 {order.orderItems.map(dish=>
							 <OrderDish key={dish._id} dish={dish} recipeDish={dishes.find((item)=> item.title===dish.title)}/>
						 )}
					</div>
				</CardContent>
				<Grid container justify="center">
					<CompletedButton order={order}/>
				</Grid>
			</Card>
				</Box>
			):
			<h1 className={classes.text}>there are no orders in the kitchen now</h1>
			}
		</Grid>
		</>
	);
}