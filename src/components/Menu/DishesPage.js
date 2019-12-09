import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux'
import * as orderActions from '../../store/actions/orders'

const useStyles = makeStyles({
	card: {
		width: 245,
		margin: 10,
	},
	grid: {
		paddingTop: 70,
	},
	media: {
		height: 200,
	},
});

export default function DishesPage(props) {
	const dishes = props.dishes;
	const classes = useStyles();
	const dispatch = useDispatch();

	const {activeOrder, orders} = useSelector(state =>
		({activeOrder: state.order.active,
			orders: state.order.orders})
	);

	const addDishToOrder= (dish) => {
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

			if (thisOrder.orderItems.length > 0) {
				(thisOrder.orderItems).push(newItem);

			} else {
				thisOrder.orderItems = [newItem]
			}

			orderActions.updateOrder({
				// staff: thisOrder.staff,
				table: thisOrder.table,
				orderPrice: thisOrder.orderPrice,
				onKitchen: thisOrder.onKitchen,
				completed: thisOrder.completed,
				orderItems: thisOrder.orderItems,
			}, activeOrder)(dispatch);
		}
		else{alert('Choose the order')}
	}

	return (
		<Grid container className={classes.grid} justify="center">
			{dishes.map((item)=>(
				<Card key={item._id} className={classes.card}>
					<CardActionArea onClick={()=>{addDishToOrder(item)}}>
						<CardMedia
							component="img"
							alt="Contemplative Reptile"
							height="200"
							image={item.img}
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{item.title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{item.description}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			))}
		</Grid>
	);
}