import React from 'react'
import { useDispatch } from 'react-redux'
import OrderItem from './OrderDish'
import * as orderActions from '../../store/actions/orders'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	wrap: {
		width: '60%',
		marginLeft: '5%',
	}
}));

export default function OrderItems(props) {
	const { order, status } = props;
	const dispatch = useDispatch();
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const updateOrderItemChange = (dish) => {
		if(!order.newOrderItems||order.newOrderItems&&!order.newOrderItems.length>0)
		{order.orderItems = order.orderItems.map(item => {
			if (item.title === dish.title) {

				return dish
			}
			return item
		})
		}else {order.newOrderItems = order.newOrderItems.map(item => {
			if (item.title === dish.title) {

				return dish
			}
			return item
		})}

		orderActions.updateOrder({
			// staff: order.staff,
			table: order.table,
			orderPrice: order.orderPrice,
			onKitchen: order.onKitchen,
			completed: order.completed,
			orderItems: order.orderItems,
			newOrderItems: order.newOrderItems,
		}, order._id)(dispatch);
	};

	return (
		<>{order&&status ? (
			<>
				{status === 'new order' ? (
					<div className={classes.root}>
						{(order.orderItems).map((item, index) =>
							<OrderItem item={item} expanded={expanded} handleChange={handleChange} key={index} index={index}
												 order={order} updateOrderItemChange={updateOrderItemChange}/>
						)}
					</div>
				) : (
					<div>
						{(order.orderItems).map((item) =>
							<Grid  key={item._id} className={classes.wrap} container justify="space-between">
								<Typography>{item.title}</Typography>
								<p>{item.price} $</p>
							</Grid>
						)}
						{order.newOrderItems?(
							<>
							{order.newOrderItems.length>0 ? (
							<div className={classes.root}>
								<h2>NEW DISHES</h2>
								{(order.newOrderItems).map((item, index) =>
									<OrderItem item={item} expanded={expanded} handleChange={handleChange} key={index} index={index}
														 order={order} updateOrderItemChange={updateOrderItemChange}/>
								)}
							</div>
								):null}
								</>
							):null}
					</div>
				)}
			</>
		) : null
		}
		</>
	)
}
