import React, { useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as orderActions from '../../store/actions/orders'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CompletedButton from './CompletedButton'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	card: {
		width: 340,
		margin: 10
	},
	title: {
		fontSize: 14,
	},
	grid: {
		paddingTop: 70,
	},
	pos: {
		marginBottom: 12,
	},
});

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
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						table # {order.table}
					</Typography>
					<Typography variant="body2" component="p">
						onKitcnen from: {order.updated_at||order.created_at}
					</Typography>
					<Typography className={classes.pos} color="textSecondary">
						 {order.orderItems.map(dish=>
							 <>
								 <Typography gutterBottom variant="h5" component="h3">{dish.title}</Typography>
								 <div>weight: {dish.weight} gr</div>
						 {dish.ingredients.map(ingredient=>
							 <li>{ingredient.title}</li>
							 )}
							 </>
						 )}
					</Typography>
				</CardContent>
				<CardActions>
					<CompletedButton order={order}/>
				</CardActions>
			</Card>
			):
			<h1>there are no orders in the kitchen now</h1>
			}
		</Grid>
	);
}