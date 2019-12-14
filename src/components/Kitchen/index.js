import React, { useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as orderActions from '../../store/actions/orders'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CompletedButton from './CompletedButton'
import Box from '@material-ui/core/Box'
import useStyles from './style'

export default function KitchenPage() {
	const dispatch = useDispatch();

	useEffect(() => orderActions.getOrders()(dispatch), []);
	const classes = useStyles();

	const {orders} = useSelector(state =>
		({ orders: state.order.orders})
	);

	const onKitchen=orders.filter(item=>
		item.onKitchen===true&&item.completed===false
	);

	return (
		<Grid container className={classes.grid} justify="center">
			{onKitchen.length>0?onKitchen.map(order=>
				<Box className={classes.box} border={1} borderColor='#7a6c5b' borderRadius={5}>
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						table # {order.table}
					</Typography>
					<Typography className={classes.content} variant="body2" component="p">
						onKitcnen from: {order.updated_at||order.created_at}
					</Typography>
					<Typography className={classes.pos} color="textSecondary">
						 {order.orderItems.map(dish=>
							 <>
								 <Typography className={classes.title} gutterBottom variant="h5" component="h3">{dish.title}</Typography>
								 <Typography className={classes.content} variant="body2" component="p">weight: {dish.weight} gr</Typography>
						 {dish.ingredients.map(ingredient=>
							 <li className={classes.content}>{ingredient.title}</li>
							 )}
							 </>
						 )}
					</Typography>
				</CardContent>
				<Grid container justify="center">
					<CompletedButton order={order}/>
				</Grid>
			</Card>
				</Box>
			):
			<h1>there are no orders in the kitchen now</h1>
			}
		</Grid>
	);
}