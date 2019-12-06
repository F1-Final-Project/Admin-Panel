import React from 'react';
import Button from '@material-ui/core/Button/index';
import * as orderActions from '../../../store/actions/orders';
import { useDispatch } from 'react-redux';


export default function DeleteItemOrderButton(props) {
	const dispatch = useDispatch();
	const {order, item}=props;

	const handleClick=(event)=>{
		event.stopPropagation()
		let newOrderItems;

		newOrderItems=(order.orderItems).filter(dish => {
			return dish._id !== item._id
		});

		order.orderPrice= +(order.orderPrice)- +(item.price);

		orderActions.updateOrder({
			// staff: order.staff,
			table: order.table,
			orderItems: newOrderItems,
			orderPrice: order.orderPrice,
			onKitchen: order.onKitchen,
			completed: order.completed,
		}, order._id)(dispatch)
	}
	return (
		<>
			<Button variant="outlined" onClick={handleClick}>DELETE ITEM</Button>
		</>
	);
}